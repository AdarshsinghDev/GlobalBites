import express from "express";
import { aiChefController, aiController, aiHomeRecipe } from "../controllers/aiController.js";

const router = express.Router();

// POST route for generating recipes
router.post("/get-recipes", aiController);
router.post("/ai-chef", aiChefController);
router.post("/home-recipe", aiHomeRecipe);

export default router;