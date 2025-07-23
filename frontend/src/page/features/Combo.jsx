import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  AlertTriangle,
  Info,
  Sparkles,
  Zap,
  Shield,
  Brain,
} from "lucide-react";
import { CiSearch } from "react-icons/ci";

const Combo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const foodCombos = [
    {
      id: 1,
      food1: { name: "Banana", emoji: "🍌" },
      food2: { name: "Milk", emoji: "🥛" },
      sideEffect: "Can cause heaviness, toxins",
      category: "Ayurveda",
      severity: "high",
      reason:
        "According to Ayurveda, banana and milk have conflicting properties. Banana is heating while milk is cooling, leading to toxin formation and digestive issues.",
      alternatives: "Try banana smoothie with coconut milk or almond milk",
      tip: "Wait at least 20 minutes between consuming bananas and dairy products",
      icon: Brain,
    },
    {
      id: 2,
      food1: { name: "Tomato", emoji: "🍅" },
      food2: { name: "Cucumber", emoji: "🥒" },
      sideEffect: "Digestive imbalance",
      category: "Raw Veg Mix",
      severity: "medium",
      reason:
        "Tomatoes are acidic while cucumbers are alkaline. This combination can interfere with the digestive process and nutrient absorption.",
      alternatives: "Eat them separately or combine tomatoes with leafy greens",
      tip: "Allow 30 minutes gap between consuming acidic and alkaline vegetables",
      icon: Shield,
    },
    {
      id: 3,
      food1: { name: "Fish", emoji: "🐟" },
      food2: { name: "Milk", emoji: "🥛" },
      sideEffect: "May cause skin allergies",
      category: "Protein Clash",
      severity: "high",
      reason:
        "Both are high-protein foods that require different digestive enzymes. This combination can lead to protein putrefaction and allergic reactions.",
      alternatives: "Consume fish with lemon and vegetables instead",
      tip: "Keep a 2-3 hour gap between fish and dairy consumption",
      icon: AlertTriangle,
    },
    {
      id: 4,
      food1: { name: "Pineapple", emoji: "🍍" },
      food2: { name: "Milk", emoji: "🥛" },
      sideEffect: "Nausea, fermentation issues",
      category: "Fruit Mix",
      severity: "high",
      reason:
        "Pineapple contains enzymes that can curdle milk in the stomach, leading to fermentation and digestive discomfort.",
      alternatives: "Enjoy pineapple juice separately or with coconut water",
      tip: "Acidic fruits should be consumed alone for better digestion",
      icon: Zap,
    },
    {
      id: 5,
      food1: { name: "Bread", emoji: "🍞" },
      food2: { name: "Orange", emoji: "🍊" },
      sideEffect: "Acid-base imbalance",
      category: "Carb & Acid",
      severity: "medium",
      reason:
        "Citrus fruits require alkaline environment for digestion while bread needs acidic conditions, creating digestive confusion.",
      alternatives: "Have orange juice 30 minutes before meals",
      tip: "Separate carbohydrates and acidic fruits by at least 45 minutes",
      icon: Brain,
    },
    {
      id: 6,
      food1: { name: "Watermelon", emoji: "🍉" },
      food2: { name: "Bread", emoji: "🍞" },
      sideEffect: "Fermentation, acidity",
      category: "Fruit & Carb",
      severity: "medium",
      reason:
        "Watermelon digests quickly while bread takes longer, causing fermentation when mixed in the stomach.",
      alternatives: "Eat watermelon as a standalone snack",
      tip: "Always consume melons alone for optimal digestion",
      icon: Shield,
    },
    {
      id: 7,
      food1: { name: "Apple", emoji: "🍎" },
      food2: { name: "Cheese", emoji: "🧀" },
      sideEffect: "Poor digestion, gas",
      category: "Dense Combo",
      severity: "low",
      reason:
        "Fruits digest faster than dairy products, and when combined, can cause fermentation and gas formation.",
      alternatives: "Enjoy apples separately or with nuts",
      tip: "Combine fruits with similar digestion times for better absorption",
      icon: Info,
    },
    {
      id: 8,
      food1: { name: "Egg", emoji: "🥚" },
      food2: { name: "Fries", emoji: "🍟" },
      sideEffect: "Sluggish digestion",
      category: "Fat + Protein",
      severity: "medium",
      reason:
        "High-fat foods slow down protein digestion, making this combination heavy on the digestive system.",
      alternatives: "Pair eggs with vegetables and herbs",
      tip: "Limit high-fat and high-protein combinations, especially at night",
      icon: Zap,
    },
    {
      id: 9,
      food1: { name: "Beer", emoji: "🍺" },
      food2: { name: "Burger", emoji: "🍔" },
      sideEffect: "Bloating, weight gain",
      category: "Toxin Load",
      severity: "high",
      reason:
        "Alcohol impairs fat metabolism while processed foods add to toxic load, leading to poor digestion and weight gain.",
      alternatives:
        "Choose lighter meals with alcohol or skip alcohol with heavy meals",
      tip: "Stay hydrated and choose one indulgence at a time",
      icon: AlertTriangle,
    },
    {
      id: 10,
      food1: { name: "Chocolate", emoji: "🍫" },
      food2: { name: "Milk", emoji: "🥛" },
      sideEffect: "Slow metabolism",
      category: "Dairy clash",
      severity: "low",
      reason:
        "Both are heavy, sweet foods that can overwhelm the digestive system and slow down metabolic processes.",
      alternatives: "Try dark chocolate with herbal tea",
      tip: "Limit dairy and sugar combinations for better energy levels",
      icon: Brain,
    },
  ];

  const categoryColors = {
    Ayurveda: {
      bg: "from-emerald-400 to-green-500",
      border: "border-emerald-200",
      text: "text-emerald-800",
    },
    "Protein Clash": {
      bg: "from-red-400 to-rose-500",
      border: "border-red-200",
      text: "text-red-800",
    },
    "Carb & Acid": {
      bg: "from-cyan-400 to-teal-500",
      border: "border-cyan-200",
      text: "text-cyan-800",
    },
    "Fruit Mix": {
      bg: "from-amber-400 to-orange-500",
      border: "border-amber-200",
      text: "text-amber-800",
    },
    "Raw Veg Mix": {
      bg: "from-slate-400 to-gray-500",
      border: "border-slate-200",
      text: "text-slate-800",
    },
    "Dense Combo": {
      bg: "from-blue-400 to-indigo-500",
      border: "border-blue-200",
      text: "text-blue-800",
    },
    "Fat + Protein": {
      bg: "from-orange-400 to-red-500",
      border: "border-orange-200",
      text: "text-orange-800",
    },
    "Toxin Load": {
      bg: "from-purple-400 to-violet-500",
      border: "border-purple-200",
      text: "text-purple-800",
    },
    "Dairy clash": {
      bg: "from-indigo-400 to-purple-500",
      border: "border-indigo-200",
      text: "text-indigo-800",
    },
    "Fruit & Carb": {
      bg: "from-pink-400 to-rose-500",
      border: "border-pink-200",
      text: "text-pink-800",
    },
  };

  const severityColors = {
    high: "from-red-500 to-red-600",
    medium: "from-amber-500 to-orange-600",
    low: "from-blue-500 to-indigo-600",
  };

  const filteredCombos = foodCombos.filter(
    (combo) =>
      searchQuery === "" ||
      combo.food1.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      combo.food2.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      combo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      combo.sideEffect.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-teal-400  relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-teal-600 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-60 h-60 bg-gradient-to-br from-green-600 to-teal-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-green-900 to-emerald-800 rounded-full opacity-20 animate-ping"></div>
      </div>

      <div
        className={`relative z-10 container mx-auto px-4 py-8 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>PREMIUM NUTRITION INSIGHTS</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold ">
            🚫
            <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent mb-6 leading-tight">
              Don't Combo
            </span>
          </h1>
          <div className="relative">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 opacity-90">
              Food Combinations to Avoid
            </h2>
            <p className="relative text-gray-200 text-lg max-w-3xl mx-auto italic bg-black bg-opacity-30 backdrop-blur-sm rounded-xl px-6 py-4 border border-white border-opacity-20">
              Not all foods are meant to be eaten together. Discover
              combinations that may affect your digestion, health, and energy
              with our AI-powered analysis.
            </p>
          </div>
        </div>

        {/* Premium Search Bar */}
        <div className="flex w-1/2 m-auto mb-12 flex-col sm:flex-row gap-2 sm:gap-0 bg-green-400/60 backdrop-blur-sm border-2 border-green-200/50 rounded-2xl p-2 sm:p-3 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <input
            type="text"
            placeholder="Enter ingredients...(e.g.Fish, Doodh)"
            className="text-white  flex-1 px-3 py-3 sm:py-4 h-[50px] bg-transparent text-base sm:text-lg lg:text-xl outline-none placeholder-white rounded-xl"
          />

          <button className=" ml-4 text-white bg-green-900 px-1 sm:px-2 py-1 sm:py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 flex-shrink-0">
            <div className="flex items-center justify-center space-x-2">
              <CiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base">Search</span>
            </div>
          </button>
        </div>

        {/* Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCombos.map((combo, index) => {
            const IconComponent = combo.icon;
            return (
              <div
                key={combo.id}
                onClick={() => setSelectedCombo(combo)}
                onMouseEnter={() => setHoveredCard(combo.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative cursor-pointer transition-all duration-500 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Glow Effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${
                    categoryColors[combo.category]?.bg ||
                    "from-gray-400 to-gray-500"
                  } rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
                ></div>

                {/* Main Card */}
                <div className="relative bg-black bg-opacity-60 backdrop-blur-xl border border-white border-opacity-20 rounded-3xl p-6 h-full transform group-hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                  {/* Severity Indicator */}
                  <div
                    className={`absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r ${
                      severityColors[combo.severity]
                    } shadow-lg animate-pulse`}
                  ></div>

                  {/* Food Combination */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className="relative group-hover:animate-bounce">
                        <span className="text-4xl filter drop-shadow-lg">
                          {combo.food1.emoji}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-red-400 animate-pulse">
                        ×
                      </div>
                      <div
                        className="relative group-hover:animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      >
                        <span className="text-4xl filter drop-shadow-lg">
                          {combo.food2.emoji}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-white">
                        {combo.food1.name} + {combo.food2.name}
                      </p>
                    </div>
                  </div>

                  {/* Category Tag */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`relative px-4 py-2 rounded-full bg-gradient-to-r ${
                        categoryColors[combo.category]?.bg ||
                        "from-gray-400 to-gray-500"
                      } text-white text-xs font-bold uppercase tracking-wider shadow-lg`}
                    >
                      {combo.category}
                      <div className="absolute inset-0 rounded-full bg-white opacity-20 group-hover:animate-ping"></div>
                    </div>
                  </div>

                  {/* Side Effect */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-2 bg-red-500 bg-opacity-20 backdrop-blur-sm rounded-xl px-4 py-3 border border-red-500 border-opacity-30">
                      <IconComponent className="w-4 h-4 text-red-400" />
                      <p className="text-sm font-medium text-red-300">
                        {combo.sideEffect}
                      </p>
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  <div
                    className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 transition-opacity duration-300 ${
                      hoveredCard === combo.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Click for details ✨
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCombos.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <p className="text-gray-300 text-xl">
              No combinations found matching your search.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try searching for common foods like "milk", "fruit", or "protein"
            </p>
          </div>
        )}
      </div>

      {/* Premium Modal */}
      {selectedCombo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="relative max-w-2xl w-full">
            {/* Modal Glow */}
            <div
              className={`absolute -inset-0.5 bg-gradient-to-r ${
                categoryColors[selectedCombo.category]?.bg ||
                "from-gray-400 to-gray-500"
              } rounded-3xl blur opacity-75 animate-pulse`}
            ></div>

            <div className="relative bg-black bg-opacity-90 backdrop-blur-xl border border-white border-opacity-30 rounded-3xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="p-8 border-b border-white border-opacity-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">
                      {selectedCombo.food1.emoji}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {selectedCombo.food1.name}
                    </span>
                    <div className="text-red-400 font-bold text-2xl animate-pulse">
                      ×
                    </div>
                    <span className="text-3xl">
                      {selectedCombo.food2.emoji}
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {selectedCombo.food2.name}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCombo(null)}
                    className="p-3 hover:bg-white hover:bg-opacity-10 rounded-full transition-all duration-300 group"
                  >
                    <X className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8">
                {/* Side Effect Alert */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-red-600 p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <div className="relative flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-white" />
                    <p className="font-bold text-white text-lg">
                      {selectedCombo.sideEffect}
                    </p>
                  </div>
                </div>

                {/* Scientific Reason */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-3 mb-4">
                      <Brain className="w-6 h-6 text-white" />
                      <h3 className="font-bold text-white text-lg">
                        Scientific Explanation
                      </h3>
                    </div>
                    <p className="text-white text-sm leading-relaxed opacity-90">
                      {selectedCombo.reason}
                    </p>
                  </div>
                </div>

                {/* Alternatives */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="w-6 h-6 text-white" />
                      <h3 className="font-bold text-white text-lg">
                        Better Alternatives
                      </h3>
                    </div>
                    <p className="text-white text-sm leading-relaxed opacity-90">
                      {selectedCombo.alternatives}
                    </p>
                  </div>
                </div>

                {/* Nutrition Tip */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 shadow-2xl">
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-3 mb-4">
                      <Sparkles className="w-6 h-6 text-white" />
                      <h3 className="font-bold text-white text-lg">Pro Tip</h3>
                    </div>
                    <p className="text-white text-sm leading-relaxed opacity-90">
                      {selectedCombo.tip}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="text-center">
                  <div
                    className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${
                      categoryColors[selectedCombo.category]?.bg ||
                      "from-gray-400 to-gray-500"
                    } text-white font-bold text-sm uppercase tracking-wider shadow-xl`}
                  >
                    Category: {selectedCombo.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes tilt {
          0%,
          50%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(0.5deg);
          }
          75% {
            transform: rotate(-0.5deg);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Combo;
