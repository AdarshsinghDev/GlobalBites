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
      chefTags: ["MasterChef Judge", "5-Star Hotel Experience"],
      chefCusine: "Indian",
    },
    {
      id: 2,
      chefName: "Vikas Khanna",
      chefSpeciality: "Modern Indian",
      chefCountry: "India",
      chefRating: 4.8,
      chefImg:
        "https://images.moneycontrol.com/static-mcnews/2024/02/Vikas-Khanna.jpg?impolicy=website&width=770&height=431",
      chefTags: ["Michelin Star", "MasterChef Judge"],
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
      chefTags: ["Street Food Guru", "MasterChef Judge"],
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
      chefTags: ["Goila Butter Chicken", "TV Show Judge"],
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
      chefTags: ["MasterChef India Winner", "Global Food Ambassador"],
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
      chefTags: ["Michelin Star", "MasterChef Judge"],
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
      chefTags: ["Vegan Expert"],
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
      chefTags: ["ITC Hotels", "Legendary Chef"],
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
      chefTags: ["Vegan Expert", "5-Star Hotel Experience"],
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
      chefTags: ["Michelin Star", "5-Star Hotel Experience"],
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
      chefTags: ["MasterChef India", "Food Show Host"],
      chefCusine: "Indian",
    },
    {
      id: 12,
      chefName: "Nandita Karan",
      chefSpeciality: "Bihari Cuisine – Litti Chokha & Heritage Flavors",
      chefCountry: "India",
      chefRating: 4.8,
      chefImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbHvqHmtnFbeYT0ZhbfkcHdRChbl0_gaAnycaiLb9m__lYSF6AIl3GE3dWw2wJ93_tHNk&usqp=CAU",
      chefTags: ["Patna-born Chef", "The Lalit Delhi – Bihari Food Festival"],
      chefCusine: "Bihari",
    },
    {
      id: 13,
      chefName: "Nisha Madhulika",
      chefSpeciality: "Vegetarian Indian Home Cooking",
      chefCountry: "India",
      chefRating: 4.7,
      chefImg:
        "https://img.etimg.com/thumb/msid-115286479,width-640,height-480,imgsize-18430,resizemode-4/nisha-madhulika-from-teacher-to-youtuber.jpg",
      chefTags: ["YouTube Star", "Litti Chokha & Sattu Expert"],
      chefCusine: "Indian",
    },
    {
      id: 14,
      chefName: "Anahita Dhondy",
      chefSpeciality: "Parsi & Heritage Indian Cuisine",
      chefCountry: "India",
      chefRating: 4.6,
      chefImg:
        "https://www.smartfood.org/wp-content/uploads/2019/09/Anahita-resized-lowres-834x1024.jpg",
      chefTags: ["Parsi Chef", "Young Culinary Icon"],
      chefCusine: "Parsi",
    },
    {
      id: 15,
      chefName: "Pankaj Bhadouria",
      chefSpeciality: "Awadhi & North Indian Cuisine",
      chefCountry: "India",
      chefRating: 4.7,
      chefImg:
        "https://femina.wwmindia.com/content/2024/mar/chef-pankaj-bhadouria-thumb1710413918.jpg",
      chefTags: ["MasterChef India Winner", "Lucknowi Cuisine"],
      chefCusine: "Uttar Pradesh",
    },
    {
      id: 16,
      chefName: "Sandeep Pandey",
      chefSpeciality: "Bhojpuri & Bihari Cuisine",
      chefCountry: "India",
      chefRating: 4.6,
      chefImg:
        "https://www.culinaryculture.co/wp-content/uploads/2023/10/Sandeep-Pande-630x630-1.png",
      chefTags: ["Litti Chokha Expert", "Rustic Bihari Dishes"],
      chefCusine: "Bihar",
    },
    {
      id: 17,
      chefName: "Thomas Zacharias",
      chefSpeciality: "Coastal Cuisine",
      chefCountry: "India",
      chefRating: 4.9,
      chefImg:
        "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2018/09/Chef-Zacharias-Feature.jpg",
      chefTags: ["Coastal Flavors", "Farm-to-Table"],
      chefCusine: "Kerala",
    },
    {
      id: 18,
      chefName: "Asma Khan",
      chefSpeciality: "Bengali & Mughlai",
      chefCountry: "India",
      chefRating: 4.8,
      chefImg:
        "https://upload.wikimedia.org/wikipedia/commons/f/fb/Asma2023.jpg",
      chefTags: ["Darjeeling Roots", "Kolkata Biryani"],
      chefCusine: "West Bengal",
    },
    {
      id: 19,
      chefName: "Chef Rehman",
      chefSpeciality: "Kashmiri Wazwan Cuisine",
      chefCountry: "India",
      chefRating: 4.7,
      chefImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHbwnGH2Y2e62p9LPNiTkLZBvZysenopZlg&s",
      chefTags: ["Wazwan Expert", "Royal Kashmiri Feasts"],
      chefCusine: "Jammu & Kashmir",
    },
    {
      id: 20,
      chefName: "Vishnu Manohar",
      chefSpeciality: "Maharashtrian Cuisine",
      chefCountry: "India",
      chefRating: 4.6,
      chefImg:
        "https://thelivenagpur.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-20-at-6.01.32-PM.jpeg",
      chefTags: ["Poha Master", "Solkadi Specialist"],
      chefCusine: "Maharashtra",
    },
    {
      id: 21,
      chefName: "Rakesh Raghunathan",
      chefSpeciality: "Tamil Nadu Temple Cuisine",
      chefCountry: "India",
      chefRating: 4.6,
      chefImg:
        "https://res.cloudinary.com/roundglass/image/upload/w_600,ar_1:1,c_fill,g_face,f_auto/v1667240107/rg/collective/media/rg-rakesh-raghunathan-portrait-005-1x1-1667240107108.jpg",
      chefTags: ["Heritage Food", "South Indian"],
      chefCusine: "Tamil Nadu",
    },
    {
      id: 22,
      chefName: "Kunal Rajvanshi",
      chefSpeciality: "Rajasthani Cuisine",
      chefCountry: "India",
      chefRating: 4.5,
      chefImg:
        "https://media.licdn.com/dms/image/v2/D5603AQHftYyQFRRCRw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1690544715055?e=2147483647&v=beta&t=Wrvc48c4T3oUTrNfPUyrHcrShoN9rRqXoPH-GJOsTR0",
      chefTags: ["Dal Baati Expert", "Desert Cuisine"],
      chefCusine: "Rajasthan",
    },
    {
      id: 23,
      chefName: "Tarla Dalal",
      chefSpeciality: "Gujarati Vegetarian Cuisine",
      chefCountry: "India",
      chefRating: 5.0,
      chefImg: "https://upload.wikimedia.org/wikipedia/en/d/d4/Tarla_Dalal.png",
      chefTags: ["Legendary Author", "Thepla Specialist"],
      chefCusine: "Gujarat",
    },
    {
      id: 24,
      chefName: "Nilesh Limaye",
      chefSpeciality: "Goan & Konkani Cuisine",
      chefCountry: "India",
      chefRating: 4.6,
      chefImg:
        "https://static.wixstatic.com/media/384b67_fa9911cdb52f459c936894cbfbe05ca3~mv2.jpg/v1/crop/x_89,y_0,w_320,h_498,q_80,enc_avif,quality_auto/384b67_fa9911cdb52f459c936894cbfbe05ca3~mv2.jpg",
      chefTags: ["Kokum & Fish Curry", "Konkani Food Expert"],
      chefCusine: "Goa",
    },
    {
      id: 25,
      chefName: "Arvind Saraswat",
      chefSpeciality: "Punjabi & Tandoori Cuisine",
      chefCountry: "India",
      chefRating: 4.7,
      chefImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHBYiGB-fcxV8VQ_W0PyIEIsj8w5Cp3FO_Zw&s",
      chefTags: ["Tandoor Specialist", "Butter Chicken Legend"],
      chefCusine: "Punjab",
    },
    {
      id: 26,
      chefName: "Reena Pushkarna",
      chefSpeciality: "Israeli-Indian Fusion",
      chefCountry: "India",
      chefRating: 4.6,
      chefImg:
        "https://d14k1d0ecj3g0p.cloudfront.net/wp-content/uploads/2023/03/reena-2.jpg",
      chefTags: ["Israeli Indian Food", "Cultural Ambassador"],
      chefCusine: "Uttarakhand",
    },
    {
      id: 27,
      chefName: "Nimish Bhatia",
      chefSpeciality: "Modern Karnataka Cuisine",
      chefCountry: "India",
      chefRating: 4.7,
      chefImg: "https://nettv4u.com/imagine/16-11-2020/nimish-bhatia.jpg",
      chefTags: ["Udupi Expert", "Modern South Fusion"],
      chefCusine: "Karnataka",
    },
    {
      id: 28,
      chefName: "Biju Thomas",
      chefSpeciality: "Tribal & North-East Fusion",
      chefCountry: "India",
      chefRating: 4.4,
      chefImg:
        "https://cdn.outsideonline.com/wp-content/uploads/2022/08/biju-cooking-cycling_s.jpg",
      chefTags: ["North-East Spices", "Nagaland Pork Dishes"],
      chefCusine: "North East",
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
