import React from "react";
import { useState } from "react";
import { BiSolidError, BiSolidCheckCircle } from "react-icons/bi";
import {
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Coffee,
  Cookie,
} from "lucide-react";
import { Link } from "react-router-dom";
import signupbg from "../../assets/signup.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/CreateContext";
import Logo from "../../components/ui/Logo";
const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    passwordMismatch: "",
    signupFailed: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [confShowPass, setConfShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserContextData } = useUserContext();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({ ...prev, [name]: value }));
    if (name === "confirmPassword" || name === "password") {
      setError((prev) => ({ ...prev, passwordMismatch: "" }));
    }
    if (name === "email" || name === "fullname") {
      setError((prev) => ({ ...prev, signupFailed: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (userData.password !== userData.confirmPassword) {
      setIsLoading(false);
      setError((prev) => ({
        ...prev,
        passwordMismatch: (
          <div className="text-red-600 flex items-center gap-1 text-sm">
            <BiSolidError /> Password not match!
          </div>
        ),
      }));
    } else {
      setError((prev) => ({ ...prev, passwordMismatch: "" }));
      setError((prev) => ({ ...prev, signupFailed: "" }));
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        email: userData.email,
        fullname: userData.fullname,
        password: userData.password,
      });

      if (res.data.success) {
        setError((prev) => ({
          ...prev,
          signupFailed:
            (
              <div className="text-green-600 flex items-center gap-2 text-sm">
                Signup successfully! <BiSolidCheckCircle size={20} />
              </div>
            ) || "Signup successfully",
        }));
        
        setUserContextData({
          email: userData.email,
          fullname: userData.fullname,
          isVerified: false,
        });
        
        console.log(res.data)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("storedEmail", userData.email);
        localStorage.setItem("storedFullname", userData.fullname);

        setTimeout(() => {
          navigate("/verify-otp");
          setUserData({
            email: "",
            fullname: "",
            password: "",
            confirmPassword: "",
          });
        }, 2000);
      } else {
        setIsLoading(false);
        setError((prev) => ({
          ...prev,
          signupFailed: (
            <>
              <BiSolidError /> {error.response.data.message}!
            </>
          ),
        }));
      }
    } catch (error) {
      setIsLoading(false);
      setError((prev) => ({
        ...prev,
        signupFailed: (
          <div className="text-red-600 flex items-center gap-1 text-sm mt-1">
            <BiSolidError /> {error.response.data.message}
          </div>
        ),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={signupbg}
          className="w-full h-full object-cover"
          alt="Food background"
        />
        <div className="absolute inset-0 bg-black/40 "></div>
      </div>

      {/* Floating Food Icons with Different Animation */}
      <div className="absolute top-[136px] right-[410px] z-[20] text-green-700 ">
        <Coffee size={40} />
      </div>
      <div className="absolute bottom-[180px] left-[400px] z-[20] text-green-700 ">
        <Cookie size={50} />
      </div>
      <div className="absolute bottom-32 left-1/4 text-white/10 text-4xl animate-bounce">
        🍲
      </div>
      <div className="absolute top-1/2 left-12 text-white/10 text-3xl animate-pulse delay-700">
        🧑‍🍳
      </div>
      <div className="absolute top-20 left-1/2 text-white/10 text-4xl animate-bounce delay-1000">
        🍽️
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        {/* Header */}
        <div className="text-center  mb-4 mt-8">
          <Logo />
          <p className="text-white text-lg font-medium drop-shadow">
            Join our culinary community! 👨‍🍳
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-teal-500 mx-auto rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Mail size={16} className="text-green-600" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="chef@globalbites.com"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full px-4 min-h-[50px] py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none bg-white/90 hover:shadow-md"
                />
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Full Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="fullname"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <User size={16} className="text-green-600" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Master Chef Gordon"
                  value={userData.fullname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 min-h-[50px] pl-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none bg-white/90 hover:shadow-md"
                />
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Lock size={16} className="text-green-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Create your secret recipe"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full px-4 min-h-[50px] py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none bg-white/90 hover:shadow-md"
                />
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2 relative">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <Lock size={16} className="text-teal-600" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confShowPass ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your secret recipe"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 min-h-[50px] pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 outline-none bg-white/90 hover:shadow-md"
                />
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
                >
                  {confShowPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Error Messages */}
              {error.passwordMismatch && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  {error.passwordMismatch}
                </div>
              )}
            </div>

            {/* Success/Error Message */}
            {error.signupFailed && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-inner">
                {error.signupFailed}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 via-teal-500 to-green-600 hover:from-green-600 hover:via-teal-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <UserPlus size={20} />
                {isLoading
                  ? "Preparing your kitchen..."
                  : "Join Our Culinary Family"}
              </button>
            </div>

            {/* Footer Links */}
            <div className="pt-4 border-t border-gray-200">
              <div className="text-center">
                <span className="text-gray-600 text-sm">
                  Already part of our kitchen?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-semibold text-sm hover:underline transition-colors"
                >
                  Welcome back! 🍴
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-xs drop-shadow italic">
            "Life is too short for boring food" 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
