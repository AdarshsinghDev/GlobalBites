import React, { useState } from "react";
import axios from "axios";
import "./ExploreRecipe.scss";
import Card from "../../components/Card/Card";
import Category from "../../components/Category/Category";
import SuggestRecipe from "../../components/SuggestRecipe/SuggestRecipe";

function ExploreRecipe() {
  const [text, setText] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const fetchRecipes = async () => {
    if (!text.trim()) return alert("Please enter some ingredients!");

    setLoading(true);
    try {
      const response = await axios.post("https://backend-globalbites.onrender.com/get-recipes", {
        ingredients: text,
      });
      setRecipes(response.data.recipes);
    } catch (error) {
      console.error("❌ ERROR fetching recipes:", error);
      setRecipes(["Failed to fetch recipes. Try again later!"]);
    }
    setLoading(false);
  };

  return (
    <div className="main explore-main">
      <div className="inner-width">
        <div className="explore-container">
          <div className="explore-top_container">
            <div className="explore-top-container-inner">
              <div className="input-container">
                <textarea
                  value={text}
                  onChange={handleInput}
                  placeholder="Enter ingredients (e.g., rice, sugar, milk)"
                  className="input-textarea"
                />
              </div>
              <button className="button" onClick={fetchRecipes}>
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Display Recipes */}

          <div className="explore-bottom_container">
            <div className="explore-bottom_container_generated">
              <div className="explore-bottom_container_food card-container">
                {recipes.length > 0 ? (
                  recipes.map((recipe, index) =>
                    typeof recipe === "string" ? (
                      <p key={index}>{recipe}</p>
                    ) : (
                      <Card
                        key={index}
                        cardHead={recipe.title}
                        alt={recipe.title}
                        cardImg={recipe.image}
                      />
                    )
                  )
                ) : (
                  <p>No recipes found. Try different ingredients!</p>
                )}
              </div>
            </div>

            <div className="explore-bottom_container_category">
              <Category text="All" />
              <Category text="Dessert" />
              <Category text="Dinner" />
              <Category text="Starter" />
            </div>

            <div className="explore-bottom_container_food">
              <SuggestRecipe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreRecipe;
