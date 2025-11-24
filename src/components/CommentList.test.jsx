import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import  CommentList  from "./CommentList";
import { UserContext } from "../contexts/UserContext";
import { vi } from "vitest";
vi.mock("../api");
import { getCommentsById } from "../api";
import { signInHandler } from "../api";


describe("CommentList component", () => {
   
    //Integration tests
    it("Renders a list of comments for the specified review ID", async () => {
        getCommentsById.mockResolvedValue({
            comments: [
              { comment_id: 1, author: "grumpy19", body: "Great game!", votes: 5 },
              { comment_id: 2, author: "happypancake", body: "I agree!", votes: 3 }
            ]
          });
          signInHandler.mockResolvedValue([
            { username: "grumpy19", avatar_url: "https://example.com/avatar.jpg" },
            {
              username: "happypancake",
              avatar_url: "https://example.com/avatar2.jpg",
            },
          ]);
        render(
            <UserContext.Provider value={{ user: { username: "" }, isLoggedIn: false }}>
              <CommentList review_id={1} />
            </UserContext.Provider>
          );


          expect(await screen.findByText(/I agree/i)).toBeInTheDocument()

    })
})
