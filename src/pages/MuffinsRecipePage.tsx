// Components
import { Helmet } from 'react-helmet-async';
import RecipeTemplate from '../templates/RecipeTemplate';

// Types
import RecipeData, { NutritionData } from '../types/RecipeTypes';
import { formatArray } from '../utils/formatArray';

const MUFFIN_PREP_TIME = "20 minutes";
const MUFFIN_COOK_TIME = "20-25 minutes";
const MUFFIN_YIELD = "12 muffins";

// Add recipe data
const baseRecipes: { [key: string]: { ingredients: string[], instructions: string[] } } = {
  "Classic": {
    ingredients: [
      "2 cups all-purpose flour",
      "½ cup granulated sugar",
      "2 tsp baking powder",
      "½ tsp salt",
      "1 cup milk",
      "⅓ cup vegetable oil",
      "2 large eggs",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Line a 12-cup muffin tin with paper liners",
      "In a large bowl, whisk together flour, sugar, baking powder, and salt",
      "In another bowl, whisk together milk, oil, eggs, and vanilla",
      "Stir wet ingredients into dry ingredients until just combined",
      "Fill muffin cups ⅔ full",
      "Bake for 20-25 minutes or until golden brown"
    ]
  },
  "Cocoa": {
    ingredients: [
      "2 cups all-purpose flour",
      "½ cup cocoa powder",
      "¾ cup granulated sugar",
      "2 tsp baking powder",
      "½ tsp salt",
      "1 cup milk",
      "½ cup vegetable oil",
      "2 large eggs",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Line a 12-cup muffin tin with paper liners",
      "Whisk together flour, cocoa powder, sugar, baking powder, and salt",
      "In another bowl, whisk together milk, oil, eggs, and vanilla",
      "Combine wet and dry ingredients until just mixed",
      "Fill muffin cups ⅔ full",
      "Bake for 20-25 minutes until a toothpick comes out clean"
    ]
  },
  "Banana": {
    ingredients: [
      "2 cups all-purpose flour",
      "½ cup granulated sugar",
      "2 tsp baking powder",
      "½ tsp salt",
      "3 ripe bananas, mashed",
      "⅓ cup vegetable oil",
      "2 large eggs",
      "¼ cup milk",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Line a 12-cup muffin tin with paper liners",
      "Mix flour, sugar, baking powder, and salt",
      "In another bowl, mash bananas and mix with oil, eggs, milk, and vanilla",
      "Fold wet ingredients into dry ingredients",
      "Fill muffin cups ⅔ full",
      "Bake for 20-25 minutes until golden"
    ]
  },
  "Carrot": {
    ingredients: [
      "2 cups all-purpose flour",
      "⅔ cup granulated sugar",
      "2 tsp baking powder",
      "1 tsp cinnamon",
      "½ tsp salt",
      "2 cups grated carrots",
      "⅓ cup vegetable oil",
      "2 large eggs",
      "1 cup milk",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Line a 12-cup muffin tin with paper liners",
      "Combine flour, sugar, baking powder, cinnamon, and salt",
      "Mix in grated carrots",
      "Whisk together oil, eggs, milk, and vanilla",
      "Stir wet ingredients into carrot mixture",
      "Fill muffin cups ⅔ full",
      "Bake for 20-25 minutes until done"
    ]
  },
  "Pumpkin": {
    ingredients: [
      "2 cups all-purpose flour",
      "¾ cup granulated sugar",
      "2 tsp baking powder",
      "1 tsp pumpkin pie spice",
      "½ tsp salt",
      "1 cup pumpkin puree",
      "½ cup vegetable oil",
      "2 large eggs",
      "¼ cup milk",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Line a 12-cup muffin tin with paper liners",
      "Whisk together flour, sugar, baking powder, pumpkin spice, and salt",
      "In another bowl, combine pumpkin, oil, eggs, milk, and vanilla",
      "Mix wet ingredients into dry ingredients until just combined",
      "Fill muffin cups ⅔ full",
      "Bake for 20-25 minutes until done"
    ]
  }
};

const baseNutrition: { [key: string]: NutritionData } = {
  "Classic": {
    calories: 340,
    fat: 14,
    saturatedFat: 2,
    cholesterol: 45,
    sodium: 400,
    carbohydrates: 50,
    fiber: 2,
    sugar: 20,
    protein: 6
  },
  "Cocoa": {
    calories: 360,
    fat: 16,
    saturatedFat: 3,
    cholesterol: 45,
    sodium: 400,
    carbohydrates: 52,
    fiber: 4,
    sugar: 25,
    protein: 7
  },
  "Banana": {
    calories: 350,
    fat: 14,
    saturatedFat: 2,
    cholesterol: 45,
    sodium: 380,
    carbohydrates: 55,
    fiber: 3,
    sugar: 28,
    protein: 6
  },
  "Carrot": {
    calories: 330,
    fat: 13,
    saturatedFat: 2,
    cholesterol: 45,
    sodium: 400,
    carbohydrates: 51,
    fiber: 3,
    sugar: 22,
    protein: 6
  },
  "Pumpkin": {
    calories: 335,
    fat: 15,
    saturatedFat: 2,
    cholesterol: 45,
    sodium: 400,
    carbohydrates: 52,
    fiber: 3,
    sugar: 24,
    protein: 6
  }
};

const mixinNutrition: { [key: string]: NutritionData } = {
  "Chocolate Chunks": {
    calories: 545,
    fat: 31,
    saturatedFat: 19,
    cholesterol: 0,
    sodium: 50,
    carbohydrates: 60,
    fiber: 7,
    sugar: 50,
    protein: 6
  },
  "Nuts": {
    calories: 607,
    fat: 54,
    saturatedFat: 4,
    cholesterol: 0,
    sodium: 0,
    carbohydrates: 24,
    fiber: 12,
    sugar: 4,
    protein: 21
  },
  "Blueberries": {
    calories: 57,
    fat: 0,
    saturatedFat: 0,
    cholesterol: 0,
    sodium: 1,
    carbohydrates: 14,
    fiber: 2,
    sugar: 10,
    protein: 1
  },
  "Candy": {
    calories: 470,
    fat: 17,
    saturatedFat: 10,
    cholesterol: 0,
    sodium: 200,
    carbohydrates: 80,
    fiber: 0,
    sugar: 65,
    protein: 3
  },
  "Mini Marshmallows": {
    calories: 318,
    fat: 0,
    saturatedFat: 0,
    cholesterol: 0,
    sodium: 80,
    carbohydrates: 82,
    fiber: 0,
    sugar: 75,
    protein: 2
  }
};

const frostingNutrition: { [key: string]: NutritionData } = {
  "Vanilla": {
    calories: 400,
    fat: 20,
    saturatedFat: 13,
    cholesterol: 50,
    sodium: 170,
    carbohydrates: 54,
    fiber: 0,
    sugar: 50,
    protein: 1
  },
  "Chocolate": {
    calories: 410,
    fat: 20,
    saturatedFat: 13,
    cholesterol: 50,
    sodium: 170,
    carbohydrates: 58,
    fiber: 3,
    sugar: 52,
    protein: 2
  },
  "Caramel": {
    calories: 415,
    fat: 17,
    saturatedFat: 10,
    cholesterol: 50,
    sodium: 200,
    carbohydrates: 63,
    fiber: 0,
    sugar: 60,
    protein: 1
  }
};

const recipeNotes: { [key: string]: string[] } = {
  "Classic": [
    "Don't overmix the batter - some lumps are okay",
    "Room temperature ingredients work best",
    "Fill muffin cups ⅔ full for perfect domes"
  ],
  "Cocoa": [
    "Use high-quality cocoa powder for best results",
    "Add a pinch of espresso powder to enhance chocolate flavor",
    "Don't overbake to keep muffins moist"
  ],
  "Banana": [
    "Use very ripe bananas for best flavor",
    "Mash bananas completely for even distribution",
    "Can substitute Greek yogurt for oil for healthier version"
  ],
  "Carrot": [
    "Finely grate carrots for best texture",
    "Can add raisins for extra sweetness",
    "Store in airtight container up to 3 days"
  ],
  "Pumpkin": [
    "Use pure pumpkin puree, not pie filling",
    "Can increase spices to taste",
    "Excellent with cream cheese frosting"
  ]
};

function calculateTotalNutrition(base: string, mixins: string[], frosting?: string): NutritionData {
  // Get base nutrition
  const baseNutritionValues = baseNutrition[base] || baseNutrition["Classic"];

  // Start with base nutrition values
  const totalNutrition = { ...baseNutritionValues };

  // Add mixins if present
  if (mixins.length) {
    const mixinPortion = 1 / mixins.length;
    mixins.forEach(mixin => {
      if (mixinNutrition[mixin]) {
        const mixinValues = mixinNutrition[mixin];
        Object.keys(mixinValues).forEach(key => {
          totalNutrition[key as keyof NutritionData] +=
            Math.round((mixinValues[key as keyof NutritionData] * mixinPortion));
        });
      }
    });
  }

  // Add frosting if present
  if (frosting && frostingNutrition[frosting]) {
    const frostingValues = frostingNutrition[frosting];
    Object.keys(frostingValues).forEach(key => {
      totalNutrition[key as keyof NutritionData] +=
        frostingValues[key as keyof NutritionData];
    });
  }

  // Round all values
  Object.keys(totalNutrition).forEach(key => {
    totalNutrition[key as keyof NutritionData] =
      Math.round(totalNutrition[key as keyof NutritionData]);
  });

  return totalNutrition;
}

export default function MuffinsRecipePage() {
  const searchParams = new URLSearchParams(window.location.search);

  const base = searchParams.get('base') || "Classic";
  const mixins = (searchParams.get('mixins') || "").split(',').filter(Boolean);
  const frosting = searchParams.get('frosting') || "";

  const recipeTitle = `${base} Muffin Recipe${mixins.length + frosting.length > 0
    ? ` with ${formatArray([...mixins, frosting + " Frosting"])}`
    : ''}`;

  const baseRecipe = baseRecipes[base] || baseRecipes["Classic"];
  const mixinIngredients = mixins.map(mixin => {
    const amount = mixins.length > 0 ? 1 / mixins.length : 0;
    const fraction = amount === 0.5 ? "½"
      : amount === 0.75 ? "¾"
        : amount === 0.25 ? "¼"
          : amount === 1.5 ? "1½"
            : mixins.length === 3 ? "⅓"
              : amount.toString();
    return `${fraction} cup ${mixin}`;
  });

  // Create the complete recipe data object
  const recipeData: RecipeData = {
    title: recipeTitle,
    prepTime: MUFFIN_PREP_TIME,
    cookTime: MUFFIN_COOK_TIME,
    recipeYield: MUFFIN_YIELD,
    previewFolder: "muffins",
    previewItems: [base, ...(frosting ? [frosting] : []), ...mixins],
    ingredients: [...baseRecipe.ingredients, ...mixinIngredients],
    instructions: [
      ...baseRecipe.instructions.slice(0, -2), // Remove last two instructions
      ...(mixins.length > 0 ? [`Gently fold in ${formatArray(mixins)}`] : []),
      ...baseRecipe.instructions.slice(-2) // Add back last two steps
    ],
    notes: recipeNotes[base] || recipeNotes["Classic"],
    nutritionData: calculateTotalNutrition(base, mixins, frosting)
  };

  const metaDescription = "Delicious muffin recipe. Complete with ingredients, instructions, and nutritional information.";

  return (
    <>
      <Helmet>
        <title>{recipeTitle} - Mix Your Treat</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={`${recipeTitle} - Mix Your Treat`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${recipeTitle} - Mix Your Treat`} />
        <meta name="twitter:description" content={metaDescription} />
        <link rel="canonical" href={window.location.href} />
        <meta name="keywords" content={`muffin recipe, ${base.toLowerCase()} muffins, ${mixins.join(', ').toLowerCase()}, ${frosting.toLowerCase()} frosting, baking, breakfast, homemade muffins`} />
      </Helmet>

      <RecipeTemplate recipe={recipeData} />
    </>
  );
}
