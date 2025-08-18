import React, { useEffect, useState } from "react";
import { CiSearch, CiCircleMore } from "react-icons/ci";

import {
  ChefHat,
  Heart,
  DollarSign,
  FlaskConicalOff,
  CalendarDays,
  HeartHandshake,
  X,
} from "lucide-react";

import axios from "axios";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/CreateContext";
import Loading from "../../components/ui/Loading";
import { useNavigate } from "react-router-dom";
import { useHomeRecipeContext } from "../../context/HomeRecipeContext";
const Home = () => {
  const { userContextData } = useUserContext();
  const [fullname, setFullname] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedIngredients, setSearchedIngredients] = useState("");
  const [closeMenu, setCloseMenu] = useState(false);
  const { setHomeRecipe } = useHomeRecipeContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storedFullame = localStorage.getItem("storedFullname");
    setFullname(userContextData.fullname || storedFullame || "Guest");
  }, [userContextData.fullname]);

  const handleSearch = async () => {
    const trimmedIngredients = ingredients.trim();

    if (!trimmedIngredients) {
      return alert(
        "Please enter some ingredients (e.g., paneer, curd/dahi, onion/pyaz)"
      );
    }

    try {
      setLoading(true);
      setRecipes([]);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipe-ai/get-recipes`,
        {
          ingredients: trimmedIngredients,
        }
      );

      setRecipes(res.data.recipes || []);
      setSearchedIngredients(
        res.data.searchedIngredients || trimmedIngredients
      );
      setLoading(false);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Error fetching recipes. Please try again.");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const featuresBtn = [
    { id: 1, btnTitle: "Chef", btnIcon: ChefHat, to: "/chef" },
    { id: 2, btnTitle: "Budget", btnIcon: DollarSign, to: "/budget" },
    { id: 3, btnTitle: "Dont Combo", btnIcon: X, to: "/combo" },
    { id: 4, btnTitle: "Mood Based", btnIcon: Heart, to: "/mood" },
    {
      id: 5,
      btnTitle: "Science behind",
      btnIcon: FlaskConicalOff,
      to: "/science-behind",
    },
    { id: 6, btnTitle: "Health Goal", btnIcon: HeartHandshake, to: "/health" },
    { id: 7, btnTitle: "Weekly Meal", btnIcon: CalendarDays, to: "/chef" },
  ];

  const handleCloseMenu = () => {
    setCloseMenu((prev) => !prev);
    console.log("workin");
  };
  //  const handleNavigate = (recipe) => {
  //     navigate("/recipe");
  //     console.log(recipe);
  //     setHomeRecipe(recipe);
  //     localStorage.setItem("storeHomeRecipe", recipe);
  //   };

  const handleNavigate = (recipeName) => {
    console.log("Navigating to recipe:", recipeName);

    // Clear any existing stored recipe data to force fresh fetch
    localStorage.removeItem("storeHomeRecipeData");

    // Set the recipe name in context and localStorage
    setHomeRecipe(recipeName);
    localStorage.setItem("storeHomeRecipe", recipeName); // Store just the name

    // Navigate to recipe page
    navigate("/recipe");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-teal-300 overflow-hidden"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      {/* Animated Background Elements */}
      <div className="relative inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div
            className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ backgroundColor: "#FFAAA5" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"
            style={{ backgroundColor: "#8EE4AF" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"
            style={{ backgroundColor: "#FFD3B6" }}
          ></div>
        </div>
      </div>

      {/* Modal Overlay - Fixed Logic */}
      {closeMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-4 overflow-y-auto">
          {/* Modal Container - Fully Responsive */}
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto max-h-[90vh] bg-gradient-to-br from-[#EDF6E5] via-[#bbfae3] to-[#15885e] rounded-xl shadow-2xl relative overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseMenu}
              className="absolute top-2  right-3 z-10 bg-green-500 hover:bg-green-700 text-white rounded-full p-1 transform transition-all duration-500 ease-in-out hover:scale-110 shadow-2xl"
            >
              <X size={24} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 md:p-10 sm:pt-20 pt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 justify-items-center">
                {featuresBtn.map((btn) => {
                  const Icon = btn.btnIcon;
                  return (
                    <Link
                      key={btn.id}
                      className="w-full max-w-[200px]"
                      to={btn.to}
                    >
                      <button className="flex items-center sm:gap-3 w-full bg-white text-black border-green-600 border-2 shadow-lg px-3 sm:px-4  sm:py-3 py-3 gap-1 rounded-xl hover:bg-green-100 transition duration-300 text-sm sm:text-base">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0" />
                        <span className="truncate">{btn.btnTitle}</span>
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="animate-fadeInUp">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 leading-tight"
              style={{ color: "#3B2F2F" }}
            >
              What's cooking
              <span className="block mt-1 lg:mt-2" style={{ color: "#16a34a" }}>
                today?
              </span>
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
              style={{ color: "#3B2F2F", opacity: 0.8 }}
            >
              Memories don't come in English only.
              <br />
              🗣️ English . हिन्दी . भोजपुरी . ગુજરાતી . తెలుగు . മലയാളം . मराठी
              <br />
              So we made GlobalBites understand your language too.
            </p>
          </div>

          {/* Modern Search Bar - Fully Responsive */}
          <div className="relative max-w-3xl mx-auto group animate-slideInUp px-4">
            <div
              className="absolute inset-0 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, #FFAAA5, #FFD3B6, #8EE4AF)`,
              }}
            ></div>
            <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-0 bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-2 sm:p-3 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <input
                type="text"
                placeholder="Enter ingredients...(e.g.paneer, curd, tomato)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-3 sm:py-4 h-[50px] bg-transparent text-base sm:text-lg lg:text-xl outline-none placeholder-gray-500 rounded-xl"
                style={{ color: "#3B2F2F" }}
              />
              <div className="flex gap-2 sm:gap-1 justify-center">
                <button
                  onClick={handleCloseMenu}
                  className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <CiCircleMore className="w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                </button>

                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="text-white px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, #3dff84, #379683)`,
                  }}
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 sm:h-6 sm:w-6 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <CiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-sm sm:text-base">Search</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && <Loading />}

      {/* AI Generated Recipes */}
      {!loading && recipes.length > 0 && (
        <section className="relative px-4 py-8 sm:py-12 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fadeInUp">
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "#3B2F2F" }}
            >
              🍳 <span style={{ color: "#16a34a" }}>AI Curated</span> Recipes
            </h3>
            <p
              className="text-base sm:text-lg px-4"
              style={{ color: "#3B2F2F", opacity: 0.8 }}
            >
              Based on ingredients:
              <span
                className="font-semibold px-2 sm:px-3 py-1 rounded-full ml-1 sm:ml-2 text-sm sm:text-base inline-block mt-1 sm:mt-0"
                style={{ color: "#6A0572", backgroundColor: "#FFD3B6" }}
              >
                {searchedIngredients}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {recipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className={`group relative animate-slideInUp transform hover:-translate-y-1 hover:scale-101 transition-all duration-500`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card Glow Effect */}
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, #FFAAA5, #FFD3B6)`,
                  }}
                ></div>

                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  {/* Recipe Header */}
                  <div className="flex items-start justify-between mb-4 gap-2">
                    <div className="flex-1 min-w-0">
                      <h2
                        className="text-lg sm:text-xl font-bold mb-2 leading-tight"
                        style={{ color: "#3B2F2F" }}
                      >
                        {recipe.name}
                      </h2>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                        style={{ backgroundColor: "#6A0572" }}
                      >
                        #{recipe.id}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="mb-4 leading-relaxed line-clamp-3 text-sm sm:text-base flex-grow"
                    style={{ color: "#3B2F2F", opacity: 0.8 }}
                  >
                    {recipe.description}
                  </p>

                  {/* Ingredients */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span
                        className="text-sm font-semibold flex items-center"
                        style={{ color: "#009d3c" }}
                      >
                        🥘 Main Ingredients:
                      </span>
                    </div>
                    <div
                      className="p-2 sm:p-3 rounded-lg border-2 border-dashed"
                      style={{
                        backgroundColor: "#ffb889",
                        borderColor: "#fb291c",
                        opacity: 0.7,
                      }}
                    >
                      <p
                        className="text-xs sm:text-sm font-medium break-words"
                        style={{ color: "#3B2F2F" }}
                      >
                        {recipe.mainIngredients}
                      </p>
                    </div>
                  </div>

                  {/* Cooking Time */}
                  <div
                    className="flex items-center mb-4 sm:mb-6 p-2 sm:p-3 rounded-lg"
                    style={{ backgroundColor: "#8EE4AF" }}
                  >
                    <span
                      className="text-sm font-semibold flex items-center flex-wrap"
                      style={{ color: "#3B2F2F" }}
                    >
                      ⏱️ Cooking Time:
                      <span
                        className="ml-2 px-2 py-1 rounded-full text-white text-xs"
                        style={{ backgroundColor: "#0a9b00" }}
                      >
                        {recipe.cookingTime}
                      </span>
                    </span>
                  </div>

                  {/* View Recipe Button */}
                  <button
                    type="button"
                    onClick={() => handleNavigate(recipe.name)}
                    className="w-full relative overflow-hidden text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 group mt-auto"
                  >
                    <div
                      className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{
                        background: `linear-gradient(135deg, #6A0572, #FFAAA5)`,
                      }}
                    ></div>
                    <div
                      className="relative z-10"
                      style={{
                        background: `linear-gradient(135deg, #FFAAA5, #6A0572)`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    >
                      <span className="text-white text-sm sm:text-base">
                        View Full Recipe 🍴
                      </span>
                    </div>
                    <div
                      className="absolute inset-0"
                      style={{ background: `#076400` }}
                    ></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {!loading && recipes.length === 0 && searchedIngredients && (
        <div className="text-center py-8 sm:py-16 animate-fadeIn px-4">
          <div className="max-w-md mx-auto">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              style={{
                background: `linear-gradient(135deg, #FFD3B6, #FFAAA5)`,
              }}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl">🤔</span>
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold mb-4"
              style={{ color: "#3B2F2F" }}
            >
              No recipes found
            </h3>
            <p
              className="text-base sm:text-lg"
              style={{ color: "#3B2F2F", opacity: 0.8 }}
            >
              Couldn't find recipes for
              <span
                className="font-semibold px-2 py-1 rounded-full mx-1 text-sm sm:text-base inline-block"
                style={{ color: "#6A0572", backgroundColor: "#FFD3B6" }}
              >
                {searchedIngredients}
              </span>
            </p>
            <p className="text-sm mt-2" style={{ color: "#8EE4AF" }}>
              Try different ingredients! 🥗
            </p>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
        background: #f5f5f5;
        }

        ::-webkit-scrollbar-thumb {
         background: linear-gradient(135deg, #1DB954, #21E065);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
           background: linear-gradient(135deg, #21E065, #1DB954);
        }
      `}</style>
    </div>
  );
};

export default Home;
