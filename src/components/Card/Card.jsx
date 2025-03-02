import React from "react";
import "./Card.scss";
function Card({ cardImg, cardHead, cardPara }) {
  return (
    <>
      <div className="card-main">
        <div className="card-left">
          <h2>{cardHead}</h2>
          <p>{cardPara}</p>
          <div>
            <button className="button-secondary">View Recipe</button>
          </div>
        </div>
        <div className="card-right">
          <img src={cardImg} alt="" />
        </div>
      </div>
    </>
  );
}

export default Card;