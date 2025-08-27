import React, { useEffect, useState } from "react";
import {
  IndianRupee,
  Calendar,
  Star,
  Clock,
  Users,
  Flame,
  ChefHat,
  CheckCircle,
  Lightbulb,
  X,
} from "lucide-react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

const Budget = () => {
  const [budget, setBudget] = useState("");
  const [frequency, setFrequency] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState([]);
  const [loading, setLoading] = useState(false);

  const frequencies = ["Daily", "Weekly", "Monthly"];

  const mealTypes = [
    {
      id: "breakfast",
      label: "Breakfast",
      emoji: "🍳",
      bgColor: "bg-[#FFEFCB]",
      textColor: "text-[#A87900]",
    },
    {
      id: "lunch",
      label: "Lunch",
      emoji: "🍝",
      bgColor: "bg-[#FFF3E2]",
      textColor: "text-[#C67B00]",
    },
    {
      id: "snacks",
      label: "Snacks",
      emoji: "🍔",
      bgColor: "bg-[#FFF0F6]",
      textColor: "text-[#B93A65]",
    },
    {
      id: "dinner",
      label: "Dinner",
      emoji: "🍲",
      bgColor: "bg-[#E6F4EA]",
      textColor: "text-[#3E7E55]",
    },
  ];

  const foodPreferences = [
    {
      id: "light",
      label: "Light Food",
      emoji: "🥗",
      bgColor: "bg-[#E3F9E5]",
      textColor: "text-[#2F855A]",
    },
    {
      id: "spicy",
      label: "Spicy Food",
      emoji: "🌶️",
      bgColor: "bg-[#FFE5E5]",
      textColor: "text-[#C53030]",
    },
    {
      id: "veg",
      label: "Veg Only",
      emoji: "🥦",
      bgColor: "bg-[#F0FFF4]",
      textColor: "text-[#38A169]",
    },
    {
      id: "healthy",
      label: "Healthy",
      emoji: "💪",
      bgColor: "bg-[#E6FFFA]",
      textColor: "text-[#319795]",
    },
  ];

  const handleMealTypeSelect = (mealTypeId) => {
    setSelectedMealType(mealTypeId);
  };

  const handlePreferenceToggle = (preferenceId) => {
    setSelectedPreferences((prev) =>
      prev.includes(preferenceId)
        ? prev.filter((id) => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  //LocalStorage Getting Stored Budget Recipe....

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //Converting selected prefrence Array to string....
    const strPref = selectedPreferences.toString();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipe-ai/budget`,
        { budget, meal: selectedMealType, frequency, prefrence: strPref }
      );
      if (res.status === 200) {
        console.log("success");
        console.log(res.data);
        const budgetRecipeFromBackend = res.data.recipes;

        //setting recipe to local Storage
        localStorage.setItem(
          "storedBudgetRecipe",
          JSON.stringify(budgetRecipeFromBackend)
        );

        //Setting recipe to card from backend Response and also from Local Storage...
        setRecipes(budgetRecipeFromBackend);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect START---
  useEffect(() => {
    try {
      const stored = localStorage.getItem("storedBudgetRecipe");

      if (stored) {
        setRecipes(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error parsing stored recipes", error);
      localStorage.removeItem("storedBudgetRecipe");
    }
  }, []);
  // END----

  //function of Show and hide overlay on clicking recipe

  const handleRecipePopUp = (recipe) => {
    setPopUp(true);
    setSelectedRecipe(recipe);
  };

  //Difficulty color

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen py-6 bg-gradient-to-br from-green-300 via-green-400 to-teal-400">
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            🍽️ Set Your Food Budget
          </h1>
          <p className=" text-white/90 max-w-2xl mx-auto">
            Tell us your budget and we'll recommend the perfect recipes for you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Budget Controls */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Budget Input Card */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="w-8 h-8 text-green-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Your Budget
                </h3>
                <p className="text-gray-600">
                  How much would you like to spend?
                </p>
              </div>

              <div className="space-y-6">
                {/* Money Input */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                    <IndianRupee className="w-6 h-6 text-green-600" />
                  </div>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-14 pr-6 h-[50px] py-4 text-2xl font-bold rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors text-center"
                  />
                </div>

                {/* Frequency Dropdown */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-colors appearance-none bg-white font-medium text-gray-700"
                  >
                    {frequencies.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipe Type Preferences */}
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🍽️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Recipe Type
                </h3>
                <p className="text-gray-600">
                  Choose when and how you love to eat
                </p>
              </div>

              <div className="space-y-8">
                {/* Meal Type Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">
                    When do you want to eat?
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {mealTypes.map((meal) => (
                      <div
                        key={meal.id}
                        onClick={() => handleMealTypeSelect(meal.id)}
                        className={`
                          ${meal.bgColor} ${meal.textColor}
                          rounded-2xl shadow-md p-4 font-medium text-md sm:text-lg cursor-pointer
                          hover:scale-105 transition-transform duration-200
                          ${
                            selectedMealType === meal.id
                              ? "ring-2 ring-offset-1 ring-[#4ADE80] scale-105"
                              : ""
                          }
                        `}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-2xl">{meal.emoji}</span>
                          <span>{meal.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Food Preferences Selection */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">
                    How do you want it?
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {foodPreferences.map((pref) => (
                      <div
                        key={pref.id}
                        onClick={() => handlePreferenceToggle(pref.id)}
                        className={`
                          ${pref.bgColor} ${pref.textColor}
                          rounded-2xl shadow-md p-4 font-medium text-md sm:text-lg cursor-pointer
                          hover:scale-105 transition-transform duration-200
                          ${
                            selectedPreferences.includes(pref.id)
                              ? "border-2 border-[#10B981] shadow-md shadow-green-200"
                              : ""
                          }
                        `}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-2xl">{pref.emoji}</span>
                          <span>{pref.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Find Recipes Button */}
            {/* <button
              type="submit"
              className="w-full py-6 px-8 bg-white text-green-600 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
            >
              🔍 Find Perfect Recipes
              <div className="animate-spin h-5 w-5 sm:h-6 sm:w-6 border-2 border-white border-t-transparent rounded-full">
                he
              </div>
            </button> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-white text-green-600 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 px-4 sm:px-5 sm:py-4 hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 flex-shrink-0"
            >
              {loading ? (
                <div className="animate-spin h-6 w-6 border-2 border-green-600 border-t-transparent rounded-full cursor-not-allowed"></div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-base">
                    Find Perfect Recipes
                  </span>
                </div>
              )}
            </button>
          </form>

          {/* Right Side - Recipe Preview */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2 bg-white text-slate-700 p-2 rounded-lg py-1">
                🍳 Recipe Previews
              </h3>
              <p className="text-white/90">Here's what you could be cooking!</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  onClick={() => handleRecipePopUp(recipe)}
                  className="bg-white/10 backdrop-blur-md cursor-pointer rounded-2xl p-4 shadow-xl transform transition-all duration-300 hover:scale-105 border border-b-4"
                >
                  <div className="relative mb-3">
                    <div className="w-fit top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs">{recipe.difficulty}</span>
                    </div>
                  </div>

                  <h4 className="text-white font-bold text-md mb-2 line-clamp-1 underline underline-offset-2">
                    {recipe.name}
                  </h4>
                  <div className="p-2 px-1 ">
                    <p className="text-white">{recipe.description}</p>
                  </div>
                  <div className="flex justify-between text-xs text-white/80">
                    <div>
                      <div className="flex items-center gap-1 bg-green-500 p-1 px-2 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span className="pr-1">{recipe.time} Min</span>
                        <div className="border-l-2 pl-2 ">
                          {" "}
                          Cost: {recipe.totalPrice}₹
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{recipe.servings}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selection Summary */}
            {(selectedMealType || selectedPreferences.length > 0) && (
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 text-white">
                  <span className="text-2xl">✨</span>
                  <span className="font-medium">
                    {selectedMealType && selectedPreferences.length > 0
                      ? `Perfect! Looking for ${selectedMealType} recipes with ${selectedPreferences.length} preferences`
                      : selectedMealType
                      ? `Great choice! ${selectedMealType} recipes coming up`
                      : `${selectedPreferences.length} preferences selected`}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Overlay of selected Recipe */}
      {popUp && selectedRecipe && (
        <div className="fixed inset-0 w-full h-screen bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden relative">
            {/* Header with Close Button */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white relative">
              <button
                onClick={() => setPopUp(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-200 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between pr-12">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {selectedRecipe.name}
                  </h1>
                  <p className="text-green-100 text-sm md:text-lg">
                    {selectedRecipe.description}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <div
                    className={`px-3 py-1 rounded-full border ${getDifficultyColor(
                      selectedRecipe.difficulty
                    )} bg-white/90`}
                  >
                    <span className="font-medium text-sm">
                      {selectedRecipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 p-4 md:p-6 bg-gradient-to-r from-green-50 to-teal-50">
                <div className="text-center">
                  <div className="bg-white p-2 md:p-3 rounded-xl shadow-sm">
                    <Clock className="w-4 h-4 md:w-6 md:h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs md:text-sm text-gray-600">Time</p>
                    <p className="font-bold text-sm md:text-base text-green-700">
                      {selectedRecipe.time} min
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-white p-2 md:p-3 rounded-xl shadow-sm">
                    <Users className="w-4 h-4 md:w-6 md:h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs md:text-sm text-gray-600">Servings</p>
                    <p className="font-bold text-sm md:text-base text-blue-700">
                      {selectedRecipe.servings}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-white p-2 md:p-3 rounded-xl shadow-sm">
                    <Flame className="w-4 h-4 md:w-6 md:h-6 text-orange-600 mx-auto mb-1" />
                    <p className="text-xs md:text-sm text-gray-600">Calories</p>
                    <p className="font-bold text-sm md:text-base text-orange-700">
                      {selectedRecipe.calories}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-white p-2 md:p-3 rounded-xl shadow-sm">
                    <IndianRupee className="w-4 h-4 md:w-6 md:h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs md:text-sm text-gray-600">
                      Per Person
                    </p>
                    <p className="font-bold text-sm md:text-base text-green-700">
                      ₹{selectedRecipe.avgPricePerPerson}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="bg-white p-2 md:p-3 rounded-xl shadow-sm">
                    <IndianRupee className="w-4 h-4 md:w-6 md:h-6 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs md:text-sm text-gray-600">
                      Total Cost
                    </p>
                    <p className="font-bold text-sm md:text-base text-purple-700">
                      ₹{selectedRecipe.totalPrice}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                {/* Ingredients Section */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <ChefHat className="w-5 h-5 md:w-6 md:h-6 text-green-600 mr-2" />
                    Ingredients
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-r from-green-50 to-teal-50 p-3 md:p-4 rounded-xl border border-green-200"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-sm md:text-base text-gray-800">
                              {ingredient.item}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600">
                              {ingredient.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-sm md:text-base text-green-700">
                              ₹{ingredient.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cooking Steps */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mr-2" />
                    Cooking Steps
                  </h2>
                  <div className="space-y-3">
                    {selectedRecipe.steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-blue-50 rounded-xl border border-blue-200"
                      >
                        <div className="bg-blue-600 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips Section */}
                {selectedRecipe.tips && selectedRecipe.tips.length > 0 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-600 mr-2" />
                      Pro Tips
                    </h2>
                    <div className="space-y-3">
                      {selectedRecipe.tips.map((tip, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 md:p-4 rounded-xl border border-yellow-200"
                        >
                          <p className="text-sm md:text-base text-gray-700 font-medium">
                            💡 {tip}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-1 md:p-2 text-center">
              <p className="text-white text-base md:text-lg font-semibold">
                Happy Cooking! 👨‍🍳
              </p>
              <p className="text-green-100 text-sm md:text-base">
                Enjoy your delicious {selectedRecipe.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
