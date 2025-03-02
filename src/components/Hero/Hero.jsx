import React from "react";
import "./Hero.scss";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <div className="main hero-main">
        <div className="inner-width">
          <div className="hero">
            <h1>
              Welcome to GlobalBites 🥄🍽 <br /> Where Every Meal is a
              Masterpiece!
            </h1>
            <p>
              Discover simple, delicious recipes for every craving. From quick
              bites to gourmet delights, let’s turn ingredients into magic.
              Ready to cook? 🍳✨
            </p>
            <div>
              <button className="button" onClick={() => navigate("/Signup")}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
