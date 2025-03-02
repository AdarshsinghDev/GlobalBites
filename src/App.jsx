import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ExploreRecipe from "./pages/ExploreRecipe/ExploreRecipe";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ExploreRecipe" element={<ExploreRecipe />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
