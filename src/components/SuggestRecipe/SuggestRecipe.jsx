import React from "react";
import "./SuggestRecipe.scss"
import Card from "../Card/Card";
import salad from "../../assets/salad.png";
import chole from "../../assets/chole.png";
import paneer from "../../assets/paneer.png";

function SuggestRecipe() {
  return (
    <>
      <div className="main main-suggest_recipe">
        <div className="inner-width">
          <h1>Recipe Suggestion</h1>

          <div className="card-container">
            <Card cardHead = "Kachumber Salad" 
                  cardPara = "Kachumber Salad is a fresh and crunchy Indian salad, loaded with colorful veggies and seasoned with tangy, spicy flavors. Perfect as a side dish or a light snack!"
                  cardImg = {salad} />

            <Card cardHead = "Punjabi Chole" 
                  cardPara = "Punjabi Chole is a flavorful and protein-rich North Indian dish made with chickpeas (chole) cooked in a spicy, tangy gravy. It pairs perfectly with bhature, puri, rice, or roti!"
                  cardImg = {chole} />

            <Card cardHead = "Paneer Tikka" 
                  cardPara = "Paneer Tikka is a popular North Indian appetizer made with marinated paneer (Indian cottage cheese) grilled or cooked in a tandoor, oven, pan, or air fryer."
                  cardImg = {paneer} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestRecipe;