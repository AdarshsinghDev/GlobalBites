import React from "react";
import "./Discover.scss";
import map from "../../assets/map.jpg";

function Discover() {
  return (
    <>
      <div className="main">
        <div className="inner-width">
          <div className="discover-container">
            <div className="discover-left">
              <h1>Discover Diverse Cuisines from Around the World</h1>
              <div className="discover-card_container">
                <div className="discover-card">
                  <h2>Global Culinary Exploration</h2>
                  <p>
                    Embark on a gastronomic journey and explore authentic
                    recipes from every continent.
                  </p>
                </div>

                <div className="discover-card">
                  <h2>Explore Regional Specialties</h2>
                  <p>
                    Delve into the unique flavors of specific regions and
                    discover hidden culinary treasures.
                  </p>
                </div>

                <div className="discover-card">
                  <h2>Learn Traditional Techniques</h2>
                  <p>
                    Master the art of cooking with step-by-step instructions and
                    traditional cooking methods.
                  </p>
                </div>
              </div>
            </div>
            <div className="discover-right">
              <img src={map} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Discover;
