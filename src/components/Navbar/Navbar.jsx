import React from "react";
import { Link } from "react-router-dom"; // Use Link instead of <a> for routing
import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="title nav-title">
        <Link to="/" className="title">GlobalBites</Link> <FontAwesomeIcon icon={faUtensils} />
      </div>
      <div className="nav-link">
        <ul>
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/login" className="signin btn">
              <FontAwesomeIcon icon={faSignInAlt} aria-label="Log In" /> Log In
            </Link>
          </li>
          <li>
            <Link to="/signup" className="signup btn">
              <FontAwesomeIcon icon={faUserPlus} aria-label="Sign Up" /> Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
