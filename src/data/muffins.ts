import RecipeData, { NutritionData } from "../types/RecipeTypes";
import { formatArray, getRecipeName } from "../utils/utils";

// Base Items with dynamic image paths
const baseItems: string[] = ["classic", "cocoa", "banana", "carrot", "pumpkin"];

// Mixin Items with dynamic image paths
const mixinItems: string[] = ["chocolate-chunks", "nuts", "blueberries", "candy", "mini-marshmallows"].sort();

// Frosting Items with dynamic image paths
const frostingItems: string[] = ["vanilla", "chocolate", "caramel"].sort();

const generateSlug = (base: string, mixins: string[], frosting: string) => {
    return `${base}-muffin${(frosting || mixins.length > 0) ? '-with-' : ''}${frosting ? `${frosting}-frosting-` : ''}${mixins.length > 0 ? `${mixins.sort().join('-')}` : ''}`;
}

const decodeSlug = (slug: string) => {
    // Handle undefined or empty slug
    if (!slug) {
        return { base: baseItems[0], mixins: [], frosting: "" };
    }

    // Remove "-muffin" suffix first
    const withoutMuffin = slug.replace('-muffin', '');

    // Split into base and frosting mixins parts
    const [base, rest] = withoutMuffin.split('-with-');

    // If there are no mixins, return early
    if (!rest) {
        return { base, mixins: [], frosting: "" };
    }

    if (rest.includes('-frosting-')) {
        const [frosting, mixinsString] = rest.split('-frosting-');

        let mixins: string[] = [];

        mixinItems.map((mixin) => {
            if (mixinsString.includes(mixin)) {
                mixins.push(mixin);
            }
        })

        return { base, mixins, frosting };
    } else {
        let mixins: string[] = [];

        mixinItems.map((mixin) => {
            if (rest.includes(mixin)) {
                mixins.push(mixin);
            }
        })

        return { base, mixins, frosting: "" };
    }
}

const generateTitle = (base: string, mixins: string[], frosting: string) => {
    return `${getRecipeName(base)} Muffin Recipe${(mixins.length > 0 || frosting) ? ` with ${formatArray([frosting + " Frosting", ...mixins])}` : ''}`;
}

const MUFFIN_PREP_TIME = "20 minutes";
const MUFFIN_COOK_TIME = "20-25 minutes";
const MUFFIN_YIELD = "12 muffins";

// Add recipe data
const baseRecipes: { [key: string]: { ingredients: string[], instructions: string[] } } = {
    "classic": {
        ingredients: [
            "2 cups all-purpose flour",
            "1/2 cup granulated sugar",
            "2 tsp baking powder",
            "1/2 tsp salt",
            "1 cup milk",
            "1/3 cup vegetable oil",
            "2 large eggs",
            "1 tsp vanilla extract"
        ],
        instructions: [
            "Preheat oven to 375°F (190°C)",
            "Line a 12-cup muffin tin with paper liners",
            "In a large bowl, whisk together flour, sugar, baking powder, and salt",
            "In another bowl, whisk together milk, oil, eggs, and vanilla",
            "Stir wet ingredients into dry ingredients until just combined",
            "Fill muffin cups 2/3 full",
            "Bake for 20-25 minutes or until golden brown"
        ]
    },
    "cocoa": {
        ingredients: [
            "2 cups all-purpose flour",
            "1/2 cup cocoa powder",
            "3/4 cup granulated sugar",
            "2 tsp baking powder",
            "1/2 tsp salt",
            "1 cup milk",
            "1/2 cup vegetable oil",
            "2 large eggs",
            "1 tsp vanilla extract"
        ],
        instructions: [
            "Preheat oven to 375°F (190°C)",
            "Line a 12-cup muffin tin with paper liners",
            "Whisk together flour, cocoa powder, sugar, baking powder, and salt",
            "In another bowl, whisk together milk, oil, eggs, and vanilla",
            "Combine wet and dry ingredients until just mixed",
            "Fill muffin cups 2/3 full",
            "Bake for 20-25 minutes until a toothpick comes out clean"
        ]
    },
    "banana": {
        ingredients: [
            "2 cups all-purpose flour",
            "1/2 cup granulated sugar",
            "2 tsp baking powder",
            "1/2 tsp salt",
            "3 ripe bananas, mashed",
            "1/3 cup vegetable oil",
            "2 large eggs",
            "1/4 cup milk",
            "1 tsp vanilla extract"
        ],
        instructions: [
            "Preheat oven to 375°F (190°C)",
            "Line a 12-cup muffin tin with paper liners",
            "Mix flour, sugar, baking powder, and salt",
            "In another bowl, mash bananas and mix with oil, eggs, milk, and vanilla",
            "Fold wet ingredients into dry ingredients",
            "Fill muffin cups 2/3 full",
            "Bake for 20-25 minutes until golden"
        ]
    },
    "carrot": {
        ingredients: [
            "2 cups all-purpose flour",
            "2/3 cup granulated sugar",
            "2 tsp baking powder",
            "1 tsp cinnamon",
            "1/2 tsp salt",
            "2 cups grated carrots",
            "1/3 cup vegetable oil",
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
            "Fill muffin cups 2/3 full",
            "Bake for 20-25 minutes until done"
        ]
    },
    "pumpkin": {
        ingredients: [
            "2 cups all-purpose flour",
            "3/4 cup granulated sugar",
            "2 tsp baking powder",
            "1 tsp pumpkin pie spice",
            "1/2 tsp salt",
            "1 cup pumpkin puree",
            "1/2 cup vegetable oil",
            "2 large eggs",
            "1/4 cup milk",
            "1 tsp vanilla extract"
        ],
        instructions: [
            "Preheat oven to 375°F (190°C)",
            "Line a 12-cup muffin tin with paper liners",
            "Whisk together flour, sugar, baking powder, pumpkin spice, and salt",
            "In another bowl, combine pumpkin, oil, eggs, milk, and vanilla",
            "Mix wet ingredients into dry ingredients until just combined",
            "Fill muffin cups 2/3 full",
            "Bake for 20-25 minutes until done"
        ]
    }
};

const baseNutrition: { [key: string]: NutritionData } = {
    "classic": {
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
    "cocoa": {
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
    "banana": {
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
    "carrot": {
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
    "pumpkin": {
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
    "chocolate-chunks": {
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
    "nuts": {
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
    "blueberries": {
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
    "candy": {
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
    "mini-marshmallows": {
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
    "vanilla": {
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
    "chocolate": {
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
    "caramel": {
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
    "classic": [
        "Don't overmix the batter - some lumps are okay",
        "Room temperature ingredients work best",
        "Fill muffin cups 2/3 full for perfect domes"
    ],
    "cocoa": [
        "Use high-quality cocoa powder for best results",
        "Add a pinch of espresso powder to enhance chocolate flavor",
        "Don't overbake to keep muffins moist"
    ],
    "banana": [
        "Use very ripe bananas for best flavor",
        "Mash bananas completely for even distribution",
        "Can substitute Greek yogurt for oil for healthier version"
    ],
    "carrot": [
        "Finely grate carrots for best texture",
        "Can add raisins for extra sweetness",
        "Store in airtight container up to 3 days"
    ],
    "pumpkin": [
        "Use pure pumpkin puree, not pie filling",
        "Can increase spices to taste",
        "Excellent with cream cheese frosting"
    ]
};

// Add these new constants after the existing recipe data
const MUFFIN_DESCRIPTIONS: { [key: string]: string } = {
    "classic": "Light and fluffy classic muffins with a tender crumb and golden top. These versatile muffins are perfect for breakfast or as a snack any time of day.",
    "cocoa": "Rich chocolate muffins that are moist and decadent. A chocolate lover's breakfast dream with deep cocoa flavor in every bite.",
    "banana": "Moist and flavorful banana muffins made with perfectly ripe bananas. A delicious way to use overripe bananas for a breakfast treat.",
    "carrot": "Wholesome carrot muffins packed with freshly grated carrots and warm spices. A nutritious breakfast option that tastes like a treat.",
    "pumpkin": "Perfectly spiced pumpkin muffins with a soft, tender crumb. These seasonal favorites are wonderful during fall but delicious year-round."
};

const BAKING_TIPS = [
    "Use room temperature ingredients for the best texture",
    "Don't overmix the batter - some lumps are normal",
    "Fill muffin cups 2/3 full for perfect domes",
    "Test doneness with a toothpick in the center",
    "Let muffins cool in the pan for 5 minutes before removing",
    "Use paper liners for easy cleanup and storage"
];

const STORAGE_INFO = [
    "Up to 3 days in an airtight container at room temperature",
    "Up to 3 months when properly wrapped and stored in a freezer-safe container",
    "For best results, warm slightly before serving frozen muffins"
];

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

const getRecipeData = (slug: string) => {
    const { base, mixins, frosting } = decodeSlug(slug);

    const recipeData: RecipeData = {
        title: generateTitle(base, mixins, frosting),
        prepTime: MUFFIN_PREP_TIME,
        cookTime: MUFFIN_COOK_TIME,
        recipeYield: MUFFIN_YIELD,
        previewFolder: "muffins",
        description: MUFFIN_DESCRIPTIONS[base],
        previewItems: [base, frosting, ...mixins],
        ingredients: baseRecipes[base].ingredients,
        instructions: baseRecipes[base].instructions,
        notes: recipeNotes[base],
        nutritionData: calculateTotalNutrition(base, mixins, frosting),
        bakingTips: BAKING_TIPS,
        storageInfo: STORAGE_INFO,
    };

    return recipeData;
}

export { baseItems, mixinItems, frostingItems, generateSlug, decodeSlug, generateTitle, getRecipeData };