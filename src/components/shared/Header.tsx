import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Bookings", path: "/bookings" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/40 backdrop-blur-xl shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex justify-between items-center h-20 mx-auto px-4">
        <div className="flex items-center">
          <div className=" p-2 rounded-full">
            <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-lg font-medium text-white transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign In/Sign Up */}
        <div className="hidden lg:flex items-center gap-4">
          <Link to={"/auth/login"}>
            <button className="px-6 py-2 rounded-full font-medium text-white border-2 border-white hover:bg-white hover:text-gray-800 transition-all duration-300">
              Login
            </button>
          </Link>
          <Link to={"/services"}>
            <button className="px-6 py-2 rounded-full font-medium text-white bg-violet-600 hover:bg-violet-700 transition-all duration-300">
              Book Now
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="p-2 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl shadow-lg lg:hidden">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="block px-6 py-3 text-white hover:bg-white/10 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="border-t border-white/20">
                <Link
                  to="/auth/login"
                  className="block px-6 py-3 text-white hover:bg-white/10"
                >
                  Login
                </Link>
              </li>
              <li className="p-4">
                <button className="w-full px-6 py-3 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-all duration-300">
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