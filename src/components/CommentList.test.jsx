import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentList from "./CommentList";
import { UserContext } from "../contexts/UserContext";
import { vi } from "vitest";
vi.mock("../api");
import { getCommentsById } from "../api";
import { signInHandler } from "../api";
import { postCommentHandler } from "../api";
import { deleteCommentHandler } from "../api";

describe("CommentList component", () => {
  //Integration tests
  it("Renders a list of comments for the specified review ID", async () => {
    getCommentsById.mockResolvedValue({
      comments: [
        { comment_id: 1, author: "grumpy19", body: "Great game!", votes: 5 },
        { comment_id: 2, author: "happypancake", body: "I agree!", votes: 3 },
      ],
    });
    signInHandler.mockResolvedValue([
      { username: "grumpy19", avatar_url: "https://example.com/avatar.jpg" },
      {
        username: "happypancake",
        avatar_url: "https://example.com/avatar2.jpg",
      },
    ]);
    render(
      <UserContext.Provider
        value={{ user: { username: "" }, isLoggedIn: false }}
      >
        <CommentList review_id={1} />
      </UserContext.Provider>
    );

    expect(await screen.findByText(/I agree/i)).toBeInTheDocument();
  });

  it("Displays a form box, the user can enter a comment, post the comment and the comment is displayed", async () => {
    const user = userEvent.setup();
    postCommentHandler.mockResolvedValue([
      { comment_id: 3, author: "grumpy19", body: "Great review!", votes: 0 },
    ]);
    signInHandler.mockResolvedValue([
      { username: "grumpy19", avatar_url: "https://example.com/avatar.jpg" },
      {
        username: "happypancake",
        avatar_url: "https://example.com/avatar2.jpg",
      },
    ]);
    getCommentsById.mockResolvedValue({
      comments: [
        { comment_id: 1, author: "grumpy19", body: "Great game!", votes: 5 },
        { comment_id: 2, author: "happypancake", body: "I agree!", votes: 3 },
      ],
    });

    render(
      <UserContext.Provider
        value={{ user: { username: "grumpy19" }, isLoggedIn: true }}
      >
        <CommentList review_id={1} />
      </UserContext.Provider>
    );

    const addCommentButton = await screen.findByRole("button", {
      name: /comment/i,
    });

    const commentInput = await screen.findByPlaceholderText(
      /add a comment.../i
    );

    expect(
      screen.getByPlaceholderText(/add a comment.../i)
    ).toBeInTheDocument();

    await user.type(commentInput, "Great review!");

    await user.click(addCommentButton);

    expect(postCommentHandler).toHaveBeenCalledWith({
      review_id: 1,
      user: "grumpy19",
      inputComment: "Great review!",
    });

    expect(await screen.findByText(/Great review!/i)).toBeInTheDocument();
  });

  it("Allows a user to delete their own comment", async () => {
    const user = userEvent.setup();
    postCommentHandler.mockResolvedValue([
      { comment_id: 3, author: "grumpy19", body: "Great review!", votes: 0 },
    ]);
    signInHandler.mockResolvedValue([
      { username: "grumpy19", avatar_url: "https://example.com/avatar.jpg" },
      {
        username: "happypancake",
        avatar_url: "https://example.com/avatar2.jpg",
      },
    ]);
    getCommentsById.mockResolvedValue({
      comments: [
        { comment_id: 1, author: "grumpy19", body: "Great game!", votes: 5 },
        { comment_id: 2, author: "happypancake", body: "I agree!", votes: 3 },
      ],
    });
    deleteCommentHandler.mockResolvedValue({});

    render(
      <UserContext.Provider
        value={{ user: { username: "grumpy19" }, isLoggedIn: true }}
      >
        <CommentList review_id={1} />
      </UserContext.Provider>
    );

    const deleteButtons = await screen.findAllByRole("button", {
      name: /delete/i,
    });
    expect(deleteButtons).toHaveLength(1);

    await user.click(deleteButtons[0]);

    expect(deleteCommentHandler).toHaveBeenCalledWith(1);

    expect(screen.queryByText(/Great game!/i)).not.toBeInTheDocument();
  });
});
