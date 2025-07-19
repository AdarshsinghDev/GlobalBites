import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userContextData, setUserContextData] = useState({
    email: localStorage.getItem("storedEmail") || "",
    fullname: localStorage.getItem("storedFullname") || "",
    isVerified: localStorage.getItem("storedIsVerified") === "true" || false,
  });

  return (
    <UserContext.Provider value={{ userContextData, setUserContextData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
