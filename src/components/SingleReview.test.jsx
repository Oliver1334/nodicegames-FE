import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SingleReview } from "./SingleReview";
import { UserContext } from "../contexts/UserContext";
import { vi } from "vitest";
vi.mock("../api");
import { signInHandler } from "../api";
import { getReviewById } from "../api";
import { useParams } from "react-router-dom";
import { getCommentsById } from "../api";
import { voteForReview } from "../api";
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe("SingleReview Component", () => {
  it("Loads and displays data for a single specific review", async () => {
    useParams.mockReturnValue({review_id: "1"})
    getReviewById.mockResolvedValue({
      title: "Culture a Love of Agriculture With Agricola",
      designer: "Uwe Rosenberg",
      owner: "tickle122",
      review_img_url:
        "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
      review_body:
        "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
      category: "strategy",
      created_at: new Date(1610964020514),
      votes: 1,
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
        <SingleReview />
      </UserContext.Provider>
    );

    expect(await screen.findByRole("heading", { name: /Agricola/i })).toBeInTheDocument();

    expect(await screen.findByText(/Category: strategy/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Designer: uwe rosenberg/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/tickle122/i)).toBeInTheDocument();

    expect(await screen.findByText(/Farmyard fun/i)).toBeInTheDocument();
    expect(await screen.findByText(/Votes: 1/i)).toBeInTheDocument();
    const img = screen.getByAltText(/Agricola/i);
    expect(img).toHaveAttribute(
      "src",
      "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700"
    );
  });

  it("Should show a loading state on initial visit", () => {
    useParams.mockReturnValue({ review_id: "1" });
    signInHandler.mockResolvedValue([
        { username: "grumpy19", avatar_url: "https://example.com/avatar.jpg" },
        {
          username: "happypancake",
          avatar_url: "https://example.com/avatar2.jpg",
        },
      ]);
      getReviewById.mockReturnValue(new Promise(() => {})); // Never resolves so loading is displayed

      render(
        <UserContext.Provider
          value={{ user: { username: "" }, isLoggedIn: false }}
        >
          <SingleReview />
        </UserContext.Provider>
      );
  
      expect(screen.getByRole("paragraph")).toHaveTextContent(/fetching review.../i);

  })

  it("Displays a list of comments for the specified review", async () => {
    useParams.mockReturnValue({review_id: "1"})
    getReviewById.mockResolvedValue({
      title: "Culture a Love of Agriculture With Agricola",
      designer: "Uwe Rosenberg",
      owner: "tickle122",
      review_img_url:
        "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
      review_body:
        "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
      category: "strategy",
      created_at: new Date(1610964020514),
      votes: 1,
    });
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
        <SingleReview />
      </UserContext.Provider>
    );
    expect(await screen.findByRole("heading", { name: /2 comments/i })).toBeInTheDocument();

    expect(await screen.findByText(/grumpy19/i)).toBeInTheDocument();
    expect(await screen.findByText(/I agree/i)).toBeInTheDocument();

  })

  it("Vote button exists on the review, clicking updates the vote count", async () => {
    const user = userEvent.setup();
    voteForReview.mockResolvedValue({review_id: "1"})
    useParams.mockReturnValue({review_id: "1"})
    getReviewById.mockResolvedValue({
      title: "Culture a Love of Agriculture With Agricola",
      designer: "Uwe Rosenberg",
      owner: "tickle122",
      review_img_url:
        "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
      review_body:
        "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
      category: "strategy",
      created_at: new Date(1610964020514),
      votes: 1,
    });
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
        <SingleReview />
      </UserContext.Provider>
    );

    const voteButton = await screen.findByRole("button", {
        name: /vote/i,
      });
 

    expect(await screen.findByText(/votes: 1/i)).toBeInTheDocument();
    await user.click(voteButton);
    expect(await screen.findByText(/votes: 2/i)).toBeInTheDocument();
    expect(voteForReview).toHaveBeenCalledWith("1");
    

  })














});
