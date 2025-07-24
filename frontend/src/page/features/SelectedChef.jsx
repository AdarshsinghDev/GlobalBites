import React, { useState } from "react";
import {
  ChefHat,
  Heart,
  Flame,
  Zap,
  Moon,
  Lightbulb,
  Star,
  Clock,
  Sparkles,
  Award,
  Send,
  ArrowRight,
} from "lucide-react";

import { useChefContext } from "../../context/ChefContext";

const SelectedChef = () => {
  const { selectedChef } = useChefContext();

  const [customDish, setCustomDish] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  // chef data
  const getStoredChef = () => {
    try {
      const storedChef = localStorage.getItem("storeLocalSelectedChef");
      return storedChef ? JSON.parse(storedChef) : null;
    } catch (error) {
      console.log(error);
    }
  };

  const chef = selectedChef || getStoredChef();

  // Mock signature dishes
  const signatureDishes = [
    {
      name: "Butter Chicken Masala",
      emoji: "🍛",
      description:
        "Creamy tomato-based curry with tender chicken pieces, slow-cooked to perfection",
      calories: 420,
      protein: 32,
      tags: ["Energy", "Comfort"],
      cookTime: "45 min",
    },
    {
      name: "Tandoori Paneer Tikka",
      emoji: "🧀",
      description:
        "Grilled cottage cheese marinated in aromatic spices and yogurt",
      calories: 280,
      protein: 18,
      tags: ["Light", "Protein-Rich"],
      cookTime: "30 min",
    },
    {
      name: "Biryani Royale",
      emoji: "🍚",
      description: "Fragrant basmati rice layered with spiced lamb and saffron",
      calories: 520,
      protein: 28,
      tags: ["Hearty", "Traditional"],
      cookTime: "90 min",
    },
    {
      name: "Dal Makhani",
      emoji: "🫘",
      description: "Slow-cooked black lentils in rich, creamy gravy",
      calories: 320,
      protein: 22,
      tags: ["Comfort", "Protein-Rich"],
      cookTime: "60 min",
    },
    {
      name: "Masala Chai Crème Brûlée",
      emoji: "🍮",
      description: "French dessert infused with traditional Indian tea flavors",
      calories: 280,
      protein: 6,
      tags: ["Sweet", "Fusion"],
      cookTime: "120 min",
    },
    {
      name: "Samosa Chaat",
      emoji: "🥟",
      description: "Crispy samosas topped with tangy chutneys and fresh herbs",
      calories: 380,
      protein: 12,
      tags: ["Snack", "Tangy"],
      cookTime: "25 min",
    },
  ];

  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(generatedRecipe);
      console.log(chef.chefName);
    } catch (error) {}
  };

  if (!chef) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-green-400 to-teal-400">
        <div className="text-center p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Chef Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please go back and select a chef first.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full hover:from-emerald-600 hover:to-green-700 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-green-400 to-teal-400 relative">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-100/20 to-green-100/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-green-100/30 to-emerald-100/20 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10 max-w-7xl">
        {/* Enhanced Chef Profile Header */}
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 mb-12 shadow-xl border border-white/20 hover:bg-white/70 transition-all duration-700">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-110"></div>
              <img
                src={chef.chefImg}
                alt={chef.chefName}
                className="relative w-40 h-40 rounded-full shadow-2xl border-4 border-white/50 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-600 p-3 rounded-full shadow-lg">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="text-center lg:text-left flex-1">
              <div className="flex items-center gap-4 justify-center lg:justify-start mb-4 lg:flex-row flex-col">
                <h1 className=",g:text-5xl text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                  {chef.chefName}
                </h1>
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                  <Star className="w-4 h-4 text-yellow-600 fill-current" />
                  <span className="text-sm font-semibold text-yellow-700">
                    {chef.chefRating}
                  </span>
                </div>
              </div>

              <p className="text-xl text-slate-600 mb-6 font-light leading-relaxed">
                {chef.chefTags}
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="px-6 py-3 bg-gradient-to-r from-emerald-100/80 to-green-100/80 backdrop-blur-sm text-emerald-700 rounded-full text-sm font-medium border border-emerald-200/50 hover:shadow-lg transition-all duration-300">
                  🍳 {chef.chefSpeciality}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Recipe Generator */}
        <div className="lg:bg-white/60 backdrop-blur-xl rounded-3xl lg:p-8 lg:shadow-xl mb-12 lg:border  transition-all duration-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-1 bg-gradient-to-r from-emerald-500 to-green-800 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold  bg-green-900 bg-clip-text text-transparent">
                AI Recipe Generator
              </h2>
              <p className="text-slate-800">
                Get any dish in Chef {selectedChef.chefName}'s signature style
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={generatedRecipe}
                onChange={(e) => setGeneratedRecipe(e.target.value)}
                placeholder="Enter any dish you want..."
                className="w-full rounded-2xl border-2 h-[60px] border-slate-200/50 px-6 py-4 text-lg bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-emerald-500/30 focus:outline-none focus:border-emerald-500/50 transition-all duration-300 placeholder-slate-400"
              />
            </div>

            <button
              type="submit"
              className="group bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-medium text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              <span>Generate Recipe</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>

          {/* Enhanced Generated Recipe Display */}
          <div className="bg-gradient-to-br from-emerald-50/60 to-green-50/60 backdrop-blur-sm rounded-3xl p-8 border border-emerald-200/30 shadow-lg animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              <h3 className="text-2xl font-bold text-slate-800">
                {selectedChef.chefName}'s Style
              </h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-2xl">🥘</span>
                  Ingredients
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                    <span className="text-slate-700">ngredient</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-slate-700 flex items-center gap-2">
                  <span className="text-2xl">👨‍🍳</span>
                  Instructions
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      index + 1
                    </div>
                    <span className="text-slate-700 leading-relaxed"></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-100/80 to-orange-100/80 text-red-700 rounded-full border border-red-200/50">
                <Flame className="w-4 h-4" />
                <span className="font-medium">cal</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 text-blue-700 rounded-full border border-blue-200/50">
                <span className="text-sm">💪</span>
                <span className="font-medium">g protein</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-100/80 to-pink-100/80 text-purple-700 rounded-full border border-purple-200/50">
                <Clock className="w-4 h-4" />
                <span className="font-medium"></span>
              </div>

              <div className="px-5 py-3 bg-gradient-to-r from-emerald-100/80 to-green-100/80 text-emerald-700 rounded-full border border-emerald-200/50 font-medium">
                tag
              </div>
            </div>
          </div>
        </div>

        {/* Modern Signature Dishes Grid */}
        <div className="mb-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-4">
              Signature Creations
            </h2>
            <p className="text-xl text-slate-600 font-light">
              Handcrafted dishes that define excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes.map((dish, index) => (
              <div
                key={index}
                className={`group bg-white/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 cursor-pointer hover:bg-white/70 ${
                  activeCard === index ? "scale-105 bg-white/70" : ""
                }`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {dish.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                      {dish.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-light">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-red-100/80 to-orange-100/80 text-red-700 rounded-full text-xs font-medium border border-red-200/50">
                    <Flame className="w-3 h-3" />
                    {dish.calories}
                  </div>
                  <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 text-blue-700 rounded-full text-xs font-medium border border-blue-200/50">
                    <span>💪</span>
                    {dish.protein}g
                  </div>
                  <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-purple-100/80 to-pink-100/80 text-purple-700 rounded-full text-xs font-medium border border-purple-200/50">
                    <Clock className="w-3 h-3" />
                    {dish.cookTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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

export default SelectedChef;
