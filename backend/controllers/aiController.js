import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const aiController = async (req, res) => {
    let { ingredients } = req.body;

    try {
        // Handle different input formats
        if (Array.isArray(ingredients)) {
            ingredients = ingredients.join(", ");
        }

        if (!ingredients || typeof ingredients !== "string") {
            return res.status(400).json({ error: "Please provide ingredients" });
        }

        // Clean ingredients input
        const cleanIngredients = ingredients
            .split(",")
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient.length > 0)
            .join(", ");

        if (!cleanIngredients) {
            return res.status(400).json({ error: "Please provide valid ingredients" });
        }

        console.log(`Generating recipes for: ${cleanIngredients}`);

        // Create simple prompt for AI
        const prompt = `Available ingredients: ${cleanIngredients}

Generate 12 Indian recipes using these ingredients. For each recipe, provide and use hinglish:
1. Recipe name
2. Brief description (1-2 lines)
3. Main ingredients needed
4. Cooking time estimate

Format each recipe exactly like this:
RECIPE_NAME | DESCRIPTION | MAIN_INGREDIENTS | COOKING_TIME

Example:
Paneer Butter Masala | Creamy tomato-based curry with soft paneer cubes | paneer, tomato, cream, butter | 30-40 mins

Only provide the recipe information, no extra text.`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse AI response into recipe objects
        const recipeLines = text
            .split("\n")
            .filter(line => line.trim() && line.includes("|"))
            .slice(0, 12);

        const recipes = recipeLines.map((line, index) => {
            const parts = line.split("|").map(part => part.trim());
            
            if (parts.length >= 4) {
                return {
                    id: index + 1,
                    name: parts[0],
                    description: parts[1],
                    mainIngredients: parts[2],
                    cookingTime: parts[3]
                };
            }
            return null;
        }).filter(recipe => recipe !== null);

        // If no recipes generated, create a default one
        if (recipes.length === 0) {
            return res.status(200).json({
                recipes: [{
                    id: 1,
                    name: `Custom Recipe with ${cleanIngredients}`,
                    description: "Try mixing these ingredients in traditional Indian style with basic spices",
                    mainIngredients: cleanIngredients,
                    cookingTime: "30-45 mins"
                }],
                searchedIngredients: cleanIngredients
            });
        }

        console.log(`Successfully generated ${recipes.length} recipes`);

        res.status(200).json({
            recipes: recipes,
            searchedIngredients: cleanIngredients,
            count: recipes.length
        });

    } catch (error) {
        console.error("Error generating recipes:", error.message);
        res.status(500).json({
            error: "Failed to generate recipes. Please try again.",
            details: error.message
        });
    }
};