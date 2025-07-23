import React, { useState } from "react";
import {
  Calculator,
  Calendar,
  Heart,
  Zap,
  Brain,
  Moon,
  Target,
  Bell,
  CheckCircle,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GiWeight, GiFruitBowl, GiMeat } from "react-icons/gi";
import { TbMoodHeart } from "react-icons/tb";

const Health = () => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [bmiData, setBmiData] = useState({
    height: "",
    weight: "",
    bmi: null,
    category: "",
  });
  const [currentDay, setCurrentDay] = useState(0);
  const [healthGoal, setHealthGoal] = useState({
    days: 45,
    currentDay: 14,
    reminder: false,
  });

  const foodPreferences = [
    { id: "veggie", emoji: "🥬", label: "Veggie-Lover" },
    { id: "oily", emoji: "🍳", label: "Little Oily" },
    { id: "spicy", emoji: "🌶️", label: "Spicy Cravings" },
    { id: "lowcal", emoji: "🥗", label: "Low-Cal" },
    { id: "protein", emoji: "🥘", label: "High-Protein" },
    { id: "carb", emoji: "🥐", label: "Carb-Lover" },
    { id: "dairy", emoji: "🧀", label: "Dairy-Based" },
    { id: "nonveg", emoji: "🍖", label: "Non-Veg Only" },
  ];

  const cuisineTypes = [
    { id: "indian", emoji: "🍱", label: "Indian" },
    { id: "mediterranean", emoji: "🥙", label: "Mediterranean" },
    { id: "western", emoji: "🥩", label: "Western" },
    { id: "asian", emoji: "🍜", label: "Asian" },
    { id: "mexican", emoji: "🌮", label: "Mexican" },
    { id: "vegan", emoji: "🥗", label: "Vegan Fusion" },
    { id: "continental", emoji: "🥞", label: "Continental" },
    { id: "detox", emoji: "🥒", label: "Detox" },
  ];

  const healthConditions = [
    "Diabetes",
    "High Blood Pressure",
    "PCOS / PCOD",
    "Hairfall",
    "Skin Acne",
    "Thyroid",
    "Obesity",
    "Heart Disease",
    "Weak Immunity",
    "Fatigue",
    "Iron Deficiency",
    "Vitamin D Deficiency",
    "Constipation",
    "Indigestion",
    "High Cholesterol",
    "Sugar Craving",
    "Menstrual Pain",
    "Insomnia",
    "Depression / Anxiety",
    "Memory Fog",
  ];

  const homeRemedies = [
    {
      emoji: "🌿",
      text: "Amla juice with honey reduces hairfall",
      highlighted: true,
    },
    {
      emoji: "💧",
      text: "Jeera water in morning helps fat loss",
      highlighted: false,
    },
    {
      emoji: "🧄",
      text: "Garlic with warm water improves heart health",
      highlighted: false,
    },
    { emoji: "🥒", text: "Cucumber juice cools the liver", highlighted: false },
    { emoji: "🍋", text: "Lemon water boosts immunity", highlighted: false },
    { emoji: "🫚", text: "Ginger tea aids digestion", highlighted: false },
    { emoji: "🥥", text: "Coconut oil helps with thyroid", highlighted: false },
    {
      emoji: "🌱",
      text: "Fenugreek seeds control diabetes",
      highlighted: false,
    },
    {
      emoji: "🍯",
      text: "Honey and cinnamon for weight loss",
      highlighted: false,
    },
    {
      emoji: "🥛",
      text: "Turmeric milk reduces inflammation",
      highlighted: false,
    },
    { emoji: "🌿", text: "Mint leaves for fresh breath", highlighted: false },
    {
      emoji: "🥗",
      text: "Bitter gourd juice for blood sugar",
      highlighted: false,
    },
  ];

  const calculateBMI = () => {
    if (bmiData.height && bmiData.weight) {
      const heightInM = bmiData.height / 100;
      const bmi = (bmiData.weight / (heightInM * heightInM)).toFixed(1);
      let category = "";
      if (bmi < 18.5) category = "Underweight";
      else if (bmi < 25) category = "Normal";
      else if (bmi < 30) category = "Overweight";
      else category = "Obese";

      setBmiData((prev) => ({ ...prev, bmi, category }));
    }
  };

  const togglePreference = (id) => {
    setSelectedPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleCuisine = (id) => {
    setSelectedCuisines((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleCondition = (condition) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const getMoodBadge = (mealName) => {
    const moodMappings = {
      "Oats Bowl": {
        mood: "😌",
        text: "Calms Anxiety",
        color: "bg-purple-100 text-purple-700",
      },
      "Green Smoothie": {
        mood: "🌞",
        text: "Energy Booster",
        color: "bg-yellow-100 text-yellow-700",
      },
      "Salmon Fillet": {
        mood: "🧠",
        text: "Memory & Focus",
        color: "bg-indigo-100 text-indigo-700",
      },
      "Turkey Breast": {
        mood: "💪",
        text: "Post Workout",
        color: "bg-green-100 text-green-700",
      },
      "Chia Pudding": {
        mood: "😴",
        text: "Good for Sleep",
        color: "bg-blue-100 text-blue-700",
      },
    };
    return moodMappings[mealName] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#b7f382] via-[#a2db46] to-[#3dd39c]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🌿 Health & Wellness Hub
          </h1>
          <p className="text-white/80 text-lg">
            Your personalized journey to better health
          </p>
        </div>

        {/* Food Preference Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <GiFruitBowl className="text-[#3dd39c]" />
            What's your food style today?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {foodPreferences.map((pref) => (
              <div
                key={pref.id}
                onClick={() => togglePreference(pref.id)}
                className={`bg-[#f8fff4] shadow-md rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedPreferences.includes(pref.id)
                    ? "border-2 border-[#3dd39c] bg-gradient-to-br from-[#f8fff4] to-[#b7f382]"
                    : "hover:shadow-lg"
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{pref.emoji}</div>
                  <div className="text-gray-800 font-medium text-sm">
                    {pref.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BMI Calculator */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-[#f8fff4] to-[#b7f382] text-gray-800 rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Calculator className="text-[#3dd39c]" />
              BMI Calculator
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={bmiData.height}
                  onChange={(e) =>
                    setBmiData((prev) => ({ ...prev, height: e.target.value }))
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3dd39c]"
                  placeholder="170"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={bmiData.weight}
                  onChange={(e) =>
                    setBmiData((prev) => ({ ...prev, weight: e.target.value }))
                  }
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3dd39c]"
                  placeholder="65"
                />
              </div>
            </div>
            <button
              onClick={calculateBMI}
              className="bg-[#3dd39c] text-white px-6 py-3 rounded-xl hover:bg-[#2bb87d] transition-colors mb-4"
            >
              Calculate BMI
            </button>
            {bmiData.bmi && (
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="text-lg font-semibold">BMI: {bmiData.bmi}</p>
                <p className="text-gray-700">Category: {bmiData.category}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Daily calorie intake:{" "}
                  {bmiData.category === "Normal"
                    ? "2000-2200"
                    : bmiData.category === "Underweight"
                    ? "2400-2600"
                    : "1800-2000"}{" "}
                  kcal
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Heart className="text-[#3dd39c]" />
            Health Conditions
          </h2>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-600 mb-4">
              Select any health conditions you'd like to address:
            </p>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {healthConditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => toggleCondition(condition)}
                  className={`px-3 py-2 rounded-full text-sm transition-colors ${
                    selectedConditions.includes(condition)
                      ? "bg-[#3dd39c] text-white"
                      : "bg-[#f8fff4] text-gray-700 shadow-sm hover:bg-[#e8f5e8]"
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>
        </section>


        {/* Region/Cuisine Preferences */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🌍 Cuisine Preferences
          </h2>
          <div className="flex flex-wrap gap-3">
            {cuisineTypes.map((cuisine) => (
              <button
                key={cuisine.id}
                onClick={() => toggleCuisine(cuisine.id)}
                className={`px-4 py-2 rounded-full shadow transition-colors ${
                  selectedCuisines.includes(cuisine.id)
                    ? "bg-[#a2db46] text-white"
                    : "bg-white text-gray-700 hover:bg-green-200 "
                }`}
              >
                {cuisine.emoji} {cuisine.label}
              </button>
            ))}
          </div>
        </section>

        {/* Disease or Health Condition Selector */}

        {/* Home Remedies (Desi Nuskhe) */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-[#3dd39c]">🌿</span>
            Desi Nuskhe (Home Remedies)
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeRemedies.map((remedy, index) => (
              <div
                key={index}
                className={`bg-[#f8fff4] p-4 rounded-2xl shadow text-gray-800 relative ${
                  remedy.highlighted
                    ? "ring-2 ring-[#3dd39c] bg-gradient-to-br from-[#f8fff4] to-[#e8f5e8]"
                    : ""
                }`}
              >
                {remedy.highlighted && (
                  <Star className="absolute top-2 right-2 w-5 h-5 text-yellow-500 fill-current" />
                )}
                <div className="text-2xl mb-2">{remedy.emoji}</div>
                <p className="text-sm">{remedy.text}</p>
                {remedy.highlighted && (
                  <div className="mt-2 text-xs text-[#3dd39c] font-medium">
                    ✨ Today's Featured Tip
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Health;
