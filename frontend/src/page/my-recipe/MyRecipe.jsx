import React from "react";

const dummyMyRecipes = [
  {
    title: "Spicy Aloo Tikki Burger",
    image: "https://c.ndtvimg.com/2020-09/vics3pv_aloo-tikki-burger_625x300_19_September_20.jpg",
    description: "Crispy and spicy potato patties layered in soft buns.",
  },
  {
    title: "Creamy Mushroom Pasta",
    image: "https://www.cucinabyelena.com/wp-content/uploads/2025/01/Creamy-Mushroom-Pasta-Recipe-21.jpg",
    description: "A luscious mushroom and cream-based pasta recipe.",
  },
  {
    title: "Sweet Corn Chaat",
    image: "https://cdn.zeptonow.com/production///tr:w-600,ar-100-100,pr-true,f-auto,q-80/web/recipes/corn-chaat.png",
    description: "Healthy, tangy, and tasty corn snack with herbs.",
  },
];

const MyRecipes = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8 underline">
          My Recipes
        </h2>

        {dummyMyRecipes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You haven't added any recipes yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dummyMyRecipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{recipe.description}</p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                      Edit
                    </button>
                    <button className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
