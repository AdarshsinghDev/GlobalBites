import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Beaker,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  Filter,
  Sparkles,
  Atom,
} from "lucide-react";

const ScienceBehind = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  // Default food combinations data
  const foodCombinations = [
    {
      id: 1,
      name: "Milk + Citrus",
      category: "Avoid",
      fact: "Citrus causes milk to curdle in the stomach, leading to indigestion and acidity.",
      sideEffects: "Stomach cramps, nausea, bloating",
      icon: "🥛🍋",
      borderColor: "border-red-400",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      intensity: "High Risk",
    },
    {
      id: 2,
      name: "Curd + Fish",
      category: "Avoid",
      fact: "The combination can create toxins and cause digestive issues due to opposing properties.",
      sideEffects: "Food poisoning symptoms, digestive distress",
      icon: "🐟🥛",
      borderColor: "border-red-400",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      intensity: "High Risk",
    },
    {
      id: 3,
      name: "Banana + Milk",
      category: "Healthy",
      fact: "Rich in potassium and protein, this combination aids muscle recovery and provides sustained energy.",
      benefits:
        "Enhanced protein absorption, muscle recovery, sustained energy",
      icon: "🍌🥛",
      borderColor: "border-green-400",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      intensity: "Excellent",
    },
    {
      id: 4,
      name: "Tomato + Cheese",
      category: "Healthy",
      fact: "Lycopene in tomatoes becomes more bioavailable when combined with fats from cheese.",
      benefits: "Increased antioxidant absorption, heart health",
      icon: "🍅🧀",
      borderColor: "border-green-400",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      intensity: "Great",
    },
    {
      id: 5,
      name: "Honey + Hot Water",
      category: "Avoid",
      fact: "Heating honey above 40°C can produce toxic compounds and destroy beneficial enzymes.",
      sideEffects: "Loss of nutrients, potential toxicity",
      icon: "🍯🔥",
      borderColor: "border-red-400",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      intensity: "Medium Risk",
    },
    {
      id: 6,
      name: "Spinach + Iron",
      category: "Neutral",
      fact: "Oxalates in spinach can inhibit iron absorption, but vitamin C can counteract this effect.",
      benefits: "Moderate iron absorption with proper preparation",
      icon: "🥬⚡",
      borderColor: "border-yellow-400",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      intensity: "Moderate",
    },
    {
      id: 7,
      name: "Turmeric + Black Pepper",
      category: "Healthy",
      fact: "Piperine in black pepper increases curcumin absorption by up to 2000%.",
      benefits:
        "Enhanced anti-inflammatory effects, better nutrient absorption",
      icon: "🧄🌶️",
      borderColor: "border-green-400",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      intensity: "Superb",
    },
    {
      id: 8,
      name: "Watermelon + Water",
      category: "Avoid",
      fact: "Can dilute digestive juices and cause digestive issues due to high water content.",
      sideEffects: "Bloating, poor digestion, stomach discomfort",
      icon: "🍉💧",
      borderColor: "border-red-400",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      intensity: "Low Risk",
    },
    {
      id: 9,
      name: "Carrots + Fat",
      category: "Healthy",
      fact: "Beta-carotene is fat-soluble, so combining carrots with healthy fats improves vitamin A absorption.",
      benefits: "Better vitamin A absorption, eye health",
      icon: "🥕🥑",
      borderColor: "border-green-400",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      intensity: "Great",
    },
    {
      id: 10,
      name: "Tea + Iron-rich Foods",
      category: "Avoid",
      fact: "Tannins in tea bind with iron, reducing its absorption significantly.",
      sideEffects: "Iron deficiency, reduced mineral absorption",
      icon: "🫖🥩",
      borderColor: "border-red-400",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      intensity: "Medium Risk",
    },
    {
      id: 11,
      name: "Yogurt + Berries",
      category: "Healthy",
      fact: "Probiotics in yogurt combined with antioxidants in berries support gut health and immunity.",
      benefits: "Improved gut health, enhanced immunity, antioxidant boost",
      icon: "🫐🥛",
      borderColor: "border-green-400",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      intensity: "Excellent",
    },
    {
      id: 12,
      name: "Chocolate + Milk",
      category: "Neutral",
      fact: "While delicious, the combination can be heavy and may cause sluggishness in some people.",
      benefits: "Quick energy boost, mood enhancement",
      icon: "🍫🥛",
      borderColor: "border-yellow-400",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      intensity: "Moderate",
    },
    {
      id: 13,
      name: "Lemon + Honey",
      category: "Healthy",
      fact: "Vitamin C in lemon enhances the antimicrobial properties of honey, boosting immunity.",
      benefits: "Immune system boost, natural detox, throat soothing",
      icon: "🍋🍯",
      borderColor: "border-green-400",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      intensity: "Great",
    },
    {
      id: 14,
      name: "Alcohol + Caffeine",
      category: "Avoid",
      fact: "Can mask alcohol impairment and lead to dangerous overconsumption.",
      sideEffects:
        "Increased risk of accidents, heart palpitations, dehydration",
      icon: "🍷☕",
      borderColor: "border-red-400",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      intensity: "High Risk",
    },
    {
      id: 15,
      name: "Oats + Berries",
      category: "Healthy",
      fact: "Fiber in oats combined with antioxidants in berries provides sustained energy and heart benefits.",
      benefits: "Heart health, sustained energy, digestive health",
      icon: "🥣🫐",
      borderColor: "border-green-400",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      intensity: "Excellent",
    },
  ];

  // Filter combinations based on search query and selected filter
  const filteredCombinations = useMemo(() => {
    const filtered = foodCombinations.filter((combo) => {
      const matchesSearch =
        combo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        combo.fact.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter === "All" || combo.category === selectedFilter;
      return matchesSearch && matchesFilter;
    });
    return filtered;
  }, [searchQuery, selectedFilter]);

  // Simulate search loading and staggered card animation
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      setVisibleCards([]);

      const timer = setTimeout(() => {
        setIsLoading(false);
        // Stagger card appearance
        filteredCombinations.forEach((_, index) => {
          setTimeout(() => {
            setVisibleCards((prev) => [...prev, index]);
          }, index * 100);
        });
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setVisibleCards(filteredCombinations.map((_, index) => index));
    }
  }, [searchQuery, filteredCombinations]);

  const filters = ["All", "Healthy", "Avoid", "Neutral"];

  const didYouKnowTips = [
    "Your taste buds can only detect 5 basic tastes: sweet, sour, salty, bitter, and umami!",
    "Cooking tomatoes actually increases their nutritional value by making lycopene more available.",
    "The human nose can distinguish between 1 trillion different scents!",
    "Spicy food doesn't actually burn your tongue - it tricks pain receptors into thinking they're hot.",
    "Dark chocolate contains more antioxidants than most fruits!",
  ];

  const [currentTip] = useState(
    didYouKnowTips[Math.floor(Math.random() * didYouKnowTips.length)]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-green-400 to-teal-500 relative overflow-hidden">
      {/* Animated Background Elements */}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/20 to-transparent blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-4 mb-6 group">
              <div className="relative">
                <Beaker className="w-16 h-16 text-green-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text">
                  Science Behind the Food
                </h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Sparkles className="w-5 h-5 text-green-500 animate-pulse" />
                  <Atom
                    className="w-4 h-4 text-blue-500 animate-spin"
                    style={{ animationDuration: "4s" }}
                  />
                  <Sparkles
                    className="w-5 h-5 text-green-500 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </div>
            </div>
            <p className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
              Understand the science behind the meals you eat. Learn what
              combinations work, what don't—and why!
            </p>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="mb-12">
          <div className="relative max-w-3xl mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-green-400/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/50">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search a food combination like 'curd and fish'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-6 h-[50px] rounded-xl border-0 bg-transparent focus:outline-none text-lg placeholder-slate-400 font-medium"
                />
                {isLoading && (
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Filter Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            {filters.map((filter, index) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                  selectedFilter === filter
                    ? "bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-900 shadow-lg shadow-green-300/30 scale-105"
                    : "bg-white/80 backdrop-blur-sm text-slate-600 border border-slate-200/50 hover:bg-white hover:shadow-md hover:border-green-200"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Filter className="w-4 h-4" />
                {filter}
                {filter !== "All" && (
                  <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {
                      foodCombinations.filter((c) => c.category === filter)
                        .length
                    }
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Results Count */}
        {searchQuery && (
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50">
              <p className="text-slate-600 font-medium">
                {filteredCombinations.length > 0 ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Found {filteredCombinations.length} combination
                    {filteredCombinations.length !== 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    No combinations found. Try a different search term! 🤔
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Food Combinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCombinations.map((combo, index) => (
            <div
              key={combo.id}
              className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 ${
                combo.borderColor
              } border-l-4 ${
                visibleCards.includes(index)
                  ? "animate-slide-up opacity-100"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-r from-green-200/30 via-blue-200/30 to-green-200/30"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-3 group-hover:text-slate-900 transition-colors">
                      <span className="text-3xl transform group-hover:scale-125 transition-transform duration-300">
                        {combo.icon}
                      </span>
                      <span>{combo.name}</span>
                    </h2>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-sm ${combo.bgColor} ${combo.textColor} px-3 py-2 rounded-full font-bold inline-flex items-center gap-2 shadow-sm`}
                      >
                        {combo.category === "Avoid" && (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        {combo.category === "Healthy" && (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        {combo.category === "Neutral" && (
                          <Info className="w-3 h-3" />
                        )}
                        {combo.category}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">
                        {combo.intensity}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 mb-5 leading-relaxed text-sm font-medium group-hover:text-slate-700 transition-colors">
                  {combo.fact}
                </p>

                {combo.sideEffects && (
                  <div className="mb-4 p-3 bg-red-50/80 rounded-lg border border-red-100">
                    <p className="text-sm font-bold text-red-600 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Side Effects:
                    </p>
                    <p className="text-sm text-red-700 font-medium">
                      {combo.sideEffects}
                    </p>
                  </div>
                )}

                {combo.benefits && (
                  <div className="mb-4 p-3 bg-green-50/80 rounded-lg border border-green-100">
                    <p className="text-sm font-bold text-green-600 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Benefits:
                    </p>
                    <p className="text-sm text-green-700 font-medium">
                      {combo.benefits}
                    </p>
                  </div>
                )}

                <button
                  style={{
                    backgroundColor: "#A8E6CF",
                    backgroundImage:
                      "linear-gradient(135deg, rgb(63 227 124) 0%, rgb(20 105 79) 100%)",
                  }}
                  className="w-full mt-4  hover:from-green-100 hover:to-green-200 text-white hover:text-green-800 py-3 px-6 rounded-xl transition-all duration-300 font-bold text-sm shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Did You Know Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-600 to-teal-400 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-teal-500 rounded-2xl p-8 text-white shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Lightbulb className="w-10 h-10 text-yellow-200 animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    Did You Know?
                    <span className="text-yellow-200 animate-bounce">💡</span>
                  </h3>
                  <p className="text-white/95 text-lg leading-relaxed font-medium">
                    {currentTip}
                  </p>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <Sparkles
                    className="w-8 h-8 text-yellow-200 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ScienceBehind;
