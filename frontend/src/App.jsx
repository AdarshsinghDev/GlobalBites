import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './page/landing/Landing';
import Signup from './page/signup/Signup';
import Login from './page/login/Login';
import VerifyOTP from './page/verfiyOtp/VerfiyOtp';
import Home from './page/home/Home';
import Profile from './page/profile/Profile';
import Favourites from './page/favourite/Favourites';
import MyRecipes from './page/my-recipe/MyRecipe';
import Chef from './page/features/Chef';
import Budget from './page/features/Budget';
import SelectedChef from './page/features/SelectedChef';
import SelectedRecipe from './page/selectedRecipe/SelectedRecipe';
import KnowledgeHub from './page/knowledge/KnowledgeHub';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/recipe/:id" element={<PrivateRoute><SelectedRecipe /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/favourites" element={<PrivateRoute><Favourites /></PrivateRoute>} />
        <Route path="/my-recipes" element={<PrivateRoute><MyRecipes /></PrivateRoute>} />
        <Route path="/chef" element={<PrivateRoute><Chef /></PrivateRoute>} />
        <Route path="/budget" element={<PrivateRoute><Budget /></PrivateRoute>} />
        <Route path="/knowledge" element={<PrivateRoute><KnowledgeHub /></PrivateRoute>} />
        <Route path="/selected-chef" element={<PrivateRoute><SelectedChef /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
