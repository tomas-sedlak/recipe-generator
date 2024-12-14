import { useState } from 'react';
import { CheckIcon, Clock8Icon, ClockIcon, DownloadIcon, LinkIcon, UtensilsIcon } from 'lucide-react';
import { generateRecipePDF } from '../utils/generateRecipePDF';
import { Helmet } from 'react-helmet-async';
import Preview from '../components/common/Preview';
import Button from '../components/common/Button';

// Add these constants at the top with baseRecipes
const COOKIE_PREP_TIME = "15 minutes";
const COOKIE_COOK_TIME = "10-12 minutes";
const COOKIE_YIELD = "24 cookies";

// Add recipe data
const baseRecipes = {
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

const baseNutrition = {
    "Classic": {
        calories: 483,
        fat: 23,
        saturatedFat: 13,
        cholesterol: 81,
        sodium: 355,
        carbohydrates: 65,
        fiber: 3,
        sugar: 39,
        protein: 6
    },
    "Cocoa": {
        calories: 516,
        fat: 26,
        saturatedFat: 16,
        cholesterol: 81,
        sodium: 371,
        carbohydrates: 71,
        fiber: 6,
        sugar: 42,
        protein: 10
    },
    "Oat": {
        calories: 548,
        fat: 23,
        saturatedFat: 13,
        cholesterol: 81,
        sodium: 339,
        carbohydrates: 81,
        fiber: 6,
        sugar: 35,
        protein: 10
    },
    "Peanut Butter": {
        calories: 581,
        fat: 35,
        saturatedFat: 16,
        cholesterol: 81,
        sodium: 403,
        carbohydrates: 61,
        fiber: 3,
        sugar: 42,
        protein: 16
    },
    "Red Velvet": {
        calories: 532,
        fat: 26,
        saturatedFat: 16,
        cholesterol: 97,
        sodium: 387,
        carbohydrates: 74,
        fiber: 3,
        sugar: 45,
        protein: 6
    }
};

const mixinNutrition = {
    "chocolate chips": {
        calories: 545,
        fat: 31,
        saturatedFat: 19,
        cholesterol: 0,
        sodium: 24,
        carbohydrates: 63,
        fiber: 4,
        sugar: 57,
        protein: 6
    },
    "white chocolate": {
        calories: 549,
        fat: 32,
        saturatedFat: 20,
        cholesterol: 21,
        sodium: 90,
        carbohydrates: 59,
        fiber: 0,
        sugar: 59,
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
        calories: 479,
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
        fat: 0,
        saturatedFat: 0,
        cholesterol: 0,
        sodium: 37,
        carbohydrates: 96,
        fiber: 0,
        sugar: 93,
        protein: 0
    }
};

// Add this function to calculate combined nutrition values
const calculateTotalNutrition = (base: string, mixins: string[]) => {
    const baseNutritionValues = baseNutrition[base] || baseNutrition["Classic"];

    if (mixins.length === 0) return baseNutritionValues;

    // Calculate the proportion for base and mixins
    const baseRatio = 0.8; // Base is 80% of the recipe
    const mixinRatio = 0.2 / mixins.length; // Remaining 20% split between mixins

    // Start with base values multiplied by ratio
    const totalNutrition = Object.entries(baseNutritionValues).reduce((acc, [key, value]) => {
        acc[key] = value * baseRatio;
        return acc;
    }, {});

    // Add mixin values
    mixins.forEach(mixin => {
        if (mixinNutrition[mixin]) {
            Object.entries(mixinNutrition[mixin]).forEach(([key, value]) => {
                totalNutrition[key] += value * mixinRatio;
            });
        }
    });

    // Round all values
    Object.keys(totalNutrition).forEach(key => {
        totalNutrition[key] = Math.round(totalNutrition[key]);
    });

    return totalNutrition;
};

// Add recipe notes after baseRecipes
const recipeNotes = {
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
        // Format the fraction nicely
        const fraction = amount === 0.5 ? "½"
            : amount === 0.75 ? "¾"
                : amount === 0.25 ? "¼"
                    : amount === 1.5 ? "1½"
                        : amount.toString();
        return `${fraction} cup ${mixin}`;
    });

    const [showTooltip, setShowTooltip] = useState(false);

    // Add state for checked ingredients
    const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

    const toggleIngredient = (ingredient: string) => {
        const newChecked = new Set(checkedIngredients);
        if (newChecked.has(ingredient)) {
            newChecked.delete(ingredient);
        } else {
            newChecked.add(ingredient);
        }
        setCheckedIngredients(newChecked);
    };

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (isDownloading) return;
        
        setIsDownloading(true);
        const instructions = [...baseRecipe.instructions];
        if (mixins.length > 0) {
            instructions.push(`Fold in ${mixins.length > 1
                ? mixins.slice(0, -1).join(', ') + ' and ' + mixins.slice(-1)
                : mixins[0]} until evenly distributed`);
        }

        const recipeData = {
            title: recipeTitle,
            ingredients: [...baseRecipe.ingredients, ...mixinIngredients],
            instructions,
            nutritionData: calculateTotalNutrition(base, mixins),
            baseType: base,
            mixins: mixins,
            prepTime: COOKIE_PREP_TIME,
            cookTime: COOKIE_COOK_TIME,
            yield: COOKIE_YIELD
        };

        const doc = await generateRecipePDF(recipeData);
        doc.save(`${recipeTitle.toLowerCase().replace(/ /g, '_')}.pdf`);
        setIsDownloading(false);
    };

    const handleShare = async () => {
        try {
            if (showTooltip) return;
            await navigator.clipboard.writeText(window.location.href);
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000);
        } catch (err) {
            alert('Failed to copy URL to clipboard');
        }
    };

    const nutritionData = calculateTotalNutrition(base, mixins);

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

            <div className="max-w-screen-lg mx-auto p-4 flex flex-col md:grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">
                            {recipeTitle}
                        </h1>

                        <div className="mt-2 flex flex-wrap flex-col md:flex-row gap-x-4 gap-y-2 mb-6 text-gray-600">
                            <div className="flex items-center gap-2">
                                <ClockIcon className="w-5 h-5" />
                                <p><span className="text-gray-900 font-semibold">Prep Time:</span> {COOKIE_PREP_TIME}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock8Icon className="w-5 h-5" />
                                <p><span className="text-gray-900 font-semibold">Cook Time:</span> {COOKIE_COOK_TIME}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <UtensilsIcon className="w-5 h-5" />
                                <p><span className="text-gray-900 font-semibold">Yield:</span> {COOKIE_YIELD}</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                            <Button onClick={handleDownload} loading={isDownloading}>
                                <DownloadIcon className="w-5 h-5" />
                                Download PDF
                            </Button>

                            <div className="relative">
                                <Button variant="secondary" onClick={handleShare} className="w-full">
                                    <LinkIcon className="w-5 h-5" />
                                    Copy Link
                                </Button>
                                {showTooltip && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap">
                                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                                        Link copied!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="md:hidden mb-6">
                        <Preview folder="cookies" items={[base, ...mixins]} />
                    </div>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                        <ul className="list-none space-y-2">
                            {baseRecipe.ingredients.map((ingredient, index) => (
                                <li key={`base-${index}`} className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleIngredient(ingredient)}
                                        className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center
                                        ${checkedIngredients.has(ingredient)
                                                ? 'bg-purple-500 border-purple-500 text-white'
                                                : 'border-gray-300'}`}
                                    >
                                        {checkedIngredients.has(ingredient) && <CheckIcon className="w-4 h-4" />}
                                    </button>
                                    <span
                                        className={`${checkedIngredients.has(ingredient) && 'line-through text-gray-500'} cursor-pointer`}
                                        onClick={() => toggleIngredient(ingredient)}
                                    >
                                        {ingredient}
                                    </span>
                                </li>
                            ))}
                            {mixinIngredients.map((ingredient, index) => (
                                <li key={`mixin-${index}`} className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleIngredient(ingredient)}
                                        className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center
                                        ${checkedIngredients.has(ingredient)
                                                ? 'bg-purple-500 border-purple-500 text-white'
                                                : 'border-gray-300'}`}
                                    >
                                        {checkedIngredients.has(ingredient) && <CheckIcon className="w-4 h-4" />}
                                    </button>
                                    <span
                                        className={`${checkedIngredients.has(ingredient) && 'line-through text-gray-500'} cursor-pointer`}
                                        onClick={() => toggleIngredient(ingredient)}
                                    >
                                        {ingredient}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                        <ol className="list-none space-y-4">
                            {baseRecipe.instructions.map((instruction, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-semibold">
                                        {index + 1}
                                    </div>
                                    <span>{instruction}</span>
                                </li>
                            ))}
                            {mixins.length > 0 && (
                                <li className="flex items-start gap-2">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-semibold">
                                        {baseRecipe.instructions.length + 1}
                                    </div>
                                    <span>
                                        Fold in {mixins.length > 1
                                            ? mixins.slice(0, -1).join(', ') + ' and ' + mixins.slice(-1)
                                            : mixins[0]} until evenly distributed
                                    </span>
                                </li>
                            )}
                        </ol>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Recipe Notes</h2>
                        <ul className="list-disc list-outside pl-4 space-y-2">
                            {recipeNotes[base]?.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Nutrition Per 100g</h2>
                        <table className="sm:max-w-[320px] w-full border rounded-lg">
                            <tbody>
                                <tr className="border-b even:bg-gray-100 odd:bg-white">
                                    <td className="font-medium py-1 px-2">Calories:</td>
                                    <td className="text-right px-2 py-1">{nutritionData.calories} kcal</td>
                                </tr>
                                <tr className="border-b even:bg-gray-100 odd:bg-white">
                                    <td className="font-medium py-1 px-2">Total Fat:</td>
                                    <td className="text-right px-2 py-1">{nutritionData.fat}g</td>
                                </tr>
                                <tr className="border-b even:bg-gray-100 odd:bg-white">
                                    <td className="font-medium py-1 px-2">Saturated Fat:</td>
                                    <td className="text-right px-2 py-1">{nutritionData.saturatedFat}g</td>
                                </tr>
                                <tr className="border-b even:bg-gray-100 odd:bg-white">
                                    <td className="font-medium py-1 px-2">Cholesterol:</td>
                                    <td className="text-right px-2 py-1">{nutritionData.cholesterol}mg</td>
                                </tr>
                                <tr className="border-b even:bg-gray-100 odd:bg-white">
                                    <td className="font-medium py-1 px-2">Sodium:</td>
                                    <td className="text-right px-2 py-1">{nutritionData.sodium}mg</td>
                                </tr>
                                <tr className="border-b even:bg-gray-100 odd:bg-white">
                                    <td className="font-medium py-1 px-2">Total Carbohydrates:</td>
                                    <td className="text-right px-2 py-1">{nutritionData.carbohydrates}g</td>
                                </tr>
                                <tr className="border-b even:bg-gray-100 odd:bg-white">
                                    <td className="font-medium py-1 px-2">Dietary Fiber:</td>
                                    <td className="text-right px-2 py-1">{nutritionData.fiber}g</td>
                                </tr>
                                <tr className="border-b even:bg-gray-100 odd:bg-white">
                                    <td className="font-medium py-1 px-2">Sugars:</td>
                                    <td className="text-right px-2 py-1">{nutritionData.sugar}g</td>
                                </tr>
                                <tr className="border-b even:bg-gray-100 odd:bg-white">
                                    <td className="font-medium py-1 px-2">Protein:</td>
                                    <td className="text-right px-2 py-1">{nutritionData.protein}g</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-gray-500 text-sm mt-2">Nutrition information is automatically calculated, so should only be used as an approximation.</p>
                    </section>
                </div>

                <div className="hidden md:block md:col-span-1 sticky top-20 h-fit">
                    <Preview folder="cookies" items={[base, ...mixins]} />
                </div>
            </div>
        </>
    );
}
