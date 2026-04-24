import mongoose from "mongoose";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const resolveMongoUri = () =>
  process.env.MONGODB_URI ||
  process.env.MongoDB_URI ||
  process.env.MONGO_URI ||
  "";

const connectDB = async () => {
    const mongoUri = resolveMongoUri();
    if (!mongoUri) {
        throw new Error("MongoDB URI missing. Set MONGODB_URI, MongoDB_URI, or MONGO_URI.");
    }

    const maxAttempts = Number(process.env.MONGO_CONNECT_RETRIES || 3);

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
            await mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 10000,
            });
            console.log("MongoDB connected successfully.");
            return;
        } catch (error) {
            const code = error?.code || "UNKNOWN";
            const message = error?.message || String(error);
            console.error(`MongoDB connection failed (attempt ${attempt}/${maxAttempts}) [${code}]: ${message}`);

            if (attempt < maxAttempts) {
                await sleep(1000 * attempt);
            }
        }
    }

    throw new Error(
        "MongoDB unavailable after retries. Verify cluster hostname and network access."
    );
};

export default connectDB;
