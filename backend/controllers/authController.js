import User from "../models/User.js";
import bcrypt from "bcrypt";
import { sendOTP } from "../utils/email.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUpController = async (req, res) => {
    try {
        const { email, fullname, password } = req.body;

        if (!email || !fullname || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already existed!", success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const otp = Math.floor(10000 + Math.random() * 90000).toString();

        const newUser = await User.create({ email, fullname, password: hashedPass, otp });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });



        console.log(newUser);


        // Send OTP email first (priority) - this is more time-sensitive
        await sendOTP(newUser.email, otp);

        // Send welcome email asynchronously (non-blocking)
        // This prevents the welcome email from delaying the OTP

        // setImmediate(() => {
        //     sendWelcome(newUser.email, newUser.fullname).catch(error => {
        //         console.error('Welcome email failed (non-critical):', error);
        //     });
        // });


        return res.status(201).json({ message: "Successfuly Created", success: true, newUser, token });

    } catch (error) {
        console.log(`controller error ${error}`);
        return res.status(500).json({ message: "Account creation failed, Try again", success: false });
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: "Invalid or Expired code", success: false });
        }
        // Update the user document
        user.isVerified = true;
        user.otp = undefined;
        await user.save();

        return res.status(200).json({
            message: "Email verified successfully!",
            success: true,
        });

    } catch (error) {
        console.log("Verification failed", error);
        return res.status(500).json({
            message: "Something went wrong during verification",
            success: false
        });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email doesn't exist", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password", success: false });
        }
        if (!user.isVerified) {
            return res.status(200).json({ message: "Please, Verify your account", success: false, redirectToVerify: true })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login successful.", success: true, user, verified: user.isVerified, token
        });

    } catch (error) {
        return res.status(500).json({ message: `Login failed, Try again`, success: false });
    }
}

export const logoutController = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        })

        return res.status(200).json({ message: "Logged out successfuly", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Logged out failed", success: false })
    }
}



export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect", success: false });
        }
        const salt = bcrypt.genSalt(10);
        user.password = bcrypt.hash(newPassword, salt);
        await user.save();
        return res.status(200).json({ message: "Password updated successfully", success: true });
    } catch (error) {
        console.log("Password change failed", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { fullname }, { new: true });
        console.log(user);
        return res.status(200).json({ message: "Profile Updtate successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }

}