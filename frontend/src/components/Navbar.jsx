import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Settings,
  LogIn,
  UserPlus,
  Heart,
  BookOpen,
  Utensils,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useUserContext } from "../context/CreateContext";
import Logo from "./ui/Logo";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { userContextData } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    const storedIsVerified =
      userContextData.isVerified || localStorage.getItem("storedIsVerified");

    const storedFullname =
      userContextData.fullname || localStorage.getItem("storedFullname");

    setIsLoggedIn(storedIsVerified);
    setFullname(storedFullname);
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (path) => {
    console.log(`Navigating to: ${path}`);
    closeMobileMenu();
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/home"
              onClick={() => handleLinkClick("/")}
              className="flex items-center space-x-2 group"
            >
            <Logo logoStyle="text-[20px]" logoIconSize={20} logoIconPad={"p-[5px]"} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/home"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>

              {isLoggedIn && (
                <>
                  <Link
                    to="/my-recipe"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>My Recipes</span>
                  </Link>

                  <Link
                    to="/favourites"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Favourites</span>
                  </Link>
                </>
              )}

              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <User className="w-4 h-4" />
                    <span className="max-w-24 truncate">{fullname}</span>
                  </Link>

                  <Link
                    to="setting"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>

                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/home"
              className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  to="my-recipe"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>My Recipes</span>
                </Link>

                <Link
                  to="/favourites"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Favourites</span>
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <User className="w-4 h-4" />
                  <span className="truncate">{fullname}</span>
                </Link>

                <Link
                  to="/setting"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/setting"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>

                <Link
                  to="/login"
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>

          {/* Demo Toggle Button */}
          <div className="px-2 pb-3 border-t border-gray-200 mt-2">
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="w-full px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"
            >
              Toggle Login State (Demo)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
