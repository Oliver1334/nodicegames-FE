import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SignIn } from "./SignIn";
import { UserContext } from "../contexts/UserContext";

describe("SignIn component", () => {
  it("renders correctly with username and password input and a submit button", () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ login: vi.fn() }}>
          <SignIn />
        </UserContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });
});
