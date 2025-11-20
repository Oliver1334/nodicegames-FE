import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";
import NDGLogoSVG from "./icons/Logo.jsx";
import { UserContext } from "../contexts/UserContext";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  const { user, logout } = useContext(UserContext);
  const [nav, setNav] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setNav(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click-away for mobile menu
  useEffect(() => {
    if (!nav) return;
    const onClickAway = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setNav(false);
    };
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, [nav]);

  // Click-away for user menu
  useEffect(() => {
    if (!userMenuOpen) return;
    const onClickAway = (e) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, [userMenuOpen]);

  const themeIcon = isDarkMode ? <RiMoonClearLine className="h-4 w-4" /> : <RiSunLine className="h-4 w-4" />;
  const themeLabel = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-brandLight dark:bg-brandDark">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-brandLightText dark:text-brandText" to="/">
              <span className="sr-only">Home</span>
              <NDGLogoSVG className="w-60 h-32" />
            </Link>
          </div>

          {/* Right */}
          <div className="md:flex md:items-center md:gap-6">
            {/* Desktop nav */}
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-brandLightText transition hover:text-brandHighlight dark:text-brandText dark:hover:text-brandHighlight"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-brandLightText transition  dark:text-brandText hover:text-brandHighlight dark:hover:text-brandHighlight"
                    to="/reviews"
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md bg-brandPrimary text-brandDark shadow-sm hover:bg-brandPrimaryDarker cursor-pointer transition-colors duration-250 "
                aria-label={themeLabel}
                type="button"
              >
                {themeIcon}
              </button>

              {/* ✅ Login vs User Avatar */}
              {user?.username ? (
  <div ref={userMenuRef} className="relative hidden sm:block">
    <button
      onClick={() => setUserMenuOpen((v) => !v)}
      className="flex items-center h-10 rounded-md bg-brandPrimary text-brandDark shadow-sm hover:bg-brandPrimaryDarker transition-colors duration-250 cursor-pointer"
    >
      {/* Username on the left */}
      <span className="px-3 text-sm font-medium truncate max-w-[100px]">
        {user.username}
      </span>

      {/* Avatar square on the right */}
      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center overflow-hidden">
        <img
          src={user.avatar_url}
          alt={user.username}
          className="h-8 w-8 object-cover rounded-sm"
        />
      </div>
    </button>

    {/* Dropdown */}
    {userMenuOpen && (
      <div className="absolute right-0 mt-2 w-40 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
        <Link
          to="/account"
          onClick={() => setUserMenuOpen(false)}
          className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-brandPrimary dark:text-gray-200"
        >
          My Account
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
        >
          Log Out
        </button>
      </div>
    )}
  </div>
) : (
  <Link
    to="/signin"
    className="hidden sm:inline-flex h-10 items-center justify-center rounded-md bg-brandPrimary px-5 text-sm font-medium text-brandDark shadow-sm hover:bg-brandPrimaryDarker transition-colors duration-250 "
  >
    Login
  </Link>
)}



              {/* Mobile hamburger menu */}
              <div ref={menuRef} className="relative block md:hidden">
                <button
                  type="button"
                  onClick={() => setNav((v) => !v)}
                  aria-expanded={nav}
                  aria-controls="mobile-menu"
                  aria-label="Open navigation menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brandPrimary text-brandDark shadow-sm hover:bg-brandPrimaryDarker cursor-pointer transition-colors duration-250 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </button>

                {nav && (
                  <div
                    id="mobile-menu"
                    className="fixed right-4 top-16 z-50 w-56 rounded-lg border border-black/5 bg-brandLight p-2 shadow-lg dark:border-white/10 dark:bg-brandDark"
                    role="menu"
                  >
                    <a
                      href="#"
                      onClick={() => setNav(false)}
                      className="block rounded-md px-3 py-2 text-sm text-brandLightText hover:bg-brandPrimary/10 dark:text-brandText dark:hover:bg-brandPrimary/20 transition-colors duration-250 "
                      role="menuitem"
                    >
                      About
                    </a>
                    <Link
                      to="/reviews"
                      onClick={() => setNav(false)}
                      className="block rounded-md px-3 py-2 text-sm text-brandLightText hover:bg-brandPrimary/10 dark:text-brandText dark:hover:bg-brandPrimary/20 transition-colors duration-250 "
                      role="menuitem"
                    >
                      Reviews
                    </Link>

                    <div className="my-1 h-px bg-black/5 dark:bg-white/10" />

                    <button
                      onClick={toggleDarkMode}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-brandLightText hover:bg-brandPrimary/10 dark:text-brandText dark:hover:bg-brandPrimary/20 transition-colors duration-250 cursor-pointer"
                      role="menuitem"
                      aria-label={themeLabel}
                    >
                      {themeIcon}
                      <span>{themeLabel}</span>
                    </button>

                    {!user?.username ? (
                      <Link
                        to="/signin"
                        onClick={() => setNav(false)}
                        className="mt-1 block rounded-md  px-3 py-2 text-center text-sm font-medium bg-brandPrimary text-brandDark hover:bg-brandPrimaryDarker transition-colors duration-250 "
                        role="menuitem"
                      >
                        Login
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/account"
                          onClick={() => setNav(false)}
                          className="block rounded-md px-3 py-2 text-sm text-brandLightText hover:bg-brandPrimary/10 dark:text-brandText dark:hover:bg-brandPrimary/20 transition-colors duration-250"
                        >
                          My Account
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setNav(false);
                          }}
                          className="block w-full text-left rounded-md px-3 py-2 text-sm text-red-600 hover:bg-brandPrimary/10 dark:text-red-400 dark:hover:bg-brandPrimary/20 transition-colors duration-250 cursor-pointer"
                        >
                          Log Out
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              {/* End mobile hamburger */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
