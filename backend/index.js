  import express from "express";
  import dotenv from "dotenv";
  dotenv.config();

  import authRouter from "./routes/authRouter.js";
  import aiRoute from "./routes/aiRoute.js";
  import connectDB from "./config/db.js";
  import cors from "cors";

  const app = express();
  const PORT = process.env.PORT || 8080;

  // Middleware
  app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
  app.use(express.json());


  // Routes
  app.use("/api/auth", authRouter);
  app.use("/api/recipe-ai", aiRoute); // ✅ Used OpenAI route

  // Start server
  app.listen(PORT, () => {
    connectDB();
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
