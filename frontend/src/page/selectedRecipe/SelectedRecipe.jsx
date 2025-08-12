import React, { useState, useEffect } from "react";
import {
  Heart,
  Clock,
  Users,
  ChefHat,
  Play,
  Share2,
  Download,
  RefreshCw,
  MessageCircle,
  Eye,
  Utensils,
  Star,
  Sparkles,
} from "lucide-react";

import { useHomeRecipeContext } from "../../context/HomeRecipeContext";
import axios from "axios";

const SelectedRecipe = () => {
  const { homeRecipe } = useHomeRecipeContext();
  const [dishRecipe, setDishRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for stored recipe data (full recipe object, not just name)
    const savedRecipeData = localStorage.getItem("storeHomeRecipeData");
    if (savedRecipeData) {
      try {
        const parsed = JSON.parse(savedRecipeData);
        // Check if it's a valid recipe object with required properties
        if (parsed && typeof parsed === 'object' && parsed.name) {
          console.log("Loading recipe from localStorage:", parsed.name);
          setDishRecipe(parsed);
        } else {
          console.log("Invalid recipe data in localStorage, clearing");
          localStorage.removeItem("storeHomeRecipeData");
        }
      } catch (error) {
        console.log("Invalid JSON in localStorage, clearing:", error);
        localStorage.removeItem("storeHomeRecipeData");
        setError("Invalid recipe data found, please try again.");
      }
    }
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!homeRecipe) return;
      
      // Don't fetch if we already have the recipe data
      if (dishRecipe && dishRecipe.name === homeRecipe) {
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching recipe for:", homeRecipe);
        
        // Updated API endpoint URL - use your production URL
        const res = await axios.post(
          "https://globalbites-production.up.railway.app/api/recipe-ai/home-recipe",
          { recipe: homeRecipe },
          {
            timeout: 10000, // 10 second timeout
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        const resRecipe = res.data.recipe;
        console.log("Received recipe data:", resRecipe);
        
        // Validate the recipe data before storing
        if (resRecipe && typeof resRecipe === 'object' && resRecipe.name) {
          setDishRecipe(resRecipe);
          // Store the full recipe object with a different key
          localStorage.setItem("storeHomeRecipeData", JSON.stringify(resRecipe));
          console.log("Recipe stored successfully");
        } else {
          console.error("Invalid recipe data received:", resRecipe);
          setError("Invalid recipe data received from server.");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        
        // More specific error messages
        if (error.code === 'ERR_NETWORK') {
          setError("Unable to connect to server. Please check your internet connection and try again.");
        } else if (error.code === 'ECONNABORTED') {
          setError("Request timed out. Please try again.");
        } else if (error.response?.status === 500) {
          setError("Server error occurred. Please try again later.");
        } else {
          setError("Failed to generate recipe. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have a homeRecipe and don't have matching dishRecipe
    if (homeRecipe && (!dishRecipe || dishRecipe.name !== homeRecipe)) {
      fetchRecipe();
    }
  }, [homeRecipe, dishRecipe]);

  // Clear stored data function
  const clearStoredData = () => {
    localStorage.removeItem("storeHomeRecipe");
    localStorage.removeItem("storeHomeRecipeData");
    setDishRecipe(null);
    setError(null);
  };

  if (!homeRecipe && !dishRecipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 via-orange-400 to-red-400">
        <div className="text-center p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Recipe Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please go back and select a recipe first.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full hover:from-orange-600 hover:to-red-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-orange-400 to-red-400 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-100/20 to-red-100/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-red-100/30 to-orange-100/20 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10 max-w-7xl">
        {/* Recipe Header */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 mb-12 shadow-xl border border-white/20 hover:bg-white/70 transition-all duration-700">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent mb-4">
              {dishRecipe?.name || homeRecipe}
            </h1>
            <p className="text-xl text-slate-600 mb-6 font-light leading-relaxed">
              {dishRecipe?.description || "Delicious homemade recipe"}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{dishRecipe?.time || 30}</p>
                <p className="text-sm text-gray-600">minutes</p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Star className="w-6 h-6 text-orange-600 fill-current" />
                </div>
                <p className="text-lg font-bold text-gray-900">{dishRecipe?.difficulty || "Easy"}</p>
                <p className="text-sm text-gray-600">difficulty</p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{dishRecipe?.servings || 4}</p>
                <p className="text-sm text-gray-600">servings</p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Utensils className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{dishRecipe?.calories || 300}</p>
                <p className="text-sm text-gray-600">calories</p>
              </div>
            </div>

            {/* Tags */}
            {dishRecipe?.tags && (
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                {dishRecipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-orange-100/80 to-red-100/80 backdrop-blur-sm text-orange-700 rounded-full text-sm font-medium border border-orange-200/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl border border-red-200/50 mb-8">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={clearStoredData}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 mr-4"
            >
              Clear & Try Again
            </button>
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && !error && (
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 text-center shadow-xl border border-white/20">
            <div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-gray-700">Generating your perfect recipe...</p>
            <p className="text-sm text-gray-500 mt-2">Recipe: {homeRecipe}</p>
          </div>
        )}

        {/* Recipe Content */}
        {dishRecipe && !isLoading && !error && (
          <div className="lg:bg-white/60 backdrop-blur-xl rounded-3xl lg:p-8 lg:shadow-xl mb-12 lg:border lg:border-white/20 transition-all duration-700">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Ingredients Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">🥘</span>
                  <h3 className="text-2xl font-bold text-gray-800">Ingredients</h3>
                </div>
                
                <div className="space-y-3">
                  {dishRecipe.ingredients?.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50/80 to-red-50/80 rounded-xl border border-orange-200/50 hover:shadow-md transition-all duration-300"
                    >
                      <span className="font-medium text-gray-700">
                        {ingredient.name}
                      </span>
                      <span className="text-orange-600 font-semibold">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                    </div>
                  )) || (
                    <div className="p-4 bg-gray-100 rounded-xl">
                      <p className="text-gray-600">Ingredients loading...</p>
                    </div>
                  )}
                </div>

                {/* Chef's Tip */}
                {dishRecipe.chefTip && (
                  <div className="bg-yellow-50/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-200/50 mt-6">
                    <div className="flex items-start gap-3">
                      <ChefHat className="w-6 h-6 text-yellow-600 mt-1" />
                      <div>
                        <h4 className="font-bold text-yellow-800 mb-2">Chef's Tip</h4>
                        <p className="text-yellow-700">{dishRecipe.chefTip}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mood Booster */}
                {dishRecipe.moodBooster && (
                  <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💜</span>
                      <div>
                        <h4 className="font-bold text-purple-800 mb-2">Mood Booster</h4>
                        <p className="text-purple-700">{dishRecipe.moodBooster}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Nutrition */}
                {dishRecipe.nutritionPerServing && (
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50">
                    <h4 className="text-xl font-bold mb-4 text-gray-800">Nutrition (per serving)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50/80 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{dishRecipe.nutritionPerServing.calories}</p>
                        <p className="text-sm text-blue-800">Calories</p>
                      </div>
                      <div className="text-center p-3 bg-green-50/80 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{dishRecipe.nutritionPerServing.protein}g</p>
                        <p className="text-sm text-green-800">Protein</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50/80 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">{dishRecipe.nutritionPerServing.carbs}g</p>
                        <p className="text-sm text-yellow-800">Carbs</p>
                      </div>
                      <div className="text-center p-3 bg-red-50/80 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{dishRecipe.nutritionPerServing.fats}g</p>
                        <p className="text-sm text-red-800">Fats</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">👨‍🍳</span>
                  <h3 className="text-2xl font-bold text-gray-800">Cooking Instructions</h3>
                </div>

                <div className="space-y-4">
                  {dishRecipe.steps?.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-6 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-200/50 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {step.instruction}
                        </p>
                      </div>
                    </div>
                  )) || (
                    <div className="p-6 bg-gray-100 rounded-xl">
                      <p className="text-gray-600">Instructions loading...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                <Play className="w-5 h-5" />
                Start Cooking
              </button>

              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                <Eye className="w-5 h-5" />
                Watch Video
              </button>

              <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                <MessageCircle className="w-5 h-5" />
                Cook with AI
              </button>

              <button 
                onClick={() => {
                  // Clear stored data and trigger re-fetch
                  clearStoredData();
                  
                  // Trigger re-fetch by setting homeRecipe again
                  if (homeRecipe) {
                    setTimeout(() => {
                      setError(null);
                      setIsLoading(true);
                      // The useEffect will handle the actual fetching
                    }, 100);
                  }
                }}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                Regenerate
              </button>
            </div>

            {/* Download & Share */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-200/50 hover:shadow-lg">
                <Download className="w-5 h-5" />
                Download Recipe
              </button>

              <button className="flex items-center justify-center gap-2 bg-white/80 hover:bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-200/50 hover:shadow-lg">
                <Share2 className="w-5 h-5" />
                Share Recipe
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SelectedRecipe;