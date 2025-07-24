import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/CreateContext.jsx";
import { ChefProvider } from "./context/ChefContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <ChefProvider>
        <App />
      </ChefProvider>
    </UserProvider>
  </BrowserRouter>
);
