import { useEffect } from 'react';
import Preview from '../components/Preview';
import Button from '../components/Button';
import { DownloadIcon, ShareIcon } from 'lucide-react';
import jsPDF from 'jspdf';

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

export default function CookieRecipePage() {
    const searchParams = new URLSearchParams(window.location.search);

    const base = searchParams.get('base') || "";
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDownload = () => {
        const doc = new jsPDF();
        const lineHeight = 10;
        let yPosition = 20;

        // Add title
        doc.setFontSize(20);
        doc.text(recipeTitle, 20, yPosition);
        yPosition += lineHeight * 2;

        // Add Ingredients section
        doc.setFontSize(16);
        doc.text('Ingredients:', 20, yPosition);
        yPosition += lineHeight;

        // Add ingredients list
        doc.setFontSize(12);
        [...baseRecipe.ingredients, ...mixinIngredients].forEach(ingredient => {
            doc.text(`• ${ingredient}`, 25, yPosition);
            yPosition += lineHeight;
        });
        yPosition += lineHeight;

        // Add Instructions section
        doc.setFontSize(16);
        doc.text('Instructions:', 20, yPosition);
        yPosition += lineHeight;

        // Add instructions list
        doc.setFontSize(12);
        const instructions = [...baseRecipe.instructions];
        if (mixins.length > 0) {
            instructions.push(`Fold in ${mixins.length > 1 
                ? mixins.slice(0, -1).join(', ') + ' and ' + mixins.slice(-1) 
                : mixins[0]} until evenly distributed`);
        }

        instructions.forEach((instruction, index) => {
            // Split long instructions into multiple lines
            const lines = doc.splitTextToSize(`${index + 1}. ${instruction}`, 170);
            lines.forEach(line => {
                doc.text(line, 25, yPosition);
                yPosition += lineHeight;
            });
        });

        // Save the PDF
        doc.save(`${recipeTitle.toLowerCase().replace(/ /g, '_')}.pdf`);
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Recipe URL copied to clipboard!');
        } catch (err) {
            alert('Failed to copy URL to clipboard');
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto px-4 py-8 flex flex-col md:grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-1">
                        {recipeTitle}
                    </h1>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-gray-600">
                        <div>
                            <span className="font-medium">Prep Time:</span> {COOKIE_PREP_TIME}
                        </div>
                        <div className="before:content-['|'] before:mr-4">
                            <span className="font-medium">Cook Time:</span> {COOKIE_COOK_TIME}
                        </div>
                        <div className="before:content-['|'] before:mr-4">
                            <span className="font-medium">Yield:</span> {COOKIE_YIELD}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={handleDownload}>
                            <DownloadIcon className="w-5 h-5" />
                            Download Recipe
                        </Button>

                        <Button variant="secondary" onClick={handleShare}>
                            <ShareIcon className="w-5 h-5" />
                            Share
                        </Button>
                    </div>
                </div>

                <div className="md:hidden mb-6">
                    <Preview folder="cookies" items={[base, ...mixins]} />
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {baseRecipe.ingredients.map((ingredient, index) => (
                            <li key={`base-${index}`}>{ingredient}</li>
                        ))}
                        {mixinIngredients.map((ingredient, index) => (
                            <li key={`mixin-${index}`}>{ingredient}</li>
                        ))}
                    </ul>
                </section>

                <section className="mb-4">
                    <div className="w-full h-64 bg-gray-200"></div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                    <ol className="list-decimal list-inside space-y-4">
                        {baseRecipe.instructions.map((instruction, index) => (
                            <li key={index} className="leading-relaxed">{instruction}</li>
                        ))}
                        {mixins.length > 0 && (
                            <li className="leading-relaxed">
                                Fold in {mixins.length > 1 
                                    ? mixins.slice(0, -1).join(', ') + ' and ' + mixins.slice(-1) 
                                    : mixins[0]} until evenly distributed
                            </li>
                        )}
                    </ol>
                </section>
            </div>

            <div className="hidden md:block md:col-span-1 sticky top-20 h-fit">
                <Preview folder="cookies" items={[base, ...mixins]} />
            </div>
        </div>
    );
}
