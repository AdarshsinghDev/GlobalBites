import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//Home Controller
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

    Generate 12 Indian recipes using these ingredients For each recipe and main recipe should prepared by be provided recipe, provide and use hinglish:
    1. Recipe name
    2. Brief description (2 lines)
    3. Main ingredients needed
    4. Cooking time estimate

    Format each recipe exactly like this:
    RECIPE_NAME | DESCRIPTION | MAIN_INGREDIENTS | COOKING_TIME

    Example:
    Paneer Butter Masala | Creamy tomato-based curry with soft paneer cubes | paneer, tomato, cream, butter | 30-40 mins

    Only provide the recipe information, no extra text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
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


//Chef AI
export const aiChefController = async (req, res) => {
  const { chefName, generateRecipe } = req.body;

  if (!chefName || !generateRecipe) {
    return res.status(400).json({ error: "Chef name and dish name are required" });
  }

  try {
    const prompt = `
    Dish: ${generateRecipe}
    Chef: ${chefName}

    Assume you are legendary Chef ${chefName}. How would you make the dish "${generateRecipe}" in your own signature cooking style and how would you react to that dish? Try to entertain in accurately original style. Everything should be Perfect and Accurate and feel like you are real there if give dish is not a dish or dish name not found then genrate message that is not a dish name.

    IMPORTANT: Please respond in JSON format with the following structure:
    {
    "greeting": "Chef ${chefName}'s short Hinglish intro (max 2 lines) + 1 pro cooking hack + quirky GlobalBites shoutout"
     "ingredients": [
        {"item": "ingredient name with emoji", "quantity": "amount"}
    ],
    "instructions": [
    "Step 1: Short Hinglish step (1 lines, clear & fun)",
    "Step 2: Short Hinglish step (1 lines, clear & fun)",
    "Step 3: Short Hinglish step (1 lines, clear & fun)",
    "Step 4: Short Hinglish step (1 lines, clear & fun)",
    "Step 5: Short Hinglish step (1 lines, clear & fun)",
    "Step 6: Short Hinglish step (1 lines, clear & fun)",
    "Step 7: Chef’s Secret Challenge – unique twist or hack"
    ],
    "cookTime": "estimated time",
    "tags": ["Comfort", "High-Protein", "Fusion", "etc"],
    "goodbye": "Emotional Goodbye Message stay connected to GlobalBites",
    "signature": [
    {
      "title": "Famous signature dish 1 with Emoji and graphical element",
      "description": "2 lines desciption with emoji"
    },
    {
      "title": "Famous signature dish 2 with Emoji and graphical element",
      "description": "2 lines description with emoji"
    },
    {
      "title": "Famous signature dish 3 with Emoji and graphical element",
      "description": "2  lines discription with emoji"
    },
    {
      "title": "Famous signature dish 4 with Emoji and graphical element",
      "description": "2 lines discription with emoji"
    },
    {
      "title": "Famous signature dish 5 with Emoji and graphical element",
      "description": "2 lines discription with emoji"
    },
    {
      "title": "Famous signature dish 6 with Emoji and graphical element",
      "description": "2 linesdiscription with emoji"
    }
  ]
    }

    Respond only in JSON format. Keep it engaging and chef-style in Hinglish.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/, '').replace(/\n?```$/, '');

    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/, '').replace(/\n?```$/, '');

    }
    const parsedRecipe = JSON.parse(cleanedText);


    res.status(200).json({ recipe: parsedRecipe, success: true });

  } catch (error) {
    console.error("AI Chef Error:", error.message);
    res.status(500).json({ error: "Failed to generate recipe", details: error.message });
  }
};

//Home Recipe
export const aiHomeRecipe = async (req, res) => {
  const { recipe } = req.body;

  try {
    const prompt = `
You are an expert recipe creator. Generate ONE recipe based on the dish name: ${recipe}.

Respond ONLY in JSON, with this exact structure:
{
  "name": "Dish name",
  "description": "Very short Hinglish description (max 10 words)",
  "time": number,
  "difficulty": "Easy | Medium | Hard",
  "servings": number,
  "calories": number,
  "tags": ["#Healthy", "#Comfort", "#HighProtein", "#Spicy", "#FestiveSpecial", "#FamilyFavorite", "#StreetStyle", "#RestaurantStyle", "#Fusion", "#QuickMeals", "#BudgetFriendly", "#SeasonalSpecial"],
  "ingredients": [
    { "name": "Ingredient name", "amount": number, "unit": "g/ml/tsp/etc" }
  ],
  "chefTip": "One short Hinglish tip for better taste",
  "moodBooster": "One short Hinglish fun line about mood boost",
  "nutritionPerServing": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fats": number
  },
  "steps": [
    {
      "stepNumber": 1,
      "title": "Short step title",
      "instruction": "Full Hinglish step instruction"
    }
  ]
}

Rules:
- time should be number only (like 30, not "30 mins")
- steps of instruction should be easy and in detailed and less than 8 steps of instruction of cooking.
- Use Hinglish for instructions, tips, and mood booster.
- Respond only in JSON format. No extra text.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // aiChef style cleaning (same technique)
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    // Parse JSON
    const parsedRecipe = JSON.parse(cleanedText);

    return res.status(200).json({ recipe: parsedRecipe });

  } catch (error) {
    console.error("AI Home Recipe Error:", error.message);
    return res.status(500).json({
      error: "Failed to generate recipe",
      details: error.message
    });
  }
};



// Budget Recipe
export const aiBudget = async (req, res) => {
  const { budget, meal, frequency, prefrence } = req.body;

  try {
    const prompt = `
You are an expert Indian recipe creator.

TASK:
Generate EXACTLY 6 unique Indian recipes based on the following user details:
Budget: ${budget}
Meal Type: ${meal}
Frequency: ${frequency}
Preference: ${prefrence}

OUTPUT FORMAT RULES:
- Output must be a valid JSON array ONLY. No explanations, no markdown, no text outside JSON.
- The array must contain exactly 10 recipe objects.
- Each object must strictly follow this schema: 

Respond ONLY in pure JSON format, array of objects with this exact structure:
[
  {
    "name": "Dish name",
    "description": "Very short Hinglish description (max 10 words)",
    "time": number,
    "difficulty": "Easy | Medium | Hard",
    "servings": number,
    "calories": number,
    "ingredients": [
      {
        "item": "ingredient name",
        "quantity": "amount with unit",
        "price": number
      }
    ],
    "totalPrice": number,
    "avgPricePerPerson": number,
    "steps": [
      "Step 1 in Hinglish",
      "Step 2 in Hinglish",
      "... (maximum 4 steps)"
    ],
    "tips": [
      "Cooking tip in Hinglish"
    ]
  }
]

Rules:
- Must return exactly 6 recipes (not less, not more).
- Prices must be realistic INR (India market approx).
- "totalPrice" must equal sum of ingredient prices.
- "avgPricePerPerson" = totalPrice / servings.
- Steps must have at least 4 entries, written in Hinglish and every step should be very short and Easy.
- Tips must be fun + useful in Hinglish.
- I want Quick response, so don't add any duplicate or unneccesary thing that can make response delay.
- Output only valid JSON. No comments, no text outside the JSON array.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // --- Clean the response ---
    let cleanedText = text.trim();

    // Remove ```json ... ```
    cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/```$/, '');

    // Remove ``` ... ```
    cleanedText = cleanedText.replace(/^```\s*/, '').replace(/```$/, '');

    // Remove any stray comments (// ... or /* ... */)
    cleanedText = cleanedText.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove trailing commas before ] or }
    cleanedText = cleanedText.replace(/,\s*([}\]])/g, '$1');

    // --- Parse JSON safely ---
    // --- Clean and Parse JSON ---
    let parsedJson;
    try {
      // Keep only up to the last ']'
      const lastBracket = cleanedText.lastIndexOf("]");
      if (lastBracket !== -1) {
        cleanedText = cleanedText.substring(0, lastBracket + 1);
      }

      // Remove trailing commas
      cleanedText = cleanedText.replace(/,\s*([}\]])/g, "$1");

      parsedJson = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);
      return res.status(500).json({
        error: "Failed to parse AI response",
        raw: cleanedText,
        details: parseError.message
      });
    }
    // Return parsed JSON
    return res.status(200).json({ recipes: parsedJson });


  } catch (error) {
    console.error("Budget Recipe Error:", error.message);
    return res.status(500).json({
      error: "Failed to generate recipe",
      details: error.message
    });
  }
};