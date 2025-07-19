// routes/aiRoute.js
import express from "express";
import { aiController } from "../controllers/aiController.js";

const router = express.Router();

// Main recipe generation endpoint
router.post("/get-recipes", aiController);

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "AI Recipe service is running",
    timestamp: new Date().toISOString(),
    apis: {
      gemini: !!process.env.GEMINI_API_KEY
    }
  });
});

export default router;