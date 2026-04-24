import express from "express";
import { aiChefController, aiController, aiHomeRecipe, aiBudget, aiKnowledgeGuide } from "../controllers/aiController.js";

const router = express.Router();

// POST route for generating recipes
router.post("/get-recipes", aiController);
router.post("/ai-chef", aiChefController);
router.post("/home-recipe", aiHomeRecipe);
router.post("/budget", aiBudget);
router.post("/knowledge-guide", aiKnowledgeGuide);

export default router;
