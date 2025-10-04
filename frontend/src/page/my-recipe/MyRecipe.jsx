import {
  Star,
  Clock,
  Users,
  Heart,
  Search,
  Filter,
  Plus,
  BookOpen,
  ChefHat,
  X,
  Upload,
  Minus,
} from "lucide-react";
import { useEffect, useState } from "react";
import nonVeg from "../../assets/non-veg.jpg";
import veg from "../../assets/veg.jpg";
import PopUpAlert from "../../components/ui/PopUpAlert.jsx";

export default function MyRecipes() {
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [steps, setSteps] = useState([""]);
  const [showAlert, setShowAlert] = useState(false);
  const diets = ["Vegetarian", "Vegan", "Non-Veg", "Gluten-Free", "Dairy-Free"];
  const [userRecipeData, setUserRecipeData] = useState({
    recipeName: "",
    description: "",
    cookingTime: "",
    serving: "",
    category: "",
    cuisine: "",
    diet: "",
    difficulty: "",
    ingredients: [],
    instruction: [],
    tags: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "diet") {
      setUserRecipeData((prev) => ({ ...prev, diet: value }));
      return;
    }
    setUserRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecipeArrayChange = (index, value, fieldName) => {
    setUserRecipeData((prev) => {
      const newIngredients = [...prev[fieldName]];
      newIngredients[index] = value;
      return {
        ...prev,
        [fieldName]: newIngredients,
      };
    });
  };

  const removeRecipeArray = (index, fieldName) => {
    setUserRecipeData((prev) => {
      const newIngredients = prev[fieldName].filter((_, i) => i !== index);
      return {
        ...prev,
        [fieldName]: newIngredients,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userRecipeData);
      setShowAddRecipe(false);
      setShowAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Main", showAlert);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-green-400 to-green-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Recipe Collection
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Your personal culinary journey - all your favorite recipes in one
            place
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your recipes..."
                className="w-full pl-12 pr-4 py-6 bg-white/20 border border-white/30 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center space-x-2 px-6 py-3 bg-white/20 border border-white/30 rounded-full text-white hover:bg-white/30 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button
                onClick={() => setShowAddRecipe(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Recipe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {[
            "All Recipes",
            "Breakfast",
            "Lunch",
            "Dinner",
            "Snacks",
            "Desserts",
            "Beverages",
          ].map((tag, index) => (
            <button
              key={tag}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-white text-green-600 shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">24</div>
            <div className="text-white/80">Total Recipes</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">8</div>
            <div className="text-white/80">Favorites</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">12</div>
            <div className="text-white/80">Tried</div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">4.8</div>
            <div className="text-white/80">Avg Rating</div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Recipe Card 1 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500 relative">
              <button className="absolute top-3 right-3 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Heart className="w-5 h-5 text-white fill-current" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Easy
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Aloo Gobi Masala
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Spiced cauliflower and potato curry
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>30 Min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>4 servings</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.5</span>
                </div>
                <span className="text-green-600 font-bold">₹65</span>
              </div>
            </div>
          </div>

          {/* Recipe Card 2 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-500 relative">
              <button className="absolute top-3 right-3 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Medium
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Dal Makhani
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Creamy black lentil curry
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>90 Min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>6 servings</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
                <span className="text-green-600 font-bold">₹120</span>
              </div>
            </div>
          </div>

          {/* Recipe Card 3 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 relative">
              <button className="absolute top-3 right-3 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Heart className="w-5 h-5 text-white fill-current" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Easy
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Palak Paneer
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Spinach curry with cottage cheese
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>25 Min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>4 servings</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.6</span>
                </div>
                <span className="text-green-600 font-bold">₹85</span>
              </div>
            </div>
          </div>

          {/* Recipe Card 4 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 relative">
              <button className="absolute top-3 right-3 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Hard
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Biryani Special
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Aromatic basmati rice with spices
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>120 Min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>8 servings</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.9</span>
                </div>
                <span className="text-green-600 font-bold">₹200</span>
              </div>
            </div>
          </div>

          {/* Recipe Card 5 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-indigo-400 to-purple-500 relative">
              <button className="absolute top-3 right-3 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Heart className="w-5 h-5 text-white fill-current" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Easy
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Masala Chai
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Traditional spiced tea
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>10 Min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>2 servings</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.7</span>
                </div>
                <span className="text-green-600 font-bold">₹20</span>
              </div>
            </div>
          </div>

          {/* Recipe Card 6 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-pink-400 to-red-500 relative">
              <button className="absolute top-3 right-3 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Medium
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                Chicken Tikka
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Grilled marinated chicken pieces
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>45 Min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>4 servings</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.4</span>
                </div>
                <span className="text-green-600 font-bold">₹150</span>
              </div>
            </div>
          </div>

          {/* Add More Recipe Card */}
          <div
            onClick={() => setShowAddRecipe(true)}
            className="bg-white/10 backdrop-blur-md border-2 border-dashed border-white/30 rounded-2xl flex items-center justify-center h-80 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <div className="text-center">
              <Plus className="w-12 h-12 text-white mx-auto mb-4" />
              <p className="text-white font-medium">Add New Recipe</p>
              <p className="text-white/70 text-sm">
                Share your culinary creation
              </p>
            </div>
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-50 transition-colors shadow-lg">
            Load More Recipes
          </button>
        </div>
      </div>
      <PopUpAlert
        message="Uploaded Successfully"
        recipeName={userRecipeData.recipeName}
        alert={showAlert}
        onClose={() => setShowAlert(false)}
      />

      {/* Add Recipe Popup */}
      {showAddRecipe && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      🍳 Add Your Recipe
                    </h2>
                    <p className="text-gray-600">
                      Share your culinary creation with the world
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddRecipe(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Popup Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      📋 Basic Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recipe Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Paneer Butter Masala"
                        name="recipeName"
                        value={userRecipeData.recipeName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="Tell us about your dish... What makes it special?"
                        rows="3"
                        name="description"
                        value={userRecipeData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cooking Time
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            name="cookingTime"
                            placeholder="30"
                            value={userRecipeData.cookingTime}
                            onChange={handleChange}
                            className="flex-1 w-[20px] px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <select className="px-4  border-l-0 border border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                            <option>Minutes</option>
                            <option>Hours</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Servings
                        </label>
                        <input
                          type="number"
                          placeholder="4"
                          name="serving"
                          value={userRecipeData.serving}
                          onChange={handleChange}
                          className="px-4 py-3 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category & Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      🏷️ Category & Preferences
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={userRecipeData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option>Select Category</option>
                          <option value="Breakfast">Breakfast</option>
                          <option value="Lunch">Lunch</option>
                          <option value="Dinner">Dinner</option>
                          <option valu e="Snacks">
                            Snacks
                          </option>
                          <option value="Dessert">Dessert</option>
                          <option value="Beverages">Beverages</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cuisine Type
                        </label>
                        <select
                          name="cuisine"
                          value={userRecipeData.cuisine}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option>Select Cuisine</option>
                          <option value="Indian">Indian</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Himachal">Himachal</option>
                          <option value="Jammu & kashmir">
                            Jammu & kashmir
                          </option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Assam">Assam</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Andhara/Telengana">
                            Andhara/Telengana
                          </option>
                          <option value="Kerala">Kerala</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil">Tamil</option>
                          <option value="Goa">Goa</option>
                          <option value="Italian">Italian</option>
                          <option value="Mexican">Mexican</option>
                          <option value="Thai">Thai</option>
                          <option value="Continental">Continental</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diet Preference
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {["Veg", "Non-Veg"].map((option, _) => (
                          <label
                            key={option}
                            className={`flex items-center space-x-2 border-[1px] cursor-pointer px-3 py-1 rounded-full transition-colors ${
                              userRecipeData.diet === option
                                ? option === "Veg"
                                  ? "bg-green-100 border-green-500"
                                  : "bg-red-100 border-red-500"
                                : "bg-transparent"
                            } px-2 rounded-full`}
                          >
                            <input
                              type="radio"
                              name="diet"
                              value={option}
                              onChange={handleChange}
                              checked={userRecipeData.diet === option}
                              className="focus:shadow-none"
                            />
                            <span>{option}</span>
                            <img
                              src={option === "Veg" ? veg : nonVeg}
                              className="w-5"
                              alt={`${option}'s icon`}
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Difficulty Level
                        </label>
                        <select
                          value={userRecipeData.difficulty}
                          onChange={handleChange}
                          name="difficulty"
                          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select difficulty</option>
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview & Ingredients Section */}
                <div className="space-y-6">
                  {/* Ingredients */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="text-lg font-semibold text-gray-800 ">
                        🥘 Ingredients
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          setUserRecipeData((prev) => ({
                            ...prev,
                            ingredients: [...prev.ingredients, ""],
                          }))
                        }
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm hover:bg-green-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {userRecipeData.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <span className="bg-green-500 rounded-full px-2 text-white">
                            {index + 1}{" "}
                          </span>
                          <input
                            type="text"
                            name="ingredients"
                            value={ingredient}
                            onChange={(e) =>
                              handleRecipeArrayChange(
                                index,
                                e.target.value,
                                "ingredients"
                              )
                            }
                            placeholder="e.g. 2 cups basmati rice"
                            className="flex-1 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-1 focus:border-green-500"
                          />
                          {userRecipeData.ingredients.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeRecipeArray(index, "ingredients")
                              }
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        📝 Instructions
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          setUserRecipeData((prev) => ({
                            ...prev,
                            instruction: [...prev.instruction, ""],
                          }))
                        }
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm hover:bg-green-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {userRecipeData.instruction.map((instruction, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium mt-1">
                            {index + 1}
                          </div>
                          <div className="flex-1 flex items-start space-x-2">
                            <textarea
                              placeholder={`Step ${index + 1} instructions...`}
                              rows="2"
                              name="instruction"
                              value={instruction}
                              onChange={(e) =>
                                handleRecipeArrayChange(
                                  index,
                                  e.target.value,
                                  "instruction"
                                )
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            />
                            {userRecipeData.instruction.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeRecipeArray(index, "instruction")
                                }
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      🏷️ Tags
                    </h3>
                    <input
                      type="text"
                      name="tags"
                      value={userRecipeData.tags}
                      onChange={handleChange}
                      placeholder="Add tags separated by commas (e.g. kids-friendly, quick-meal, healthy)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Recipe Image
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                      <input type="file" className="hidden" accept="image/*" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                <button
                  onClick={() => setShowAddRecipe(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300 transition-colors">
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
                >
                  Submit Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
