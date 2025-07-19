import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useUserContext } from "../../context/CreateContext";
import axios from "axios";

const Home = () => {
  const { userContextData } = useUserContext();
  const [fullname, setFullname] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedIngredients, setSearchedIngredients] = useState("");

  useEffect(() => {
    const storedFullame = localStorage.getItem("storedFullname");
    setFullname(userContextData.fullname || storedFullame || "Guest");
  }, [userContextData.fullname]);

  const handleSearch = async () => {
    const trimmedIngredients = ingredients.trim();
    
    if (!trimmedIngredients) {
      return alert("Please enter some ingredients (e.g., paneer, curd/dahi, onion/pyaz)");
    }

    try {
      setLoading(true);
      setRecipes([]);
      
      const res = await axios.post("https://globalbites-production.up.railway.app/api/recipe-ai/get-recipes", {
        ingredients: trimmedIngredients,
      });

      setRecipes(res.data.recipes || []);
      setSearchedIngredients(res.data.searchedIngredients || trimmedIngredients);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Error fetching recipes. Please try again.");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF6E5] via-[#DCEDC1] to-[#A8E6CF] overflow-hidden" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Animated Background Elements */}
      <div className="relative inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ backgroundColor: '#FFAAA5' }}></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" style={{ backgroundColor: '#8EE4AF' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" style={{ backgroundColor: '#FFD3B6' }}></div>
        </div>
      </div>

      {/* Modern Header */}
      {/* <div className="relative backdrop-blur-sm bg-white/80 border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300" style={{ background: `linear-gradient(135deg, #FFAAA5, #FFD3B6)` }}>
                <span className="text-2xl">🍽️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#3B2F2F' }}>
                  AI Recipe Generator
                </h1>
                <p className="text-sm opacity-70" style={{ color: '#3B2F2F' }}>
                  Cook smarter, not harder
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm" style={{ color: '#3B2F2F' }}>Welcome back,</p>
              <p className="font-semibold" style={{ color: '#6A0572' }}>{fullname}</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Hero Section */}
      <section className="relative py-16 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="animate-fadeInUp">
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ color: '#3B2F2F' }}>
              What's cooking
              <span className="block mt-2" style={{ color: '#16a34a' }}>today?</span>
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{ color: '#3B2F2F', opacity: 0.8 }}>
              Transform your ingredients into culinary masterpieces with 
              <span className="font-semibold" style={{ color: '#6A0572' }}> AI-powered</span> recipe suggestions
            </p>
          </div>
          
          {/* Modern Search Bar */}
          <div className="relative max-w-3xl mx-auto group animate-slideInUp">
            <div className="absolute inset-0 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-all duration-500" style={{ background: `linear-gradient(135deg, #FFAAA5, #FFD3B6, #8EE4AF)` }}></div>
            <div className="relative flex bg-white/90 backdrop-blur-sm border-2 border-white/50 rounded-2xl p-3 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <input
                type="text"
                placeholder="Enter ingredients... (e.g., paneer, curd, tomato)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-6 py-4 bg-transparent min-h-[60px] outline-none text-xl placeholder-gray-500 rounded-xl"
                style={{ color: '#3B2F2F' }}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="text-white ml-4 px-5 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, #3dff84, #379683)` }}
              >
                {loading ? (
                  <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CiSearch size={24} />
                    <span className="hidden sm:inline">Search</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16 animate-fadeIn">
          <div className="relative mx-auto w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: '#FFAAA5', borderTopColor: 'transparent' }}></div>
            <div className="absolute inset-2 rounded-full border-4 border-b-transparent animate-spin" style={{ borderColor: '#8EE4AF', borderBottomColor: 'transparent', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 rounded-full border-4 border-r-transparent animate-spin" style={{ borderColor: '#FFD3B6', borderRightColor: 'transparent' }}></div>
          </div>
          <p className="text-xl font-semibold" style={{ color: '#3B2F2F' }}>
            Crafting perfect recipes for you...
          </p>
          <p className="text-sm mt-2" style={{ color: '#6A0572' }}>
            Using AI magic ✨
          </p>
        </div>
      )}

      {/* AI Generated Recipes */}
      {!loading && recipes.length > 0 && (
        <section className="relative px-4 py-12 max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fadeInUp">
            <h3 className="text-4xl font-bold mb-4" style={{ color: '#3B2F2F' }}>
              🍳 <span style={{ color: '#16a34a' }}>AI Curated</span> Recipes
            </h3>
            <p className="text-lg" style={{ color: '#3B2F2F', opacity: 0.8 }}>
              Based on ingredients: 
              <span className="font-semibold px-3 py-1 rounded-full ml-2" style={{ color: '#6A0572', backgroundColor: '#FFD3B6' }}>
                {searchedIngredients}
              </span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className={`group relative animate-slideInUp transform hover:-translate-y-1 hover:scale-101 transition-all duration-500`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500" style={{ background: `linear-gradient(135deg, #FFAAA5, #FFD3B6)` }}></div>
                
                {/* Main Card */}
                <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* Recipe Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2 leading-tight" style={{ color: '#3B2F2F' }}>
                        {recipe.name}
                      </h2>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#6A0572' }}>
                        #{recipe.id}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="mb-4 leading-relaxed line-clamp-3" style={{ color: '#3B2F2F', opacity: 0.8 }}>
                    {recipe.description}
                  </p>
                  
                  {/* Ingredients */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-semibold flex items-center" style={{ color: '#009d3c' }}>
                        🥘 Main Ingredients:
                      </span>
                    </div>
                    <div className="p-3 rounded-lg border-2 border-dashed" style={{ backgroundColor: '#ffb889', borderColor: '#fb291c', opacity: 0.7 }}>
                      <p className="text-sm font-medium" style={{ color: '#3B2F2F' }}>
                        {recipe.mainIngredients}
                      </p>
                    </div>
                  </div>
                  
                  {/* Cooking Time */}
                  <div className="flex items-center mb-6 p-3 rounded-lg" style={{ backgroundColor: '#8EE4AF',  }}>
                    <span className="text-sm font-semibold flex items-center" style={{ color: '#3B2F2F' }}>
                      ⏱️ Cooking Time: 
                      <span className="ml-2 px-2 py-1 rounded-full text-white text-xs" style={{ backgroundColor: '#0a9b00' }}>
                        {recipe.cookingTime}
                      </span>
                    </span>
                  </div>
                  
                  {/* View Recipe Button */}
                  <button className="w-full relative overflow-hidden text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 group">
                    <div className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ background: `linear-gradient(135deg, #6A0572, #FFAAA5)` }}></div>
                    <div className="relative z-10" style={{ background: `linear-gradient(135deg, #FFAAA5, #6A0572)`, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                      <span className="text-white">View Full Recipe 🍴</span>
                    </div>
                    <div className="absolute inset-0" style={{ background: `#076400` }}></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {!loading && recipes.length === 0 && searchedIngredients && (
        <div className="text-center py-16 animate-fadeIn">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ background: `linear-gradient(135deg, #FFD3B6, #FFAAA5)` }}>
              <span className="text-4xl">🤔</span>
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#3B2F2F' }}>
              No recipes found
            </h3>
            <p className="text-lg" style={{ color: '#3B2F2F', opacity: 0.8 }}>
              Couldn't find recipes for 
              <span className="font-semibold px-2 py-1 rounded-full mx-1" style={{ color: '#6A0572', backgroundColor: '#FFD3B6' }}>
                {searchedIngredients}
              </span>
            </p>
            <p className="text-sm mt-2" style={{ color: '#8EE4AF' }}>
              Try different ingredients! 🥗
            </p>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
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
          background: #FAFAFA;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #FFAAA5, #6A0572);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #6A0572, #FFAAA5);
        }
      `}</style>
    </div>
  );
};

export default Home;
