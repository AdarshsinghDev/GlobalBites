// // import { useUser } from "../context/UserContext";
// import { Navigate } from "react-router-dom";
// const PrivateRouter = ({ children }) => {
//   const { user } = useUser();
//   const isLoggedIn = user && user.email;

//   return isLoggedIn ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRouter;