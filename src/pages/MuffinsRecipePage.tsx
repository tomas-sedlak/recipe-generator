// Components
import { Helmet } from 'react-helmet-async';
import RecipeTemplate from '../templates/RecipeTemplate';

// Types
import RecipeData, { NutritionData } from '../types/RecipeTypes';

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
        calories: 180,
        fat: 7,
        saturatedFat: 1,
        cholesterol: 35,
        sodium: 200,
        carbohydrates: 26,
        fiber: 1,
        sugar: 8,
        protein: 4
    },
    "Cocoa": {
        calories: 200,
        fat: 9,
        saturatedFat: 1,
        cholesterol: 35,
        sodium: 200,
        carbohydrates: 28,
        fiber: 2,
        sugar: 12,
        protein: 4
    },
    "Banana": {
        calories: 190,
        fat: 7,
        saturatedFat: 1,
        cholesterol: 35,
        sodium: 190,
        carbohydrates: 30,
        fiber: 2,
        sugar: 14,
        protein: 4
    },
    "Carrot": {
        calories: 185,
        fat: 7,
        saturatedFat: 1,
        cholesterol: 35,
        sodium: 200,
        carbohydrates: 27,
        fiber: 2,
        sugar: 10,
        protein: 4
    },
    "Pumpkin": {
        calories: 195,
        fat: 8,
        saturatedFat: 1,
        cholesterol: 35,
        sodium: 200,
        carbohydrates: 28,
        fiber: 2,
        sugar: 11,
        protein: 4
    }
};

const mixinNutrition: { [key: string]: NutritionData } = {
    "Chocolate Chunks": {
        calories: 120,
        fat: 7,
        saturatedFat: 4,
        cholesterol: 0,
        sodium: 10,
        carbohydrates: 15,
        fiber: 1,
        sugar: 13,
        protein: 1
    },
    "Nuts": {
        calories: 160,
        fat: 14,
        saturatedFat: 1,
        cholesterol: 0,
        sodium: 0,
        carbohydrates: 6,
        fiber: 3,
        sugar: 1,
        protein: 6
    },
    "Blueberries": {
        calories: 40,
        fat: 0,
        saturatedFat: 0,
        cholesterol: 0,
        sodium: 0,
        carbohydrates: 10,
        fiber: 2,
        sugar: 7,
        protein: 1
    },
    "Candy": {
        calories: 140,
        fat: 5,
        saturatedFat: 3,
        cholesterol: 0,
        sodium: 20,
        carbohydrates: 22,
        fiber: 0,
        sugar: 20,
        protein: 1
    },
    "Mini Marshmallows": {
        calories: 100,
        fat: 0,
        saturatedFat: 0,
        cholesterol: 0,
        sodium: 25,
        carbohydrates: 24,
        fiber: 0,
        sugar: 22,
        protein: 1
    }
};

const frostingNutrition: { [key: string]: NutritionData } = {
    "Vanilla": {
        calories: 120,
        fat: 6,
        saturatedFat: 4,
        cholesterol: 15,
        sodium: 50,
        carbohydrates: 16,
        fiber: 0,
        sugar: 15,
        protein: 0
    },
    "Chocolate": {
        calories: 130,
        fat: 6,
        saturatedFat: 4,
        cholesterol: 15,
        sodium: 50,
        carbohydrates: 18,
        fiber: 1,
        sugar: 16,
        protein: 1
    },
    "Caramel": {
        calories: 125,
        fat: 5,
        saturatedFat: 3,
        cholesterol: 15,
        sodium: 60,
        carbohydrates: 19,
        fiber: 0,
        sugar: 18,
        protein: 0
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

    const recipeTitle = `${base} Muffin Recipe${mixins.length > 0
        ? ` with ${mixins.length > 1 ? mixins.slice(0, -1).join(', ') + ' and ' + mixins.slice(-1) : mixins[0]}`
        : ''}${frosting ? ` and ${frosting} Frosting` : ''}`;

    const baseRecipe = baseRecipes[base] || baseRecipes["Classic"];
    const mixinIngredients = mixins.map(mixin => {
        const amount = mixins.length > 0 ? 1 / mixins.length : 0;
        const fraction = amount === 0.5 ? "½"
            : amount === 0.75 ? "¾"
            : amount === 0.25 ? "¼"
            : amount === 1.5 ? "1½"
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
        instructions: baseRecipe.instructions,
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
