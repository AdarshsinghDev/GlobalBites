import React, { useState } from "react";
import { Search, Filter, Star, Award, Leaf, MapPin } from "lucide-react";
import Development from "../development/Development";

const Chef = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const chefs = [
    {
      id: 1,
      name: "Sanjeev Kapoor",
      specialty: "Indian Fusion",
      country: "India",
      rating: 4.9,
      image: "https://www.ssca.edu.in/assets/images/ChefSanjeev.jpg",
      tags: ["MasterChef Judge", "5-Star Hotel Experience"],
      cuisine: "Indian",
    },
    {
      id: 2,
      name: "Vikas Khanna",
      specialty: "Modern Indian",
      country: "India",
      rating: 4.8,
      image:
        "https://images.moneycontrol.com/static-mcnews/2024/02/Vikas-Khanna.jpg?impolicy=website&width=770&height=431",
      tags: ["Michelin Star", "MasterChef Judge"],
      cuisine: "Indian",
    },
    {
      id: 3,
      name: "Ranveer Brar",
      specialty: "Regional Indian",
      country: "India",
      rating: 4.7,
      image:
        "https://yt3.googleusercontent.com/ccCYUcBC69tdqspzHL_sUAyrbVKx_Y5pb6IeA7F_WpamxVYjd7OH0iUgxSAeKGY_7r8HMZUu=s900-c-k-c0x00ffffff-no-rj",
      tags: ["Street Food Guru", "MasterChef Judge"],
      cuisine: "Indian",
    },
    {
      id: 4,
      name: "Kunal Kapur",
      specialty: "Contemporary Indian",
      country: "India",
      rating: 4.6,
      image:
        "https://www.financialexpress.com/wp-content/uploads/2024/04/Chef-Kunal-kapoor.jpg",
      tags: ["5-Star Hotel Experience", "MasterChef Judge"],
      cuisine: "Indian",
    },
    {
      id: 10,
      name: "Saransh Goila",
      specialty: "Indian Grilled & Butter Chicken",
      country: "India",
      rating: 4.7,
      image:
        "https://www.entrepreneurindia.com/influencer/2021/images/speakers/saransh.jpg",
      tags: ["Goila Butter Chicken", "TV Show Judge"],
      cuisine: "Indian",
    },
    {
      id: 11,
      name: "Shipra Khanna",
      specialty: "Global Indian Fusion",
      country: "India",
      rating: 4.6,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnARIU0c8Z6wfvqRMIad8d26YZ2gTDA-84Q&s",
      tags: ["MasterChef India Winner", "Global Food Ambassador"],
      cuisine: "Indian",
    },
    {
      id: 5,
      name: "Gordon Ramsay",
      specialty: "British Fine Dining",
      country: "UK",
      rating: 4.9,
      image:
        "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/07/Gordon-Ramsay-on-MasterChef.jpg?q=70&fit=contain&w=1200&h=628&dpr=1",
      tags: ["Michelin Star", "MasterChef Judge"],
      cuisine: "British",
    },
    {
      id: 6,
      name: "Jamie Oliver",
      specialty: "Rustic Italian & British",
      country: "UK",
      rating: 4.8,
      image:
        "https://images.thewest.com.au/publication/C-10471647/cc4cbc976662250dc4f26ca6183e522947fb36e8.jpg",
      tags: ["Vegan Expert", "Street Food Guru"],
      cuisine: "Italian",
    },

    {
      id: 12,
      name: "Imtiaz Qureshi",
      specialty: "Dum Pukht & Mughlai",
      country: "India",
      rating: 4.8,
      image:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZUcKsvMFoYXZjKQbjx_O33yU0Ev4ctKp2MXyxmqsgSJweW3anWLN9HfFTN73tvOX2x2NwZVKzWBHJbNorm4TcV7rEDm4n_KRUuGOMzC-o0onWJQMACDgz7pwNGuV7zt_PgW0wBy6RVLE/s1600/chef1.jpg",
      tags: ["ITC Hotels", "Legendary Chef"],
      cuisine: "Mughlai",
    },
    {
      id: 7,
      name: "Nigella Lawson",
      specialty: "Comfort Food & Baking",
      country: "UK",
      rating: 4.7,
      image:
        "https://s.yimg.com/ny/api/res/1.2/fop6PRLiL7oBoMHB6EAYlw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTk2MA--/https://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/b49e7101aa770210f488aa8c0bd6b8f3",
      tags: ["Vegan Expert", "5-Star Hotel Experience"],
      cuisine: "British",
    },
    {
      id: 8,
      name: "Massimo Bottura",
      specialty: "Modern Italian",
      country: "Italy",
      rating: 4.9,
      image:
        "https://www.movietele.it/wp-content/uploads/2024/06/Massimo-Bottura.jpg",
      tags: ["Michelin Star", "5-Star Hotel Experience"],
      cuisine: "Italian",
    },

    {
      id: 9,
      name: "Ajay Chopra",
      specialty: "Progressive Indian",
      country: "India",
      rating: 4.6,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFcqPgzgN4K2RicUBwwoHx5AbcRt8w7HpDBw&s",
      tags: ["MasterChef India", "Food Show Host"],
      cuisine: "Indian",
    },
  ];

  const cuisineTypes = ["All", "Indian", "British", "Italian"];

  const filteredChefs = chefs.filter((chef) => {
    const matchesSearch =
      chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chef.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "All" || chef.cuisine === selectedFilter;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF6E5] via-[#DCEDC1] to-[#A8E6CF]">
      {/* Header */}
      <div className="text-center py-12 px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          🍳 Pick Your Culinary Legend
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the chef whose dishes feel like memories — explore legendary
          flavors that feel like home on GlobalBites.
        </p>
      </div>

      <Development
        title="🔥 Coming Soon"
        subtitle="Amazing features in development"
        variant="construction"
        showProgress={false}
        estimatedTime="Next Week"
      />

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search chefs or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 h-[40px] py-3 rounded-full border-2 border-gray-200 focus:border-green-300 focus:outline-none transition-colors"
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
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
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
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
            >
              {/* Chef Image */}
              <div className="flex justify-center mb-6 ">
                <div className="relative">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-54  object-cover aspect-square shadow-2xl"
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
                  {chef.name}
                </h3>
                <p className="text-gray-600 font-medium">{chef.specialty}</p>
                <p className="text-sm text-gray-500">{chef.country}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(chef.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-700 font-semibold">
                    {chef.rating}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {chef.tags.map((tag, index) => (
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
