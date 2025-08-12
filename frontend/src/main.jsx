import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/CreateContext.jsx";
import { ChefProvider } from "./context/ChefContext.jsx";
import { HomeRecipeProvider } from "./context/HomeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <HomeRecipeProvider>
        <ChefProvider>
          <App />
        </ChefProvider>
      </HomeRecipeProvider>
    </UserProvider>
  </BrowserRouter>
);
