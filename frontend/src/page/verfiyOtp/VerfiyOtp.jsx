import React, { useState } from "react";
import { BiSolidError, BiSolidCheckCircle } from "react-icons/bi";
import { useEffect } from "react";
import {
  Mail,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";

//Import Context for global access of User's data
import { useUserContext } from "../../context/CreateContext";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();

  const { setUserContextData, userContextData } = useUserContext();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("storedEmail");
    setEmail(storedEmail);
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`,
        { email, otp }
      );

      if (res.data.success) {
        setMessage(
          <div className="text-green-600 flex items-center gap-2 text-sm">
            OTP verified successfully! <BiSolidCheckCircle size={30} />
          </div>
        );
        setUserContextData((prev) => ({ ...prev, isVerified: true }));
        localStorage.setItem("storedIsVerified", true);

        setTimeout(() => {
          window.location.href = "/home";
          setOtp("");
        }, 1000);
      } else {
        setMessage(
          <div className="text-red-600 flex items-center gap-2 text-sm">
            {res.data.message} <BiSolidError size={30} />
          </div>
        );
      }
    } catch (error) {
      setMessage(
        <div className="text-red-600 flex items-center gap-2 text-sm">
          {error.response?.data?.message || "Server error"}{" "}
          <BiSolidError size={30} />
        </div>
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-indigo-200 to-purple-50 relative overflow-hidden px-4">
   
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center my-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Email Verification
          </h1>
          <p className="text-gray-600">
            We've sent a special code to secure your culinary journey
          </p>
        </div>

        {/* Verification Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8 animate-fade-in">
          <div className="text-center my-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center justify-center gap-2">
              <KeyRound className="text-indigo-600" size={24} />
              Verify Your Email
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          {/* Email Display */}
          <div className="w-fit  m-auto bg-gradient-to-r from-blue-100 to-indigo-200 rounded-xl p-4 mb-6 border  border-blue-300">
            <div className="flex items-center justify-center gap-1 text-sm">
              <Mail className="text-blue-600" size={18} />
              <span className="text-gray-700">OTP sent to:</span>
              <span className="font-semibold text-blue-700">
                {email || "your email"}
              </span>
            </div>
          </div>
          {/* OTP Form */}
          <form onSubmit={handleSumbit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="otp"
                className="text-sm font-semibold text-gray-700 flex justify-center"
              >
                Enter OTP Code
              </label>
              <div className="relative text-center">
                <input
                  type="text"
                  placeholder="_ _ _ _ _"
                  onChange={handleChange}
                  value={otp}
                  maxLength="5"
                  style={{ letterSpacing: "5px" }}
                  className="w-[60%] m-auto px-4 py-4 min-h-[50px] text-center text-xl font-mono font-bold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 outline-none bg-white/90 hover:shadow-md tracking-wider"
                />
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-inner">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-fit m-auto bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  Verifying your kitchen access...
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Verify & Enter Kitchen
                </>
              )}
            </button>
          </form>

          {/* Help Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">Didn't receive the code?</p>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors">
                Resend verification code
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-xs italic">
            "Security is the secret ingredient to great cooking" 🔒✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
