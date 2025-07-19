import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MongoDB_URI);
        console.log("✅ MongoDB connected successfully.")

    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
    }
}

export default connectDB;