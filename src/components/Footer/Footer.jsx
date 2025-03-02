import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="main footer-main">
        <div className="inner-width">
          <div className="footer-container">
            <div className="title">
              <Link to="/" className="title">
                GlobalBites
              </Link>{" "}
              <FontAwesomeIcon icon={faUtensils} />
            </div>
            <div className="footer-link">
              <ul>
                <li>
                  <Link>Service</Link>
                </li>
                <li>
                  <Link>About</Link>
                </li>
                <li>
                  <Link>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <p>© {currentYear} GlobalBites. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
