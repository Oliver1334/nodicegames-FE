import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { SignIn } from "./SignIn";
import { UserContext } from "../contexts/UserContext";
vi.mock("../api");
import { signInHandler } from "../api";
import { vi } from "vitest";
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("SignIn component", () => {
  //Unit Tests
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
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("shows correct validation errors when password field is left empty", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ login: vi.fn() }}>
          <SignIn />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const signInButton = screen.getByRole("button", {
      name: /sign in/i,
    });

    await user.click(signInButton);

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(
      /please fill in a password to continue/i
    );
  });

  //Integration Tests

  it("shows correct validation errors when username field is left empty", async () => {
    const user = userEvent.setup();
    signInHandler.mockResolvedValue([
      { username: "grumpy19", avatar_url: "https://example.com/avatar.jpg" },
      {
        username: "happypancake",
        avatar_url: "https://example.com/avatar2.jpg",
      },
    ]);

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ login: vi.fn() }}>
          <SignIn />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const signInButton = screen.getByRole("button", {
      name: /sign in/i,
    });

    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(passwordInput, "Password123");

    await user.click(signInButton);

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/username not found/i);
  });

  it("shows correct validation error when invalid credentials are entered", async () => {
    const user = userEvent.setup();
    signInHandler.mockResolvedValue([
      { username: "grumpy19", avatar_url: "https://example.com/avatar.jpg" },
      {
        username: "happypancake",
        avatar_url: "https://example.com/avatar2.jpg",
      },
    ]);

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ login: vi.fn() }}>
          <SignIn />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const signInButton = screen.getByRole("button", {
      name: /sign in/i,
    });

    const passwordInput = screen.getByPlaceholderText(/password/i);

    const usernameInput = screen.getByPlaceholderText(/username/i);

    await user.type(usernameInput, "Geoffrey66");
    await user.type(passwordInput, "Password123");

    await user.click(signInButton);

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/username not found/i);
  });

  it("logs in successfully when correct credentials are entered", async () => {
    const user = userEvent.setup();
    signInHandler.mockResolvedValue([
      { username: "grumpy19", avatar_url: "https://example.com/avatar.jpg" },
      {
        username: "happypancake",
        avatar_url: "https://example.com/avatar2.jpg",
      },
    ]);
    const mockLogin = vi.fn();
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate)

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ login: mockLogin}}>
          <SignIn />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const signInButton = screen.getByRole("button", {
      name: /sign in/i,
    });

    const passwordInput = screen.getByPlaceholderText(/password/i);

    const usernameInput = screen.getByPlaceholderText(/username/i);

    await user.type(usernameInput, "grumpy19");
    await user.type(passwordInput, "Password123");

    await user.click(signInButton);

    expect(mockLogin).toHaveBeenCalledTimes(1);
expect(mockLogin).toHaveBeenCalledWith({ 
  username: "grumpy19", 
  avatar_url: "https://example.com/avatar.jpg" 
});

expect(mockNavigate).toHaveBeenCalledTimes(1);
expect(mockNavigate).toHaveBeenCalledWith( 
  "/account" 
);

  });
});
