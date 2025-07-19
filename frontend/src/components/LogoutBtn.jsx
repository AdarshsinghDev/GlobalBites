import React from "react";
import axios from "axios";
import { useUserContext } from "../context/CreateContext";

const LogoutBtn = () => {
  const { setUserContextData } = useUserContext();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        localStorage.clear();
        localStorage.removeItem("storedFullname");
        localStorage.removeItem("storedEmail");
        localStorage.removeItem("storedIsVerified");

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
