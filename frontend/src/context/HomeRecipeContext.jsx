import { createContext, useContext, useEffect, useState } from "react";

const HomeRecipeContext = createContext();

export const HomeRecipeProvider = ({ children }) => {
  const [homeRecipe, setHomeRecipe] = useState("");
  
  useEffect(() => {
    const storedHomeRecipe = localStorage.getItem("storeHomeRecipe");
    if (storedHomeRecipe) {
      // Only set the recipe name, not the full JSON object
      // The SelectedRecipe component will handle fetching the full recipe
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