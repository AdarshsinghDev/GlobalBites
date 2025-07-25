import express from "express";
import { aiChefController, aiController } from "../controllers/aiController.js";

const router = express.Router();

// POST route for generating recipes
router.post("/get-recipes", aiController);
router.post("/ai-chef", aiChefController);

export default router;