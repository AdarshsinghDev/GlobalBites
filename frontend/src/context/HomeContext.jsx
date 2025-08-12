import { createContext, useContext, useEffect, useState } from "react";

const HomeRecipeContext = createContext();

export const HomeRecipeProvider = ({ children }) => {
  const [homeRecipe, setHomeRecipe] = useState("");
  useEffect(() => {
    const storedHomeRecipe = localStorage.getItem("storeHomeRecipe");
    if (storedHomeRecipe) {
      setHomeRecipe(storedHomeRecipe);
    }
  }, []);
  return (
    <HomeRecipeContext.Provider value={{ homeRecipe, setHomeRecipe }}>
      {children}
    </HomeRecipeContext.Provider>
  );
};

export const useHomeRecipeContext = () => useContext(HomeRecipeContext);
