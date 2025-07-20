import React from "react";
import { Link } from "react-router-dom";
import loginbg from "../../assets/login.jpg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSolidError, BiSolidCheckCircle } from "react-icons/bi";
import { useUserContext } from "../../context/CreateContext";
import Button from "../../components/ui/Button";
import {
  LogIn,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ChefHat,
  Utensils,
} from "lucide-react";
import Logo from "../../components/ui/Logo";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const { setUserContextData } = useUserContext();
  console.log(localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("https://globalbites-production.up.railway.app/api/auth/login", {
        email: userData.email,
        password: userData.password,
      });

      if (res.data.success) {
        setMessage(
          <div className="text-green-600 flex items-center gap-2 text-sm">
            Login successfully! <BiSolidCheckCircle />
          </div>
        );

        localStorage.setItem("storedEmail", res.data.user.email);
        localStorage.setItem("storedFullname", res.data.user.fullname);
        localStorage.setItem("storedIsVerified", res.data.user.isVerified);
        console.log("Token mil gaya:", res.data.token);
        localStorage.setItem("token", res.data.token);
        
        setUserContextData({
          email: localStorage.getItem("storedEmail"),
          fullname: localStorage.getItem("storedFullname"),
          isVerified: localStorage.getItem("storedIsVerified"),
        });

        setTimeout(() => {
          window.location.href = "/home";
          setIsLoading(false);
          setUserData({
            email: "",
            password: "",
          });
        }, 1000);
      } else if (res.data.redirectToVerify) {
        setMessage(
          <div className="text-yellow-700 flex items-center gap-2 text-sm">
            Please verify OTP before logging in <BiSolidError />
          </div>
        );
        setIsLoading(false);
        setTimeout(() => {
          navigate("/verify-otp");
        }, 1500);
      } else {
        setIsLoading(false);
        setMessage(
          <div className="text-red-600 flex items-center gap-2 text-sm">
            {res.data.message} <BiSolidError />
          </div>
        );
      }
    } catch (error) {
      setIsLoading(false);
      setMessage(
        <div className="text-red-600 flex items-center gap-2 text-sm">
          {error.response.data.message}
          <BiSolidError />
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen  w-full flex items-center justify-center bg-gradient-to-br  relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={loginbg}
          className="w-full h-full object-cover"
          alt="Food background"
        />
        <div className="absolute inset-0 bg-black/40 "></div>
      </div>

      {/* Floating Food Icons */}
      <div className="absolute top-[110px] right-[450px] text-white/100 z-[20]">
        <div className="text-6xl">🍕</div>
      </div>
      <div className="absolute bottom-[45px] left-[420px] z-[20] text-white/100">
        <div className="text-5xl">🍜</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-4 lg:mt-0 mt-[-40%]">
        {/* Header */}
        <div className="text-center mb-4 mt-8">
          <Logo />
          <p className="text-white/90 text-lg font-medium">
            Welcome back, food lover! 🍽️
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Log In</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  onChange={handleChange}
                  value={userData.email}
                  className="w-full px-4 py-3 min-h-[50px] pl-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none bg-white/90"
                />
                <Mail
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
                  placeholder="Enter your secret recipe"
                  onChange={handleChange}
                  value={userData.password}
                  className="w-full px-4 py-3 min-h-[50px] pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 outline-none bg-white/90"
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

            {/* Message Display */}
            {message && (
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2 text-center flex justify-center">
              <Button
                btnType="submit"
                btnText={
                  isLoading
                    ? "Cooking up your session..."
                    : "Start Your Culinary Journey"
                }
                btnIcon={<LogIn size={20} />}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 "
              />
            </div>

            {/* Footer Links */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-green-600 hover:text-green-700 font-medium text-sm hover:underline transition-colors"
                >
                  Forgot your recipe? 🔐
                </Link>
              </div>

              <div className="text-center">
                <span className="text-gray-600 text-sm">
                  New to our kitchen?{" "}
                </span>
                <Link
                  to="/signup"
                  className="text-green-600 hover:text-green-700 font-semibold text-sm hover:underline transition-colors"
                >
                  Join the feast! 🍴
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-6">
          <p className="text-white/70 text-xs">
            "Good food is the foundation of genuine happiness" ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
