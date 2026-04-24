import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOTP, sendWelcome } from "../utils/email.js";
import asyncHandler from "../utils/asyncHandler.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_EXPIRY_MS = 10 * 60 * 1000;

const sanitizeUser = (user) => ({
  id: user._id,
  email: user.email,
  fullname: user.fullname,
  isVerified: user.isVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const createAuthToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const signUpController = asyncHandler(async (req, res) => {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();
  const fullname = String(req.body?.fullname || "").trim();
  const password = String(req.body?.password || "");

  if (!email || !fullname || !password) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email", success: false });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long", success: false });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const existingUser = await User.findOne({ email });
  let user = existingUser;

  if (existingUser?.isVerified) {
    return res.status(409).json({ message: "Email already exists", success: false });
  }

  if (existingUser && !existingUser.isVerified) {
    existingUser.fullname = fullname;
    existingUser.password = hashedPass;
    existingUser.otp = otp;
    existingUser.verifyOtpExpireAt = Date.now() + OTP_EXPIRY_MS;
    await existingUser.save();
    user = existingUser;
  }

  if (!user) {
    user = await User.create({
      email,
      fullname,
      password: hashedPass,
      otp,
      verifyOtpExpireAt: Date.now() + OTP_EXPIRY_MS,
    });
  }

  const token = createAuthToken(user._id);
  setAuthCookie(res, token);

  sendOTP(user.email, otp)
    .then(() => console.log("OTP sent to", user.email))
    .catch((err) => console.error("OTP send failed:", err?.message || err));

  return res.status(201).json({
    message: existingUser ? "OTP resent successfully" : "Account created successfully",
    success: true,
    user: sanitizeUser(user),
    token,
    requiresVerification: true,
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();
  const otp = String(req.body?.otp || "").trim();

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required", success: false });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  const otpExpired = !user.verifyOtpExpireAt || user.verifyOtpExpireAt < Date.now();
  if (!user.otp || user.otp !== otp || otpExpired) {
    return res.status(400).json({ message: "Invalid or expired OTP", success: false });
  }

  user.isVerified = true;
  user.otp = "";
  user.verifyOtpExpireAt = 0;
  await user.save();

  sendWelcome(user.email, user.fullname)
    .then(() => console.log("Welcome email sent to", user.email))
    .catch((err) => console.error("Welcome email failed:", err?.message || err));

  return res.status(200).json({
    message: "Email verified successfully",
    success: true,
    user: sanitizeUser(user),
  });
});

export const loginController = asyncHandler(async (req, res) => {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();
  const password = String(req.body?.password || "");

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required", success: false });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials", success: false });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials", success: false });
  }

  if (!user.isVerified) {
    return res.status(403).json({
      message: "Please verify your account first",
      success: false,
      redirectToVerify: true,
    });
  }

  const token = createAuthToken(user._id);
  setAuthCookie(res, token);

  return res.status(200).json({
    message: "Login successful",
    success: true,
    user: sanitizeUser(user),
    token,
  });
});

export const logoutController = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({ message: "Logged out successfully", success: true });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required", success: false });
  }
  if (String(newPassword).length < 8) {
    return res
      .status(400)
      .json({ message: "New password must be at least 8 characters", success: false });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect", success: false });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  return res.status(200).json({ message: "Password updated successfully", success: true });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const fullname = String(req.body?.fullname || "").trim();
  if (!fullname) {
    return res.status(400).json({ message: "Full name is required", success: false });
  }

  const user = await User.findByIdAndUpdate(req.user.id, { fullname }, { new: true });
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  return res.status(200).json({
    message: "Profile updated successfully",
    success: true,
    user: sanitizeUser(user),
  });
});

export const meController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  return res.status(200).json({
    success: true,
    user: sanitizeUser(user),
  });
});
