import RecipeData, { NutritionData } from "../types/RecipeTypes";
import { formatArray, getRecipeName } from "../utils/utils";

// Base Items with dynamic image paths
const baseItems: string[] = ["classic", "cocoa", "oat", "peanut-butter", "red-velvet"]

// Mixin Items with dynamic image paths
const mixinItems: string[] = ["chocolate-chips", "nuts", "raisins", "dried-fruits", "candy", "mini-marshmallows", "sprinkles"].sort()

const generateSlug = (base: string, mixins: string[]) => {
  return `${base}-cookie${mixins.length > 0 ? `-with-${mixins.sort().join('-')}` : ''}`;
}

const decodeSlug = (slug: string) => {
  // Handle undefined or empty slug
  if (!slug) {
    return { base: baseItems[0], mixins: [] };
  }

  // Remove "-cookies" suffix first
  const withoutCookies = slug.replace('-cookie', '');

  // Split into base and mixins parts
  const [base, ...rest] = withoutCookies.split('-with-');

  // If there are no mixins, return early
  if (rest.length === 0) {
    return { base, mixins: [] };
  }

  const mixinsString = rest[0];
  const mixins: string[] = [];
  let remainingString = mixinsString;

  // Iteratively find valid mixins from the string
  while (remainingString.length > 0) {
    const foundMixin = mixinItems.find(item => remainingString.startsWith(item));
    if (!foundMixin) break;

    mixins.push(foundMixin);
    remainingString = remainingString.slice(foundMixin.length + 1); // +1 for the hyphen
  }

  return { base, mixins };
}

const generateTitle = (base: string, mixins: string[]) => {
  return `${getRecipeName(base)} Cookie Recipe${mixins.length > 0 ? ` with ${formatArray(mixins)}` : ''}`;
}

const COOKIE_PREP_TIME = "15 minutes";
const COOKIE_COOK_TIME = "10-12 minutes";
const COOKIE_YIELD = "24 cookies";

// Add recipe data
const baseRecipes: { [key: string]: { ingredients: string[], instructions: string[] } } = {
  "classic": {
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 cup unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "1 tsp vanilla extract",
      "1 tsp baking soda",
      "1/2 tsp salt"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Cream together butter and sugars until light and fluffy",
      "Beat in eggs one at a time, then stir in vanilla",
      "Combine flour, baking soda, and salt; gradually blend into the butter mixture",
      "Drop rounded tablespoons of dough onto ungreased baking sheets",
      "Bake for 10 to 12 minutes or until golden brown"
    ]
  },
  "cocoa": {
    ingredients: [
      "2 cups all-purpose flour",
      "2/3 cup unsweetened cocoa powder",
      "1 cup unsalted butter, softened",
      "1 cup granulated sugar",
      "1/2 cup brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "1 tsp baking soda",
      "1/2 tsp salt"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C)",
      "Whisk together flour, cocoa powder, baking soda, and salt",
      "Cream together butter and sugars until light and fluffy",
      "Beat in eggs one at a time, then stir in vanilla",
      "Gradually blend dry ingredients into the butter mixture",
      "Drop rounded tablespoons of dough onto ungreased baking sheets",
      "Bake for 9 to 11 minutes until edges are set"
    ]
  },
  "oat": {
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "3 cups old-fashioned oats",
      "1 cup unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "1 tsp vanilla extract",
      "1 tsp baking soda",
      "1 tsp ground cinnamon",
      "1/2 tsp salt"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C)",
      "Cream together butter and sugars until light and fluffy",
      "Beat in eggs one at a time, then stir in vanilla",
      "Combine flour, oats, baking soda, cinnamon, and salt",
      "Gradually blend dry ingredients into the butter mixture",
      "Drop rounded tablespoons of dough onto ungreased baking sheets",
      "Bake for 10 to 12 minutes until edges are lightly browned"
    ]
  },
  "peanut-butter": {
    ingredients: [
      "2 cups all-purpose flour",
      "1 cup creamy peanut butter",
      "1 cup unsalted butter, softened",
      "1 cup granulated sugar",
      "1 cup brown sugar",
      "2 large eggs",
      "2 1/2 tsp vanilla extract",
      "1 tsp baking soda",
      "1/2 tsp salt"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C)",
      "Cream together butter, peanut butter, and sugars until light and fluffy",
      "Beat in eggs one at a time, then stir in vanilla",
      "Combine flour, baking soda, and salt",
      "Gradually blend dry ingredients into the peanut butter mixture",
      "Drop rounded tablespoons of dough onto ungreased baking sheets",
      "Bake for 10 to 12 minutes until edges are lightly browned"
    ]
  },
  "red-velvet": {
    ingredients: [
      "2 3/4 cups all-purpose flour",
      "1/4 cup unsweetened cocoa powder",
      "1 cup unsalted butter, softened",
      "1 1/2 cups granulated sugar",
      "2 large eggs",
      "2 tbsp red food coloring",
      "1 tsp vanilla extract",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "1 cup buttermilk"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Whisk together flour, cocoa powder, baking soda, and salt",
      "Cream together butter and sugar until light and fluffy",
      "Beat in eggs one at a time",
      "Mix in red food coloring and vanilla extract",
      "Alternately add dry ingredients and buttermilk to the butter mixture",
      "Drop rounded tablespoons of dough onto ungreased baking sheets",
      "Bake for 9 to 11 minutes until edges are set"
    ]
  }
};

const baseNutrition: { [key: string]: NutritionData } = {
  "classic": {
    calories: 470,
    fat: 22,
    saturatedFat: 12,
    cholesterol: 62,
    sodium: 310,
    carbohydrates: 64,
    fiber: 2,
    sugar: 35,
    protein: 6
  },
  "cocoa": {
    calories: 466,
    fat: 21,
    saturatedFat: 12,
    cholesterol: 62,
    sodium: 320,
    carbohydrates: 65,
    fiber: 4,
    sugar: 37,
    protein: 7
  },
  "oat": {
    calories: 450,
    fat: 19,
    saturatedFat: 10,
    cholesterol: 62,
    sodium: 300,
    carbohydrates: 66,
    fiber: 5,
    sugar: 32,
    protein: 8
  },
  "peanut-butter": {
    calories: 490,
    fat: 27,
    saturatedFat: 12,
    cholesterol: 62,
    sodium: 340,
    carbohydrates: 57,
    fiber: 3,
    sugar: 33,
    protein: 11
  },
  "red-velvet": {
    calories: 465,
    fat: 22,
    saturatedFat: 12,
    cholesterol: 65,
    sodium: 330,
    carbohydrates: 63,
    fiber: 2,
    sugar: 38,
    protein: 6
  }
};

const mixinNutrition: { [key: string]: NutritionData } = {
  "chocolate-chips": {
    calories: 545,
    fat: 31,
    saturatedFat: 19,
    cholesterol: 3,
    sodium: 24,
    carbohydrates: 63,
    fiber: 4,
    sugar: 57,
    protein: 6
  },
  "white-chocolate": {
    calories: 550,
    fat: 32,
    saturatedFat: 20,
    cholesterol: 21,
    sodium: 90,
    carbohydrates: 59,
    fiber: 0,
    sugar: 58,
    protein: 6
  },
  "nuts": {
    calories: 607,
    fat: 54,
    saturatedFat: 4,
    cholesterol: 0,
    sodium: 1,
    carbohydrates: 24,
    fiber: 11,
    sugar: 6,
    protein: 21
  },
  "candy": {
    calories: 485,
    fat: 20,
    saturatedFat: 12,
    cholesterol: 5,
    sodium: 79,
    carbohydrates: 71,
    fiber: 2,
    sugar: 63,
    protein: 4
  },
  "sprinkles": {
    calories: 389,
    fat: 3,
    saturatedFat: 2,
    cholesterol: 0,
    sodium: 37,
    carbohydrates: 89,
    fiber: 0,
    sugar: 85,
    protein: 0
  }
};

// Add recipe notes after baseRecipes
const recipeNotes: { [key: string]: string[] } = {
  "classic": [
    "For softer cookies, reduce baking time by 1-2 minutes",
    "Chill dough for 24 hours for enhanced flavor",
    "Room temperature eggs work best"
  ],
  "cocoa": [
    "Don't overbake - cookies will set as they cool",
    "Use Dutch-processed cocoa for richer flavor",
    "Add a pinch of espresso powder to enhance chocolate flavor"
  ],
  "oat": [
    "Quick oats can be used but will give a different texture",
    "Toast oats beforehand for nuttier flavor",
    "Let dough rest 30 minutes for softer cookies"
  ],
  "peanut-butter": [
    "Natural peanut butter may affect texture",
    "Crunchy peanut butter adds nice texture",
    "Don't overmix after adding flour"
  ],
  "red-velvet": [
    "Gel food coloring works better than liquid",
    "Don't skip the buttermilk - it's key for texture",
    "Add white chocolate chips for classic flavor"
  ]
};

// Add these new constants
const COOKIE_DESCRIPTIONS: { [key: string]: string } = {
  "classic": "Our classic chocolate chip cookies are soft, chewy, and perfectly golden brown. Made with high-quality butter and vanilla, these timeless favorites strike the perfect balance between crispy edges and gooey centers.",
  "cocoa": "Rich, decadent chocolate cookies that satisfy even the most intense chocolate cravings. Double the chocolate flavor makes these cookies a chocolate lover's dream come true.",
  "oat": "Hearty and wholesome oatmeal cookies with a perfect blend of warming spices. These cookies offer a satisfying chewy texture and nostalgic homemade taste.",
  "peanut-butter": "Irresistibly nutty and rich peanut butter cookies that melt in your mouth. Each bite delivers the perfect combination of sweet and salty flavors.",
  "red-velvet": "Stunning red velvet cookies with a subtle cocoa flavor and beautiful crimson color. These eye-catching treats are perfect for special occasions or when you want to impress."
};

const BAKING_TIPS = [
  "Always use room temperature ingredients for the best results",
  "Measure flour correctly by spooning it into measuring cups and leveling off",
  "Use parchment paper or silicone baking mats for easy cleanup",
  "Rotate baking sheets halfway through baking for even results",
  "Let cookies cool on the baking sheet for 5 minutes before transferring",
  "Store cookies in an airtight container to maintain freshness"
];

const STORAGE_INFO = [
  "Up to 5 days in an airtight container at room temperature",
  "Up to 3 months when properly wrapped and stored in a freezer-safe container",
  "Raw cookie dough can be refrigerated for up to 3 days or frozen for up to 3 months"
];

function calculateTotalNutrition(base: string, mixins: string[]): NutritionData {
  // Get base nutrition
  const baseNutritionValues = baseNutrition[base] || baseNutrition["Classic"];

  // If no mixins, return base nutrition
  if (!mixins.length) return baseNutritionValues;

  // Calculate mixin portion (1.5 cups total divided by number of mixins)
  const mixinPortion = 1.5 / mixins.length;

  // Start with base nutrition values
  const totalNutrition = { ...baseNutritionValues };

  // Add nutrition from each mixin
  mixins.forEach(mixin => {
    if (mixinNutrition[mixin]) {
      const mixinValues = mixinNutrition[mixin];
      // Add proportional nutrition values from each mixin
      Object.keys(mixinValues).forEach(key => {
        totalNutrition[key as keyof NutritionData] +=
          Math.round((mixinValues[key as keyof NutritionData] * mixinPortion));
      });
    }
  });

  // Round all values to nearest integer
  Object.keys(totalNutrition).forEach(key => {
    totalNutrition[key as keyof NutritionData] =
      Math.round(totalNutrition[key as keyof NutritionData]);
  });

  return totalNutrition;
}

const getRecipeData = (slug: string) => {
  const { base, mixins } = decodeSlug(slug);
  const recipeTitle = generateTitle(base, mixins);
  const baseRecipe = baseRecipes[base];
  const mixinIngredients = mixins.map(mixin => `${1.5 / mixins.length} cup ${mixin}`);

  const recipeData: RecipeData = {
    title: recipeTitle,
    prepTime: COOKIE_PREP_TIME,
    cookTime: COOKIE_COOK_TIME,
    recipeYield: COOKIE_YIELD,
    previewFolder: "cookies",
    description: COOKIE_DESCRIPTIONS[base],
    previewItems: [base, ...mixins],
    ingredients: [...baseRecipe.ingredients, ...mixinIngredients],
    instructions: [
      ...baseRecipe.instructions.slice(0, -2), // Remove last two steps
      ...(mixins.length > 0 ? [`Fold in ${formatArray(mixins)}`] : []),
      ...baseRecipe.instructions.slice(-2) // Add back last two steps
    ],
    notes: recipeNotes[base],
    nutritionData: calculateTotalNutrition(base, mixins),
    bakingTips: BAKING_TIPS,
    storageInfo: STORAGE_INFO,
  };

  return recipeData;
};

export { baseItems, mixinItems, generateSlug, decodeSlug, generateTitle, getRecipeData };