import { createContext, useContext, useEffect, useState } from "react";

const ChefContext = createContext();

export const ChefProvider = ({ children }) => {
  const [chefContextData, setChefContextData] = useState([
    {
      id: 1,
      chefName: "Sanjeev Kapoor",
      chefSpeciality: "Indian Fusion",
      chefCountry: "India",
      chefRating: 4.9,
      chefImg: "https://www.ssca.edu.in/assets/images/ChefSanjeev.jpg",
      chefTags: ["MasterChef Judge ", "5-Star Hotel Experience"],
      chefCusine: "Indian",
    },
    {
      id: 2,
      chefName: "Vikas Khanna",
      chefSpecialty: "Modern Indian",
      chefCountry: "India",
      chefRating: 4.8,
      chefImg:"https://images.moneycontrol.com/static-mcnews/2024/02/Vikas-Khanna.jpg?impolicy=website&width=770&height=431",
      chefTags: ["Michelin Star ", "MasterChef Judge"],
      chefCusine: "Indian",
    },
    {
      id: 3,
      chefName: "Ranveer Brar",
      chefSpeciality: "Regional Indian",
      chefCountry: "India",
      chefRating: 4.7,
      chefImg:
        "https://yt3.googleusercontent.com/ccCYUcBC69tdqspzHL_sUAyrbVKx_Y5pb6IeA7F_WpamxVYjd7OH0iUgxSAeKGY_7r8HMZUu=s900-c-k-c0x00ffffff-no-rj",
      chefTags: ["Street Food Guru ", "MasterChef Judge"],
      chefCusine: "Indian",
    },
    {
      id: 4,
      chefName: "Saransh Goila",
      chefSpeciality: "Indian Grilled & Butter Chicken",
      chefCountry: "India",
      chefRating: 4.7,
      chefImg:
        "https://www.entrepreneurindia.com/influencer/2021/images/speakers/saransh.jpg",
      chefTags: ["Goila Butter Chicken ", "TV Show Judge"],
      chefCusine: "Indian",
    },
    {
      id: 5,
      chefName: "Shipra Khanna",
      chefSpeciality: "Global Indian Fusion",
      chefCountry: "India",
      chefRating: 4.6,
      chefImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnARIU0c8Z6wfvqRMIad8d26YZ2gTDA-84Q&s",
      chefTags: ["MasterChef India Winner ", "Global Food Ambassador"],
      chefCusine: "Indian",
    },
    {
      id: 6,
      chefName: "Gordon Ramsay",
      chefSpeciality: "British Fine Dining",
      chefCountry: "UK",
      chefRating: 4.9,
      chefImg:
        "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/07/Gordon-Ramsay-on-MasterChef.jpg?q=70&fit=contain&w=1200&h=628&dpr=1",
      chefTags: ["Michelin Star ", "MasterChef Judge"],
      chefCusine: "British",
    },
    {
      id: 7,
      chefName: "Jamie Oliver",
      chefSpeciality: "Rustic Italian & British",
      chefCountry: "UK",
      chefRating: 4.8,
      chefImg:
        "https://images.thewest.com.au/publication/C-10471647/cc4cbc976662250dc4f26ca6183e522947fb36e8.jpg",
      chefTags: ["Vegan Expert "],
      chefCusine: "Italian",
    },

    {
      id: 8,
      chefName: "Imtiaz Qureshi",
      chefSpeciality: "Dum Pukht & Mughlai",
      chefCountry: "India",
      chefRating: 4.8,
      chefImg:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZUcKsvMFoYXZjKQbjx_O33yU0Ev4ctKp2MXyxmqsgSJweW3anWLN9HfFTN73tvOX2x2NwZVKzWBHJbNorm4TcV7rEDm4n_KRUuGOMzC-o0onWJQMACDgz7pwNGuV7zt_PgW0wBy6RVLE/s1600/chef1.jpg",
      chefTags: ["ITC Hotels ", "Legendary Chef"],
      chefCusine: "Mughlai",
    },
    {
      id: 9,
      chefName: "Nigella Lawson",
      chefSpeciality: "Comfort Food & Baking",
      chefCountry: "UK",
      chefRating: 4.7,
      chefImg:
        "https://s.yimg.com/ny/api/res/1.2/fop6PRLiL7oBoMHB6EAYlw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTk2MA--/https://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/b49e7101aa770210f488aa8c0bd6b8f3",
      chefTags: ["Vegan Expert ", "5-Star Hotel Experience"],
      chefCusine: "British",
    },
    {
      id: 10,
      chefName: "Massimo Bottura",
      chefSpeciality: "Modern Italian",
      chefCountry: "Italy",
      chefRating: 4.9,
      chefImg:
        "https://www.movietele.it/wp-content/uploads/2024/06/Massimo-Bottura.jpg",
      chefTags: ["Michelin Star ", "5-Star Hotel Experience"],
      chefCusine: "Italian",
    },

    {
      id: 11,
      chefName: "Ajay Chopra",
      chefSpeciality: "Progressive Indian",
      chefCountry: "India",
      chefRating: 4.6,
      chefImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFcqPgzgN4K2RicUBwwoHx5AbcRt8w7HpDBw&s",
      chefTags: ["MasterChef India ", "Food Show Host"],
      chefCusine: "Indian",
    },
  ]);

  const getStoredChef = () => {
    try {
      const storedChef = localStorage.getItem("storeLocalSelectedChef");
      return storedChef ? JSON.parse(storedChef) : null;
    } catch (error) {
      console.error("Error parsing stored chef data:", error);
      return null;
    }
  };

  const [selectedChef, setSelectedChef] = useState(getStoredChef());

  useEffect(() => {
    if (selectedChef) {
      localStorage.setItem(
        "storeLocalSelectedChef",
        JSON.stringify(selectedChef)
      );
    }
  }, [selectedChef]);

  const contextValue = {
    chefContextData,
    setChefContextData,
    selectedChef,
    setSelectedChef,
  };

  return (
    <ChefContext.Provider value={contextValue}>{children}</ChefContext.Provider>
  );
};

export const useChefContext = () => useContext(ChefContext);
