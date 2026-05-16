import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface FoodIdentification {
  food_name: string;
  category: 'produce' | 'meat' | 'seafood' | 'dairy' | 'packaged' | 'grain' | 'nut' | 'legume' | 'egg' | 'other';
  is_whole_food: boolean;
  estimated_nutrition_per_100g: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g: number;
    sugar_g: number;
    sodium_mg: number;
  };
  quality_observations: string;
  confidence: number;
  search_key: string;
}

const FOOD_VISION_PROMPT = `You are a world-class food scientist and nutritionist. Analyze this food image carefully.

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "food_name": "precise food name (e.g., 'Hass Avocado', 'Atlantic Salmon Fillet', 'Broccoli')",
  "category": "one of: produce | meat | seafood | dairy | packaged | grain | nut | legume | egg | other",
  "is_whole_food": true or false,
  "estimated_nutrition_per_100g": {
    "calories": number,
    "protein_g": number,
    "carbs_g": number,
    "fat_g": number,
    "fiber_g": number,
    "sugar_g": number,
    "sodium_mg": number
  },
  "quality_observations": "1-2 sentence note on freshness, ripeness, or visible quality indicators",
  "confidence": number between 0.0 and 1.0,
  "search_key": "simple lowercase word for database lookup (e.g., 'avocado', 'salmon', 'broccoli')"
}

Use accurate USDA nutritional values for the identified food. Be precise.`;

export async function identifyFoodFromImage(imageBase64: string): Promise<FoodIdentification> {
  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: imageBase64,
            },
          },
          { type: 'text', text: FOOD_VISION_PROMPT },
        ],
      },
    ],
  });

  const text = response.content[0];
  if (text.type !== 'text') throw new Error('Unexpected Claude response type');

  const cleaned = text.text.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(cleaned) as FoodIdentification;
}

export interface RecipeSuggestion {
  name: string;
  description: string;
  ingredients: Array<{ item: string; amount: string }>;
  steps: string[];
  macros: { calories: number; protein_g: number; carbs_g: number; fat_g: number };
  prep_time_min: number;
  cook_time_min: number;
  health_grade: string;
  warrior_rating: string;
}

export async function generateRecipes(
  pantryItems: string[],
  macroGoals: { calories: number; protein: number; carbs: number; fat: number },
): Promise<RecipeSuggestion[]> {
  const prompt = `You are an elite sports nutritionist and chef. Create 3 high-performance meal recipes using ONLY these available ingredients: ${pantryItems.join(', ')}.

Macro targets per meal: ~${Math.round(macroGoals.calories / 3)} calories, ~${Math.round(macroGoals.protein / 3)}g protein.

Warrior King Nutrition Rules:
- Prioritize high protein (minimum 30g per meal)
- Anti-inflammatory (no seed oils — use olive oil, avocado oil, butter, or ghee)
- Minimal processing, whole ingredients only
- Easy to digest

Return ONLY a valid JSON array of 3 recipe objects with this structure:
[{
  "name": "recipe name",
  "description": "one sentence",
  "ingredients": [{"item": "ingredient", "amount": "amount with unit"}],
  "steps": ["step 1", "step 2", "step 3"],
  "macros": {"calories": number, "protein_g": number, "carbs_g": number, "fat_g": number},
  "prep_time_min": number,
  "cook_time_min": number,
  "health_grade": "S|A|B|C|D|F",
  "warrior_rating": "one phrase like 'Pre-Workout Fuel' or 'Recovery Meal' or 'Lean Gains'"
}]`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0];
  if (text.type !== 'text') throw new Error('Unexpected Claude response');

  const cleaned = text.text.replace(/```json\n?|\n?```/g, '').trim();
  return JSON.parse(cleaned) as RecipeSuggestion[];
}
