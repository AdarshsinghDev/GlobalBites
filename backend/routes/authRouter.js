import express from "express";
import {
  changePassword,
  loginController,
  logoutController,
  meController,
  signUpController,
  updateProfile,
  verifyEmail,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/verify-otp", verifyEmail);
router.post("/logout", logoutController);
router.put("/update-profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.get("/me", authMiddleware, meController);


export default router;
