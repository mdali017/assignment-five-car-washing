import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Bookings", path: "/bookings" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="p-4 bg-primary bg-opacity-40">
      <div className="container flex justify-between items-center h-16 mx-auto relative">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-28 w-auto object-contain" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-stretch space-x-3">
          {navItems.map((item) => (
            <li key={item.name} className="flex">
              <Link
                to={item.path}
                className="flex text-xl font-semibold items-center px-4 -mb-1 border-b-2 dark:border-transparent hover:dark:border-violet-600"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign In/Sign Up */}
        <div className="hidden lg:flex items-center gap-2">
          <Link to={"/auth/login"}>
            <button className="self-center px-4 py-2 border uppercase font-semibold rounded hover:bg-violet-600 duration-300 hover:text-white hover:border-none">
              Login
            </button>
          </Link>
          <button className="self-center text-white hover:text-black px-4 py-2 uppercase font-semibold rounded bg-violet-600 hover:bg-transparent duration-300 hover:border ">
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="p-4 lg:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-100 shadow-lg lg:hidden">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.name} className="border-b">
                  <Link
                    to={item.path}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="border-b">
                <Link
                  to="/auth/login"
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Login
                </Link>
              </li>
              <li>
                <button className="w-full px-4 py-3 bg-violet-600 text-white hover:bg-violet-700">
                  Book Now
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
