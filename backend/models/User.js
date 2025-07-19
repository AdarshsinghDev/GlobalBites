import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0,
    },
    resetOtp: {
        type: String,
        default: '',
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0,
    }
}, 
{ timestamps: true }
);

export default mongoose.model("User", UserSchema);