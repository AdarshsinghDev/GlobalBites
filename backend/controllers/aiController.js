import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_MODELS = (process.env.GEMINI_MODELS || "gemini-2.5-flash,gemini-2.0-flash")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);
const GEMINI_MODEL_FALLBACKS = ["gemini-2.5-flash", "gemini-2.0-flash"];
const GEMINI_API_KEYS = (() => {
  const single = String(process.env.GEMINI_API_KEY || "").trim();
  const many = String(process.env.GEMINI_API_KEYS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const merged = [single, ...many].filter(Boolean);
  return [...new Set(merged)];
})();
const GEMINI_MAX_RETRIES = Number(process.env.GEMINI_MAX_RETRIES || 3);
const GEMINI_KEY_BLOCK_FALLBACK_MS = Number(process.env.GEMINI_KEY_BLOCK_FALLBACK_MS || 35_000);
const HOME_SEARCH_MAX_RETRIES = Number(process.env.HOME_SEARCH_MAX_RETRIES || 2);
const SEARCH_AI_TIMEOUT_MS = Number(process.env.SEARCH_AI_TIMEOUT_MS || 15000);
const SEARCH_CACHE_TTL_MS = Number(process.env.SEARCH_CACHE_TTL_MS || 20 * 60 * 1000);
const SEARCH_MAX_RECIPES = Math.max(12, Number(process.env.SEARCH_MAX_RECIPES || 12));
const SEARCH_CACHE_VERSION = 2;
const RETRIABLE_HTTP_STATUS = new Set([408, 429, 500, 502, 503, 504]);
const homeSearchCache = new Map();
const geminiKeyBlockedUntil = new Map();
let geminiKeyCursor = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const stripCodeFence = (text = "") => {
  let cleanedText = String(text).trim();
  if (cleanedText.startsWith("```json")) {
    cleanedText = cleanedText.replace(/```json\n?/, "").replace(/\n?```$/, "");
  } else if (cleanedText.startsWith("```")) {
    cleanedText = cleanedText.replace(/```\n?/, "").replace(/\n?```$/, "");
  }
  return cleanedText.trim();
};

const extractJsonObject = (text = "") => {
  const input = String(text || "");
  const start = input.indexOf("{");
  if (start === -1) return "";

  let depth = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = start; i < input.length; i += 1) {
    const ch = input[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (ch === "\\") {
      escapeNext = true;
      continue;
    }

    if (ch === "\"") {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (ch === "{") depth += 1;
      if (ch === "}") {
        depth -= 1;
        if (depth === 0) {
          return input.slice(start, i + 1);
        }
      }
    }
  }

  return "";
};

const extractJsonArray = (text = "") => {
  const input = String(text || "");
  const start = input.indexOf("[");
  if (start === -1) return "";

  let depth = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = start; i < input.length; i += 1) {
    const ch = input[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (ch === "\\") {
      escapeNext = true;
      continue;
    }

    if (ch === "\"") {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (ch === "[") depth += 1;
      if (ch === "]") {
        depth -= 1;
        if (depth === 0) {
          return input.slice(start, i + 1);
        }
      }
    }
  }

  return "";
};

const parseJsonFromModel = (text = "") => {
  let cleaned = stripCodeFence(text);
  let parsed = null;
  try {
    parsed = JSON.parse(cleaned);
    return parsed;
  } catch (_) {
    // Continue with repairs
  }

  const objectSlice = extractJsonObject(cleaned);
  if (objectSlice) {
    cleaned = objectSlice;
  }

  cleaned = cleaned
    .replace(/,\s*([}\]])/g, "$1")
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"');

  return JSON.parse(cleaned);
};

const parseJsonArrayFromModel = (text = "") => {
  let cleaned = stripCodeFence(text);
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.recipes)) return parsed.recipes;
  } catch (_) {
    // Continue with repairs
  }

  const arraySlice = extractJsonArray(cleaned);
  if (arraySlice) {
    cleaned = arraySlice;
  }

  cleaned = cleaned
    .replace(/,\s*([}\]])/g, "$1")
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"');

  const parsed = JSON.parse(cleaned);
  if (Array.isArray(parsed)) return parsed;
  if (parsed && Array.isArray(parsed.recipes)) return parsed.recipes;
  throw new Error("Budget recipes response was not an array");
};

const buildFallbackBudgetRecipes = (budget = 0, meal = "Meal", preference = "Veg") => {
  const cappedBudget = Math.max(100, Number(budget) || 200);
  const basePerRecipe = Math.max(60, Math.floor(cappedBudget / 3));

  return Array.from({ length: 6 }, (_, i) => {
    const recipeCost = basePerRecipe + i * 10;
    const servings = 2 + (i % 2);
    return {
      name: `${preference || "Veg"} ${meal || "Meal"} Special ${i + 1}`,
      description: "Budget-friendly ghar ka tasty option",
      time: 25 + i * 3,
      difficulty: "Easy",
      servings,
      calories: 300 + i * 40,
      ingredients: [
        { item: "Onion", quantity: "2 pc", price: 12 },
        { item: "Tomato", quantity: "3 pc", price: 18 },
        { item: "Main ingredient", quantity: "250 g", price: 40 + i * 8 },
      ],
      totalPrice: recipeCost,
      avgPricePerPerson: Number((recipeCost / servings).toFixed(2)),
      steps: [
        "Step 1 in Hinglish: Sab prep kar lo.",
        "Step 2 in Hinglish: Masala halka bhuno.",
        "Step 3 in Hinglish: Main item add karke pakao.",
        "Step 4 in Hinglish: Taste adjust karke serve karo.",
      ],
      tips: ["Budget hack: seasonal veggies use karo."],
    };
  });
};

const getGeminiStatusCode = (error) => {
  const status = Number(error?.status || error?.statusCode || error?.code);
  if (Number.isInteger(status) && status > 0) return status;
  const message = String(error?.message || "");
  const match = message.match(/\[(\d{3})\s+[^\]]+\]/);
  return match ? Number(match[1]) : null;
};

const isRetriableGeminiError = (error) => {
  const statusCode = getGeminiStatusCode(error);
  if (statusCode && RETRIABLE_HTTP_STATUS.has(statusCode)) return true;
  const message = String(error?.message || "").toLowerCase();
  return message.includes("timed out") || message.includes("econnreset");
};

const isInvalidGeminiKeyError = (error) => {
  const statusCode = getGeminiStatusCode(error);
  const message = String(error?.message || "").toLowerCase();
  return statusCode === 400 && message.includes("api key not valid");
};

const isModelNotFoundError = (error) => {
  const statusCode = getGeminiStatusCode(error);
  const message = String(error?.message || "").toLowerCase();
  return statusCode === 404 && (message.includes("is not found") || message.includes("not supported"));
};

const isQuotaExceededGeminiError = (error) => {
  const statusCode = getGeminiStatusCode(error);
  const message = String(error?.message || "").toLowerCase();
  return (
    statusCode === 429 &&
    (message.includes("quota exceeded") ||
      message.includes("too many requests") ||
      message.includes("rate limit"))
  );
};

const maskApiKey = (key = "") => {
  const value = String(key || "").trim();
  if (value.length <= 8) return "****";
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
};

const getRetryDelayMsFromError = (error) => {
  const message = String(error?.message || "");
  const secMatch = message.match(/retry in\s+([\d.]+)s/i);
  if (secMatch) return Math.max(1000, Math.ceil(Number(secMatch[1]) * 1000));
  const retryInfoMatch = message.match(/"retryDelay":"(\d+)s"/i);
  if (retryInfoMatch) return Math.max(1000, Number(retryInfoMatch[1]) * 1000);
  return GEMINI_KEY_BLOCK_FALLBACK_MS;
};

const isGeminiKeyBlocked = (apiKey) => {
  const blockedUntil = Number(geminiKeyBlockedUntil.get(apiKey) || 0);
  if (!blockedUntil) return false;
  if (Date.now() >= blockedUntil) {
    geminiKeyBlockedUntil.delete(apiKey);
    return false;
  }
  return true;
};

const blockGeminiKeyTemporarily = (apiKey, error) => {
  const delayMs = getRetryDelayMsFromError(error);
  geminiKeyBlockedUntil.set(apiKey, Date.now() + delayMs);
  return delayMs;
};

const getOrderedGeminiApiKeys = () => {
  if (GEMINI_API_KEYS.length === 0) return [];
  const offset = ((geminiKeyCursor % GEMINI_API_KEYS.length) + GEMINI_API_KEYS.length) % GEMINI_API_KEYS.length;
  const rotated = [
    ...GEMINI_API_KEYS.slice(offset),
    ...GEMINI_API_KEYS.slice(0, offset),
  ];
  const active = rotated.filter((key) => !isGeminiKeyBlocked(key));
  return active.length > 0 ? active : rotated;
};

const generateGeminiText = async (prompt, options = {}) => {
  if (GEMINI_API_KEYS.length === 0) {
    throw new Error("GEMINI_API_KEY or GEMINI_API_KEYS is missing");
  }
  const maxRetries = Math.max(1, Number(options.maxRetries || GEMINI_MAX_RETRIES));
  const requestTimeoutMs = Math.max(0, Number(options.timeoutMs || 0));
  const selectedModels =
    Array.isArray(options.models) && options.models.length > 0
      ? options.models
      : GEMINI_MODELS;
  const modelsToTry = [...new Set([...selectedModels, ...GEMINI_MODEL_FALLBACKS])];

  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    let shouldRetryAttempt = false;
    const orderedApiKeys = getOrderedGeminiApiKeys();

    for (const apiKey of orderedApiKeys) {
      const genAI = new GoogleGenerativeAI(apiKey);
      let moveToNextApiKey = false;

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const requestPromise = model.generateContent(prompt);
          const result =
            requestTimeoutMs > 0
              ? await Promise.race([
                  requestPromise,
                  sleep(requestTimeoutMs).then(() => {
                    const timeoutError = new Error(`Gemini request timed out after ${requestTimeoutMs}ms`);
                    timeoutError.code = "ETIMEDOUT";
                    throw timeoutError;
                  }),
                ])
              : await requestPromise;
          const response = await result.response;
          return response.text();
        } catch (error) {
          lastError = error;
          const statusCode = getGeminiStatusCode(error);
          const retriable = isRetriableGeminiError(error);
          console.error(
            `Gemini request failed (attempt ${attempt}/${maxRetries}, model ${modelName}, key ${maskApiKey(apiKey)})` +
              `${statusCode ? ` [${statusCode}]` : ""}: ${error?.message || error}`
          );

          if (isQuotaExceededGeminiError(error)) {
            const blockedMs = blockGeminiKeyTemporarily(apiKey, error);
            console.warn(
              `Gemini key ${maskApiKey(apiKey)} temporarily blocked for ${Math.ceil(blockedMs / 1000)}s due to quota/rate limits.`
            );
            moveToNextApiKey = true;
            break;
          }
          if (isInvalidGeminiKeyError(error)) {
            moveToNextApiKey = true;
            break;
          }
          if (isModelNotFoundError(error)) {
            continue;
          }
          if (retriable) {
            shouldRetryAttempt = true;
            continue;
          }
          throw error;
        }
      }

      if (!moveToNextApiKey) {
        const successIndex = GEMINI_API_KEYS.indexOf(apiKey);
        if (successIndex >= 0) {
          geminiKeyCursor = (successIndex + 1) % GEMINI_API_KEYS.length;
        }
      }

      if (moveToNextApiKey) continue;
    }

    if (shouldRetryAttempt && attempt < maxRetries) {
      await sleep(700 * attempt);
    }
  }

  throw lastError || new Error("Gemini request failed");
};

const buildFallbackDetailedRecipe = (dishName = "Custom Recipe") => ({
  name: dishName,
  description: "Simple ghar-style dish, quick aur tasty.",
  time: 30,
  difficulty: "Easy",
  servings: 2,
  calories: 320,
  tags: ["#QuickMeals", "#BudgetFriendly", "#FamilyFavorite"],
  ingredients: [
    { name: "Main ingredient", amount: 250, unit: "g" },
    { name: "Onion", amount: 1, unit: "pc" },
    { name: "Tomato", amount: 1, unit: "pc" },
    { name: "Oil", amount: 2, unit: "tbsp" },
    { name: "Salt", amount: 1, unit: "tsp" },
  ],
  chefTip: "Masala ko 2 min bhuno, taste double ho jayega.",
  moodBooster: "Garam-garam bite, mood full set.",
  nutritionPerServing: {
    calories: 320,
    protein: 11,
    carbs: 26,
    fats: 18,
  },
  steps: [
    { stepNumber: 1, title: "Prep", instruction: "Sab ingredients ko wash aur chop kar lo." },
    { stepNumber: 2, title: "Base", instruction: "Oil garam karke onion-tomato halka golden tak bhuno." },
    { stepNumber: 3, title: "Cook", instruction: "Main ingredient aur masale daalke 12-15 min medium flame pe pakao." },
    { stepNumber: 4, title: "Finish", instruction: "Salt adjust karo aur fresh serve karo." },
  ],
});

const normalizeIngredientParts = (ingredients = "") =>
  String(ingredients)
    .toLowerCase()
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const getSearchCacheKey = (ingredients = "") => {
  const unique = [...new Set(normalizeIngredientParts(ingredients))];
  return unique.join(",");
};

const readSearchCache = (cacheKey) => {
  const cached = homeSearchCache.get(cacheKey);
  if (!cached) return null;
  if (Date.now() - cached.savedAt > SEARCH_CACHE_TTL_MS) {
    homeSearchCache.delete(cacheKey);
    return null;
  }
  if (cached?.payload?.cacheVersion !== SEARCH_CACHE_VERSION) {
    homeSearchCache.delete(cacheKey);
    return null;
  }
  return cached.payload;
};

const writeSearchCache = (cacheKey, payload) => {
  if (!cacheKey) return;
  homeSearchCache.set(cacheKey, {
    payload: {
      ...payload,
      cacheVersion: SEARCH_CACHE_VERSION,
    },
    savedAt: Date.now(),
  });
};

const buildFastFallbackSearchRecipes = (ingredients = "") => {
  const list = normalizeIngredientParts(ingredients);
  const focus = list[0] || "mix veg";
  const second = list[1] || "onion";
  const third = list[2] || "tomato";
  const fourth = list[3] || "coriander";

  const defaults = [
    {
      name: `${focus} Masala Stir`,
      description: `Quick masala toss with bold home-style flavor.`,
      mainIngredients: `${focus}, ${second}, basic masala`,
      cookingTime: "20-25 mins",
    },
    {
      name: `${focus} Tawa Fry`,
      description: `Crispy tawa-style version with light spice kick.`,
      mainIngredients: `${focus}, ${third}, oil, spices`,
      cookingTime: "18-22 mins",
    },
    {
      name: `${focus} Curry`,
      description: `Comforting gravy-style curry for everyday meals.`,
      mainIngredients: `${focus}, onion, tomato, ginger-garlic`,
      cookingTime: "28-35 mins",
    },
    {
      name: `${focus} Bhurji Style`,
      description: `Fast scrambled-style prep with punchy seasoning.`,
      mainIngredients: `${focus}, onion, chilli, ${fourth}`,
      cookingTime: "15-20 mins",
    },
    {
      name: `${focus} Rice Bowl`,
      description: `Balanced one-bowl meal with soft spice profile.`,
      mainIngredients: `${focus}, rice, ${second}, peas`,
      cookingTime: "25-30 mins",
    },
    {
      name: `${focus} Wrap Filling`,
      description: `Juicy stuffing that works great in wraps or rolls.`,
      mainIngredients: `${focus}, capsicum, ${second}, spices`,
      cookingTime: "16-20 mins",
    },
    {
      name: `${focus} Jeera Roast`,
      description: `Light cumin roast with crisp edges and aroma.`,
      mainIngredients: `${focus}, cumin, ${second}, oil`,
      cookingTime: "18-24 mins",
    },
    {
      name: `${focus} Tomato Saute`,
      description: `Tangy saute style dish with fresh tomato notes.`,
      mainIngredients: `${focus}, ${third}, garlic, pepper`,
      cookingTime: "17-22 mins",
    },
    {
      name: `${focus} Dry Sabzi`,
      description: `No-gravy everyday sabzi, easy and lunchbox-friendly.`,
      mainIngredients: `${focus}, ${second}, turmeric, coriander`,
      cookingTime: "20-26 mins",
    },
    {
      name: `${focus} Spiced Mash`,
      description: `Soft mashed texture with warm Indian tempering.`,
      mainIngredients: `${focus}, butter, chilli, ${fourth}`,
      cookingTime: "16-21 mins",
    },
    {
      name: `${focus} Soup Bowl`,
      description: `Mild and soothing broth-style preparation.`,
      mainIngredients: `${focus}, ${second}, pepper, herbs`,
      cookingTime: "24-30 mins",
    },
    {
      name: `${focus} Skillet Mix`,
      description: `Pan-cooked quick mix ideal for dinner sides.`,
      mainIngredients: `${focus}, ${second}, ${third}, seasoning`,
      cookingTime: "19-25 mins",
    },
  ];

  return defaults.slice(0, SEARCH_MAX_RECIPES).map((item, index) => ({
    id: index + 1,
    ...item,
  }));
};

const parseHomeRecipesFromText = (text = "") => {
  const recipeLines = String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && line.includes("|"))
    .slice(0, SEARCH_MAX_RECIPES);

  return recipeLines
    .map((line, index) => {
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length < 4) return null;

      return {
        id: index + 1,
        name: parts[0],
        description: parts[1],
        mainIngredients: parts[2],
        cookingTime: parts[3],
      };
    })
    .filter(Boolean);
};

const sanitizeHomeRecipes = (recipes = [], ingredients = "") => {
  const ingredientParts = normalizeIngredientParts(ingredients);
  const seen = new Set();

  return recipes
    .map((recipe, index) => {
      const name = String(recipe?.name || "").trim();
      const description = String(recipe?.description || "").trim();
      const mainIngredients = String(recipe?.mainIngredients || "").trim();
      const cookingTime = String(recipe?.cookingTime || "").trim();

      if (!name || !mainIngredients) return null;

      const key = name.toLowerCase();
      if (seen.has(key)) return null;
      seen.add(key);

      const haystack = `${name} ${mainIngredients}`.toLowerCase();
      const relevance = ingredientParts.reduce(
        (score, item) => (haystack.includes(item) ? score + 1 : score),
        0
      );

      return {
        id: index + 1,
        name,
        description: description || "Simple ghar-style quick recipe idea.",
        mainIngredients,
        cookingTime: cookingTime || "25-30 mins",
        relevance,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, SEARCH_MAX_RECIPES)
    .map(({ relevance, ...recipe }, index) => ({ ...recipe, id: index + 1 }));
};

const ensureHomeRecipesCount = (recipes = [], ingredients = "") => {
  const selected = Array.isArray(recipes) ? recipes : [];
  const normalized = selected
    .filter((item) => item?.name && item?.mainIngredients)
    .map((item) => ({
      name: String(item.name).trim(),
      description: String(item.description || "Simple ghar-style quick recipe idea.").trim(),
      mainIngredients: String(item.mainIngredients).trim(),
      cookingTime: String(item.cookingTime || "25-30 mins").trim(),
    }))
    .filter((item) => item.name && item.mainIngredients);

  if (normalized.length >= SEARCH_MAX_RECIPES) {
    return normalized.slice(0, SEARCH_MAX_RECIPES).map((item, index) => ({ ...item, id: index + 1 }));
  }

  const fallback = buildFastFallbackSearchRecipes(ingredients);
  const seen = new Set(normalized.map((item) => item.name.toLowerCase()));
  const merged = [...normalized];

  for (const item of fallback) {
    const key = String(item?.name || "").toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push({
      name: item.name,
      description: item.description,
      mainIngredients: item.mainIngredients,
      cookingTime: item.cookingTime,
    });
    if (merged.length >= SEARCH_MAX_RECIPES) break;
  }

  return merged.slice(0, SEARCH_MAX_RECIPES).map((item, index) => ({ ...item, id: index + 1 }));
};

//Home Controller
export const aiController = async (req, res) => {
  let { ingredients } = req.body;

  try {
    if (Array.isArray(ingredients)) {
      ingredients = ingredients.join(", ");
    }

    if (!ingredients || typeof ingredients !== "string") {
      return res.status(400).json({ error: "Please provide ingredients" });
    }

    const cleanIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient.length > 0)
      .join(", ");

    if (!cleanIngredients) {
      return res.status(400).json({ error: "Please provide valid ingredients" });
    }

    const cacheKey = getSearchCacheKey(cleanIngredients);
    const cachedPayload = readSearchCache(cacheKey);
    if (cachedPayload && Array.isArray(cachedPayload.recipes) && cachedPayload.recipes.length >= SEARCH_MAX_RECIPES) {
      return res.status(200).json({
        ...cachedPayload,
        cached: true,
      });
    }

    console.log(`Generating recipes for: ${cleanIngredients}`);

    const prompt = `Ingredients: ${cleanIngredients}

Generate exactly ${SEARCH_MAX_RECIPES} practical Indian recipe ideas.
Each recipe should be realistic for home cooking and must use these ingredients as primary base.
Keep responses short, accurate and in Hinglish.

Format every line exactly like:
    RECIPE_NAME | DESCRIPTION | MAIN_INGREDIENTS | COOKING_TIME

No numbering, no bullet points, no extra text.`;

    const text = await generateGeminiText(prompt, {
      maxRetries: HOME_SEARCH_MAX_RETRIES,
      timeoutMs: SEARCH_AI_TIMEOUT_MS,
    });

    const parsedRecipes = parseHomeRecipesFromText(text);
    const recipes = ensureHomeRecipesCount(
      sanitizeHomeRecipes(parsedRecipes, cleanIngredients),
      cleanIngredients
    );

    if (recipes.length === 0) {
      const payload = {
        recipes: ensureHomeRecipesCount([], cleanIngredients),
        searchedIngredients: cleanIngredients,
        fallback: true,
      };
      writeSearchCache(cacheKey, payload);
      return res.status(200).json(payload);
    }

    console.log(`Successfully generated ${recipes.length} recipes`);

    const payload = {
      recipes,
      searchedIngredients: cleanIngredients,
      count: recipes.length,
    };
    writeSearchCache(cacheKey, payload);
    res.status(200).json(payload);

  } catch (error) {
    console.error("Error generating recipes:", error.message);
    if (isInvalidGeminiKeyError(error)) {
      return res.status(503).json({
        error: "AI service unavailable due to invalid API key. Please update GEMINI_API_KEY in backend/.env.",
        code: "GEMINI_KEY_INVALID",
      });
    }
    if (isRetriableGeminiError(error)) {
      const fallbackIngredients = String(ingredients || "mixed ingredients")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .join(", ");
      const payload = {
        recipes: ensureHomeRecipesCount([], fallbackIngredients),
        searchedIngredients: fallbackIngredients || String(ingredients || ""),
        fallback: true,
      };
      writeSearchCache(getSearchCacheKey(fallbackIngredients), payload);
      return res.status(200).json(payload);
    }
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

    const text = await generateGeminiText(prompt);
    console.log(text);

    const parsedRecipe = parseJsonFromModel(text);


    res.status(200).json({ recipe: parsedRecipe, success: true });

  } catch (error) {
    console.error("AI Chef Error:", error.message);
    if (isInvalidGeminiKeyError(error)) {
      return res.status(503).json({
        error: "AI service unavailable due to invalid API key. Please update GEMINI_API_KEY in backend/.env.",
        code: "GEMINI_KEY_INVALID",
      });
    }
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

    const text = await generateGeminiText(prompt);

    // aiChef style cleaning (same technique)
    const cleanedText = stripCodeFence(text);

    // Parse JSON
    const parsedRecipe = JSON.parse(cleanedText);

    return res.status(200).json({ recipe: parsedRecipe });

  } catch (error) {
    console.error("AI Home Recipe Error:", error.message);
    if (isInvalidGeminiKeyError(error)) {
      return res.status(503).json({
        error: "AI service unavailable due to invalid API key. Please update GEMINI_API_KEY in backend/.env.",
        code: "GEMINI_KEY_INVALID",
      });
    }
    if (isRetriableGeminiError(error)) {
      return res.status(200).json({
        recipe: buildFallbackDetailedRecipe(recipe),
        fallback: true,
      });
    }
    return res.status(500).json({
      error: "Failed to generate recipe",
      details: error.message
    });
  }
};



// Budget Recipe
export const aiBudget = async (req, res) => {
  const { budget, meal, frequency, prefrence, preference } = req.body;
  const userPreference = preference || prefrence;

  try {
    const prompt = `
You are an expert Indian recipe creator.

TASK:
Generate EXACTLY 6 unique Indian recipes based on the following user details:
Budget: ${budget}
Meal Type: ${meal}
Frequency: ${frequency}
Preference: ${userPreference}

OUTPUT FORMAT RULES:
- Output must be a valid JSON array ONLY. No explanations, no markdown, no text outside JSON.
- The array must contain exactly 6 recipe objects.
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

    const text = await generateGeminiText(prompt);

    let parsedJson;
    try {
      parsedJson = parseJsonArrayFromModel(text);
    } catch (parseError) {
      console.error("Budget JSON Parse Error:", parseError.message);
      return res.status(200).json({
        recipes: buildFallbackBudgetRecipes(budget, meal, userPreference),
        fallback: true,
      });
    }

    const recipes = Array.isArray(parsedJson) ? parsedJson.slice(0, 6) : [];
    if (recipes.length === 0) {
      return res.status(200).json({
        recipes: buildFallbackBudgetRecipes(budget, meal, userPreference),
        fallback: true,
      });
    }
    return res.status(200).json({ recipes });


  } catch (error) {
    console.error("Budget Recipe Error:", error.message);
    if (isInvalidGeminiKeyError(error)) {
      return res.status(503).json({
        error: "AI service unavailable due to invalid API key. Please update GEMINI_API_KEY in backend/.env.",
        code: "GEMINI_KEY_INVALID",
      });
    }
    if (isRetriableGeminiError(error)) {
      return res.status(200).json({
        recipes: buildFallbackBudgetRecipes(budget, meal, userPreference),
        fallback: true,
      });
    }
    return res.status(500).json({
      error: "Failed to generate recipe",
      details: error.message
    });
  }
};

const normalizeTextInput = (value = "") => String(value || "").trim();

const buildKnowledgeFallback = (mode, payload = {}) => {
  if (mode === "mood") {
    const mood = normalizeTextInput(payload.mood) || "Neutral";
    const details = normalizeTextInput(payload.details);
    return {
      title: `${mood} mood ke liye quick plan`,
      summary: "Simple comfort + balanced nutrition approach rakho.",
      bullets: [
        "Protein + complex carbs combo choose karo for stable energy.",
        "Hydration maintain rakho, especially agar stress ya fatigue ho.",
        details
          ? `Aapke note "${details.slice(0, 90)}" ke basis par mild-spice meals better rahenge.`
          : "Aaj ke mood ke hisaab se easy-to-digest meals par focus rakho.",
      ],
      caution: "Agar mood low 2 hafton se zyada rahe to health expert se consult karo.",
    };
  }

  if (mode === "science") {
    const query = normalizeTextInput(payload.query) || "food combo";
    return {
      title: `${query} ka science snapshot`,
      verdict: "Neutral",
      summary: "Yeh combo person-to-person vary kar sakta hai; portion aur timing important hote hain.",
      bullets: [
        "Gut tolerance individual hoti hai, isliye small quantity se start karo.",
        "Heavy oil + sugar combo ko frequent mat karo.",
        "Protein/fiber add karke glycemic response better kiya ja sakta hai.",
      ],
    };
  }

  if (mode === "combo") {
    const combo = normalizeTextInput(payload.combo) || "unknown combo";
    return {
      title: `${combo} avoid guidance`,
      risk: "Digestive discomfort ka chance badh sakta hai.",
      betterOption: "Same meal ko lighter portion aur better timing ke saath lo.",
      why: "Rapid digestion + slow digestion foods ek saath kabhi-kabhi heaviness create karte hain.",
    };
  }

  const goal = normalizeTextInput(payload.goal) || "general wellness";
  return {
    title: `${goal} ke liye practical health guidance`,
    summary: "Consistency sabse important hai: balanced plate + daily movement.",
    bullets: [
      "Har meal me protein source rakho (dal, paneer, eggs, chana).",
      "Refined sugar ko daily habit na banao; fiber-rich snacks choose karo.",
      "7-8 ghante sleep aur hydration ko priority do.",
    ],
    caution: "Agar medical condition hai to personalized doctor advice follow karo.",
  };
};

export const aiKnowledgeGuide = async (req, res) => {
  const mode = normalizeTextInput(req.body?.mode).toLowerCase();
  const mood = normalizeTextInput(req.body?.mood);
  const details = normalizeTextInput(req.body?.details);
  const query = normalizeTextInput(req.body?.query);
  const combo = normalizeTextInput(req.body?.combo);
  const goal = normalizeTextInput(req.body?.goal);
  const height = Number(req.body?.height);
  const weight = Number(req.body?.weight);
  const age = Number(req.body?.age);

  if (!["mood", "science", "combo", "health"].includes(mode)) {
    return res.status(400).json({ error: "Invalid mode. Use mood/science/combo/health." });
  }

  try {
    const prompt = `
You are a practical nutrition and food knowledge assistant for GlobalBites.
Mode: ${mode}

User input:
- mood: ${mood || "N/A"}
- details: ${details || "N/A"}
- scienceQuery: ${query || "N/A"}
- comboQuery: ${combo || "N/A"}
- healthGoal: ${goal || "N/A"}
- heightCm: ${Number.isFinite(height) ? height : "N/A"}
- weightKg: ${Number.isFinite(weight) ? weight : "N/A"}
- age: ${Number.isFinite(age) ? age : "N/A"}

Output rules:
- Respond only in valid JSON object.
- Keep language simple Hinglish (clear, friendly, short).
- Be practical, avoid over-claiming medical cures.
- If request is unsafe/medical-high-risk, include caution and suggest doctor.

JSON schema by mode:
1) mood:
{
  "title": "string",
  "summary": "string",
  "bullets": ["string", "string", "string"],
  "caution": "string"
}
2) science:
{
  "title": "string",
  "verdict": "Healthy|Avoid|Neutral",
  "summary": "string",
  "bullets": ["string", "string", "string"]
}
3) combo:
{
  "title": "string",
  "risk": "string",
  "betterOption": "string",
  "why": "string"
}
4) health:
{
  "title": "string",
  "summary": "string",
  "bullets": ["string", "string", "string"],
  "caution": "string"
}
`;

    const text = await generateGeminiText(prompt, { timeoutMs: SEARCH_AI_TIMEOUT_MS });
    const parsed = parseJsonFromModel(text);

    return res.status(200).json({
      mode,
      result: parsed,
    });
  } catch (error) {
    console.error("Knowledge AI Error:", error.message);
    if (isInvalidGeminiKeyError(error)) {
      return res.status(503).json({
        error: "AI service unavailable due to invalid API key. Please update GEMINI_API_KEY in backend/.env.",
        code: "GEMINI_KEY_INVALID",
      });
    }

    return res.status(200).json({
      mode,
      result: buildKnowledgeFallback(mode, {
        mood,
        details,
        query,
        combo,
        goal,
      }),
      fallback: true,
    });
  }
};
