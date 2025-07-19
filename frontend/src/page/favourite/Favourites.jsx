import React from "react";
import { Heart, X, ChefHat } from "lucide-react";

const dummyFavourites = [
  {
    title: "Tandoori Paneer Pizza",
    image: "https://www.cookclickndevour.com/wp-content/uploads/2019/09/paneer-pizza-recipe-500x500.jpg",
    description: "A fusion delight combining pizza with Indian tandoori flavors.",
    cookTime: "25 mins",
    difficulty: "Medium"
  },
  {
    title: "Masala Dosa",
    image: "https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg",
    description: "South Indian crispy dosa filled with spicy potato masala.",
    cookTime: "30 mins",
    difficulty: "Hard"
  },
  {
    title: "Veg Hakka Noodles",
    image: "https://www.whiskaffair.com/wp-content/uploads/2020/10/Veg-Hakka-Noodles-2-3.jpg",
    description: "Popular Indo-Chinese stir-fried noodles with veggies.",
    cookTime: "20 mins",
    difficulty: "Easy"
  },
];

const Favourites = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Favourite Recipes
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            A curated collection of your most loved dishes, saved for those special moments
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {dummyFavourites.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <ChefHat className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-green-800 mb-2">No favourites yet</h3>
            <p className="text-green-600 text-lg">
              Start exploring recipes and add them to your collection
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <p className="text-green-700 font-medium">
                {dummyFavourites.length} recipe{dummyFavourites.length !== 1 ? 's' : ''} in your collection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dummyFavourites.map((recipe, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors duration-200 group">
                        <X className="w-4 h-4 text-green-600 group-hover:text-red-500 transition-colors duration-200" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black bg-opacity-60 to-transparent p-4">
                      <div className="flex items-center space-x-2 text-white text-xs">
                        <span className="bg-green-500 bg-opacity-80 px-2 py-1 rounded-full">
                          {recipe.cookTime}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          recipe.difficulty === 'Easy' ? 'bg-green-400 bg-opacity-80' :
                          recipe.difficulty === 'Medium' ? 'bg-yellow-400 bg-opacity-80' :
                          'bg-red-400 bg-opacity-80'
                        }`}>
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-3 group-hover:text-green-700 transition-colors duration-200">
                      {recipe.title}
                    </h3>
                    <p className="text-green-600 text-sm leading-relaxed mb-4">
                      {recipe.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 mr-2">
                        View Recipe
                      </button>
                      <button className="p-2.5 text-green-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                        <Heart className="w-5 h-5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center space-x-2 text-green-700 hover:text-green-800 cursor-pointer transition-colors duration-200">
                <ChefHat className="w-5 h-5" />
                <span className="font-medium">Discover more recipes</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favourites;