import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Star,
  Award,
  Leaf,
  MapPin,
  ClockFading,
} from "lucide-react";
import Development from "../development/Development";
import { useChefContext } from "../../context/ChefContext";
import { useNavigate } from "react-router-dom";

const Chef = () => {
  const { chefContextData, selectedChef, setSelectedChef } = useChefContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const chefs = chefContextData;

  const cuisineTypes = ["All", "Indian", "British", "Italian"];

  const filteredChefs = chefs.filter((chef) => {
    const matchesSearch =
      chef.chefName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chef.chefSpecialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || chef.chefCuisine === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTagIcon = (tag) => {
    switch (tag) {
      case "Michelin Star":
        return <Award className="w-3 h-3" />;
      case "Vegan Expert":
        return <Leaf className="w-3 h-3" />;
      default:
        return <Star className="w-3 h-3" />;
    }
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case "Michelin Star":
        return "bg-yellow-200 text-yellow-900 border border-yellow-300";
      case "MasterChef Judge":
        return "bg-rose-200 text-rose-900 border border-rose-300";
      case "Vegan Expert":
        return "bg-emerald-200 text-emerald-900 border border-emerald-300";
      case "Street Food Guru":
        return "bg-orange-200 text-orange-900 border border-orange-300";
      case "5-Star Hotel Experience":
        return "bg-violet-200 text-violet-900 border border-violet-300";
      default:
        return "bg-emerald-200 text-emerald-900 border border-emerald-300";
    }
  };

  const handleSelectedChef = (chef) => {
    // alert(chef.chefName);
    setSelectedChef(chef);
    localStorage.setItem("storeLocalSelectedChef", chef);
    navigate("/selected-chef");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-teal-300">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <h1 className="lg:text-5xl text-3xl font-bold text-gray-800 mb-4">
          🍳 Pick Your Culinary Legend
        </h1>
        <p className="lg:text-xl  text-gray-600 max-w-2xl mx-auto">
          Choose the chef whose dishes feel like memories — explore legendary
          flavors that feel like home on GlobalBites.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search chefs or specialties..."
              className="w-full  pl-12 pr-4 h-[50px] py-3 rounded-full border-2 border-gray-200 focus:border-green-300 focus:outline-none transition-colors"
              style={{ backgroundColor: "white" }}
            />
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3">
            <Filter className="text-gray-500 w-5 h-5 mt-2" />
            {cuisineTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFilter(type)}
                className={`lg:px-6 lg:py-2  px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === type
                    ? "text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:shadow-md"
                }`}
                style={{
                  backgroundColor:
                    selectedFilter === type ? "#15bb7d" : "white",
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chef Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredChefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-white/70 backdrop-blur-xl rounded-3xl w-[80%] m-auto lg:w-full p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              {/* Chef Image */}
              <div className="flex justify-center mb-6 ">
                <div className="relative">
                  <img
                    src={chef.chefImg}
                    alt={chef.chefName}
                    className="lg:w-full lg:h-54 w-1/2 m-auto h-30 object-cover aspect-square shadow-2xl"
                  />
                  <div
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                    style={{ backgroundColor: "#15bb7d" }}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Chef Info */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {chef.chefName}
                </h3>
                <p className="text-gray-600 font-medium">
                  {chef.chefSpecialty}
                </p>
                <p className="text-sm text-gray-500">{chef.chefCountry}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(chef.chefRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-700 font-semibold">
                    {chef.chefRating}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {chef.chefTags.map((tag, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTagColor(
                      tag
                    )}`}
                  >
                    {getTagIcon(tag)}
                    {tag}
                  </span>
                ))}
              </div>

              {/* Choose Button */}
              <button
                type="button"
                onClick={() => handleSelectedChef(chef)}
                className="w-full py-3 px-6 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: "#A8E6CF",
                  backgroundImage:
                    "linear-gradient(135deg, rgb(63 227 124) 0%, rgb(20 105 79) 100%)",
                }}
              >
                Choose Chef 👨‍🍳
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredChefs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No chefs found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-gray-600">
          ✨ Discover amazing recipes and culinary experiences with{" "}
          <strong>GlobalBites</strong>
        </p>
      </div>
    </div>
  );
};

export default Chef;
