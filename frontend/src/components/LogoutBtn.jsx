import React from "react";
import { useUserContext } from "../context/CreateContext";
import api, { setAuthToken } from "../lib/api";

const LogoutBtn = () => {
  const { setUserContextData } = useUserContext();

  const handleLogout = async () => {
    try {
      const res = await api.post("/api/auth/logout");
      if (res.data.success) {
        setAuthToken(null);
        localStorage.removeItem("storedFullname");
        localStorage.removeItem("storedEmail");
        localStorage.removeItem("storedIsVerified");
        localStorage.removeItem("pendingVerifyEmail");

        setUserContextData({
          email: "",
          fullname: "",
          isVerified: false,
        });

        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
