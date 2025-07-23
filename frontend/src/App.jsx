import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./page/signup/Signup";
import Login from "./page/login/Login";
import VerifyOTP from "./page/verfiyOtp/VerfiyOtp";
import Home from "./page/home/Home";
import Profile from "./page/profile/Profile";
import Settings from "./page/setting/Setting";
import Favourites from "./page/favourite/Favourites";
import MyRecipes from "./page/my-recipe/MyRecipe";
import Chef from "./page/features/Chef";
import Budget from "./page/features/Budget";
import Combo from "./page/features/Combo";
import Mood from "./page/features/Mood";
import ScienceBehind from "./page/features/ScienceBehind";
import Health from "./page/features/Health";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/chef" element={<Chef />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/combo" element={<Combo />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/science-behind" element={<ScienceBehind />} />
        <Route path="/health" element={<Health />} />
      </Routes>
    </>
  );
}

export default App;
