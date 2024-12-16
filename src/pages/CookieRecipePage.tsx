// Components
import { Helmet } from 'react-helmet-async';
import RecipeTemplate from '../templates/RecipeTemplate';

// Types
import RecipeData, { NutritionData } from '../types/RecipeTypes';

const COOKIE_PREP_TIME = "15 minutes";
const COOKIE_COOK_TIME = "10-12 minutes";
const COOKIE_YIELD = "24 cookies";

// Add recipe data
const baseRecipes: { [key: string]: { ingredients: string[], instructions: string[] } } = {
    "Classic": {
        ingredients: [
            "2¼ cups all-purpose flour",
            "1 cup unsalted butter, softened",
            "¾ cup granulated sugar",
            "¾ cup brown sugar",
            "2 large eggs",
            "1 tsp vanilla extract",
            "1 tsp baking soda",
            "½ tsp salt"
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
    "Cocoa": {
        ingredients: [
            "2 cups all-purpose flour",
            "⅔ cup unsweetened cocoa powder",
            "1 cup unsalted butter, softened",
            "1 cup granulated sugar",
            "½ cup brown sugar",
            "2 large eggs",
            "2 tsp vanilla extract",
            "1 tsp baking soda",
            "½ tsp salt"
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
    "Oat": {
        ingredients: [
            "1½ cups all-purpose flour",
            "3 cups old-fashioned oats",
            "1 cup unsalted butter, softened",
            "¾ cup granulated sugar",
            "¾ cup brown sugar",
            "2 large eggs",
            "1 tsp vanilla extract",
            "1 tsp baking soda",
            "1 tsp ground cinnamon",
            "½ tsp salt"
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
    "Peanut Butter": {
        ingredients: [
            "2 cups all-purpose flour",
            "1 cup creamy peanut butter",
            "1 cup unsalted butter, softened",
            "1 cup granulated sugar",
            "1 cup brown sugar",
            "2 large eggs",
            "2½ tsp vanilla extract",
            "1 tsp baking soda",
            "½ tsp salt"
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
    "Red Velvet": {
        ingredients: [
            "2¾ cups all-purpose flour",
            "¼ cup unsweetened cocoa powder",
            "1 cup unsalted butter, softened",
            "1½ cups granulated sugar",
            "2 large eggs",
            "2 tbsp red food coloring",
            "1 tsp vanilla extract",
            "1 tsp baking soda",
            "½ tsp salt",
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
    "Classic": {
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
    "Cocoa": {
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
    "Oat": {
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
    "Peanut Butter": {
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
    "Red Velvet": {
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
    "chocolate chips": {
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
    "white chocolate": {
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
    "m&ms": {
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
    "Classic": [
        "For softer cookies, reduce baking time by 1-2 minutes",
        "Chill dough for 24 hours for enhanced flavor",
        "Room temperature eggs work best"
    ],
    "Cocoa": [
        "Don't overbake - cookies will set as they cool",
        "Use Dutch-processed cocoa for richer flavor",
        "Add a pinch of espresso powder to enhance chocolate flavor"
    ],
    "Oat": [
        "Quick oats can be used but will give a different texture",
        "Toast oats beforehand for nuttier flavor",
        "Let dough rest 30 minutes for softer cookies"
    ],
    "Peanut Butter": [
        "Natural peanut butter may affect texture",
        "Crunchy peanut butter adds nice texture",
        "Don't overmix after adding flour"
    ],
    "Red Velvet": [
        "Gel food coloring works better than liquid",
        "Don't skip the buttermilk - it's key for texture",
        "Add white chocolate chips for classic flavor"
    ]
};

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

export default function CookieRecipePage() {
    const searchParams = new URLSearchParams(window.location.search);

    const base = searchParams.get('base') || "Classic";
    const mixins = (searchParams.get('mixins') || "").split(',').filter(Boolean);

    const recipeTitle = `${base} Cookie Recipe${mixins.length > 0
        ? ` with ${mixins.length > 1 ? mixins.slice(0, -1).join(', ') + ' and ' + mixins.slice(-1) : mixins[0]}`
        : ''}`;

    const baseRecipe = baseRecipes[base] || baseRecipes["Classic"];
    const mixinIngredients = mixins.map(mixin => {
        const amount = mixins.length > 0 ? 1.5 / mixins.length : 0;
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
        prepTime: COOKIE_PREP_TIME,
        cookTime: COOKIE_COOK_TIME,
        recipeYield: COOKIE_YIELD,
        previewFolder: "cookies",
        previewItems: [base, ...mixins],
        ingredients: [...baseRecipe.ingredients, ...mixinIngredients],
        instructions: baseRecipe.instructions,
        notes: recipeNotes[base] || recipeNotes["Classic"],
        nutritionData: calculateTotalNutrition(base, mixins) as NutritionData
    };

    const metaDescription = "Delicious cookie recipe. Complete with ingredients, instructions, and nutritional information.";

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
                <meta name="keywords" content={`cookie recipe, ${base.toLowerCase()} cookies, ${mixins.join(', ').toLowerCase()}, baking, dessert, homemade cookies`} />
            </Helmet>

            <RecipeTemplate recipe={recipeData} />
        </>
    );
}
