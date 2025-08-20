import React, { useState } from "react";
import {
  IndianRupee,
  Calendar,
  Utensils,
  Star,
  Clock,
  Users,
} from "lucide-react";

const Budget = () => {
  const [budget, setBudget] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedPreferences, setSelectedPreferences] = useState([]);

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

  const recipeCards = [
    {
      id: 1,
      title: "Butter Chicken",
      time: "30 min",
      rating: 4.8,
      people: 4,
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=200&h=150&fit=crop",
    },
    {
      id: 2,
      title: "Pasta Carbonara",
      time: "25 min",
      rating: 4.6,
      people: 2,
      image:
        "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-threeByTwoMediumAt2X-v2.jpg",
    },
    {
      id: 3,
      title: "Veggie Buddha Bowl",
      time: "20 min",
      rating: 4.7,
      people: 1,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=150&fit=crop",
    },
    {
      id: 4,
      title: "Chicken Biryani",
      time: "45 min",
      rating: 4.9,
      people: 6,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPyJ2vhJ3Uo5QtZ4NgNzlpZFMUEfpyqRhWWw&s",
    },
    {
      id: 5,
      title: "Margherita Pizza",
      time: "35 min",
      rating: 4.5,
      people: 3,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=150&fit=crop",
    },
    {
      id: 6,
      title: "Thai Green Curry",
      time: "40 min",
      rating: 4.8,
      people: 4,
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=200&h=150&fit=crop",
    },
  ];

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
          <div className="space-y-8">
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
                      <button
                        key={meal.id}
                        onClick={() => handleMealTypeSelect(meal.id)}
                        className={`
                          ${meal.bgColor} ${meal.textColor}
                          rounded-2xl shadow-md p-4 font-medium text-md sm:text-lg
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
                      </button>
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
                      <button
                        key={pref.id}
                        onClick={() => handlePreferenceToggle(pref.id)}
                        className={`
                          ${pref.bgColor} ${pref.textColor}
                          rounded-2xl shadow-md p-4 font-medium text-md sm:text-lg
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
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Find Recipes Button */}
            <button className="w-full py-6 px-8 bg-white text-green-600 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3">
              <span className="text-2xl">🔍</span>
              Find Perfect Recipes
            </button>
          </div>

          {/* Right Side - Recipe Preview */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-2 bg-white  py-1bg-white text-slate-700 p-2 rounded-lg py-1">
                🍳 Recipe Previews
              </h3>
              <p className="text-white/90">Here's what you could be cooking!</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {recipeCards.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow-xl transform transition-all duration-300 hover:scale-105"
                >
                  <div className="relative mb-3">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-24 object-cover rounded-xl"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-bold">{recipe.rating}</span>
                    </div>
                  </div>

                  <h4 className="text-white font-bold text-sm mb-2 line-clamp-1">
                    {recipe.title}
                  </h4>

                  <div className="flex justify-between text-xs text-white/80">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{recipe.people}</span>
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
    </div>
  );
};

export default Budget;
