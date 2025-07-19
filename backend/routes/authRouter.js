import express from "express";
import { loginController, logoutController, signUpController, updateProfile, verifyEmail } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/verify-otp", verifyEmail);
router.get("/logout", logoutController);
router.put("/update-profile", authMiddleware, updateProfile);


export default router;