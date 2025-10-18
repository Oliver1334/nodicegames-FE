import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'
import { UserContext } from "../contexts/UserContext"

describe('Navbar component', () => {
    it('renders the logo, navigation links and darkmode button', () => {

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
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
        // Check the "About" and "Reviews" links exist
        expect(screen.getByText(/about/i)).toBeInTheDocument()
        expect(screen.getByText(/reviews/i)).toBeInTheDocument()
    })

    






















})   