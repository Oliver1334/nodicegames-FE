import { render, screen, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "../contexts/UserContext";


describe("Navbar component", () => {
  it("renders the logo, navigation links", () => {
    const mockUser = {
      username: "testuser",
      avatar_url: "https://via.placeholder.com/40",
    };

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: mockUser, logout: vi.fn() }}>
          <Navbar isDarkMode={false} toggleDarkMode={() => {}} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    // Check the logo exists as a link to homepage
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    // Check the "About" and "Reviews" links exist
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/reviews/i)).toBeInTheDocument();
  });

  it("renders a dark mode button with the correct icon which calls toggleDarkMode when clicked", async () => {
    const user = userEvent.setup()
    const mockToggleDarkMode = vi.fn(); // Create mock function
    const mockUser = {
      username: "testuser",
      avatar_url: "https://via.placeholder.com/40",
    };

    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: mockUser, logout: vi.fn() }}>
          <Navbar isDarkMode={false} toggleDarkMode={mockToggleDarkMode} />
        </UserContext.Provider>
      </BrowserRouter>
    );

    // Check button exists
    const darkModeButton = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(darkModeButton).toBeInTheDocument();

    // Click the button
    await user.click(darkModeButton)

    // Verify the function was called
    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1)




//button shows correct darkmode symbol depending on light or dark const themeIcon








  });








});
