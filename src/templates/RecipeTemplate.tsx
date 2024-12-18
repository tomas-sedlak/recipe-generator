// React
import { useState } from 'react';

// Icons
import { CheckIcon, Clock8Icon, ClockIcon, DownloadIcon, LinkIcon, UtensilsIcon, AlertCircleIcon } from 'lucide-react';

// Utils
import { generateRecipePDF } from '../utils/generateRecipePDF';

// Components
import { Link } from 'react-router-dom';
import Preview from '../components/common/Preview';
import Button from '../components/common/Button';

// Types
import RecipeData from '../types/RecipeTypes';

export default function RecipeTemplate({ recipe }: { recipe: RecipeData }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);

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

        const doc = await generateRecipePDF(recipe);
        doc.save(`${recipe.title.toLowerCase().replace(/ /g, '_')}.pdf`);

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

    return (
        <div className="max-w-screen-lg w-full mx-auto p-4 flex flex-col md:grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">
                        {recipe.title}
                    </h1>

                    <div className="mt-2 flex flex-wrap flex-col md:flex-row gap-x-4 gap-y-2 mb-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <ClockIcon className="w-5 h-5" />
                            <p><span className="text-gray-900 font-semibold">Prep Time:</span> {recipe.prepTime}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock8Icon className="w-5 h-5" />
                            <p><span className="text-gray-900 font-semibold">Cook Time:</span> {recipe.cookTime}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <UtensilsIcon className="w-5 h-5" />
                            <p><span className="text-gray-900 font-semibold">Yield:</span> {recipe.recipeYield}</p>
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
                    <Preview folder={recipe.previewFolder} items={recipe.previewItems} />
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p>{recipe.description}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                    <ul className="list-none space-y-2">
                        {recipe.ingredients.map((ingredient) => (
                            <li key={ingredient} className="flex items-center gap-2">
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
                        {recipe.instructions.map((instruction, index) => (
                            <li key={instruction} className="flex items-start gap-2">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-semibold">
                                    {index + 1}
                                </div>
                                <span>{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </section>

                {recipe.notes && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Recipe Notes</h2>
                        <ul className="list-disc list-outside pl-4 space-y-2">
                            {recipe.notes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ul>
                    </section>
                )}

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Nutrition Per 100g</h2>
                    <table className="sm:max-w-[320px] w-full border rounded-lg">
                        <tbody>
                            <tr className="border-b even:bg-gray-100 odd:bg-white">
                                <td className="font-medium py-1 px-2">Calories:</td>
                                <td className="text-right px-2 py-1">{recipe.nutritionData.calories} kcal</td>
                            </tr>
                            <tr className="border-b even:bg-gray-100 odd:bg-white">
                                <td className="font-medium py-1 px-2">Total Fat:</td>
                                <td className="text-right px-2 py-1">{recipe.nutritionData.fat}g</td>
                            </tr>
                            <tr className="border-b even:bg-gray-100 odd:bg-white">
                                <td className="font-medium py-1 px-2">Saturated Fat:</td>
                                <td className="text-right px-2 py-1">{recipe.nutritionData.saturatedFat}g</td>
                            </tr>
                            <tr className="border-b even:bg-gray-100 odd:bg-white">
                                <td className="font-medium py-1 px-2">Cholesterol:</td>
                                <td className="text-right px-2 py-1">{recipe.nutritionData.cholesterol}mg</td>
                            </tr>
                            <tr className="border-b even:bg-gray-100 odd:bg-white">
                                <td className="font-medium py-1 px-2">Sodium:</td>
                                <td className="text-right px-2 py-1">{recipe.nutritionData.sodium}mg</td>
                            </tr>
                            <tr className="border-b even:bg-gray-100 odd:bg-white">
                                <td className="font-medium py-1 px-2">Total Carbohydrates:</td>
                                <td className="text-right px-2 py-1">{recipe.nutritionData.carbohydrates}g</td>
                            </tr>
                            <tr className="border-b even:bg-gray-100 odd:bg-white">
                                <td className="font-medium py-1 px-2">Dietary Fiber:</td>
                                <td className="text-right px-2 py-1">{recipe.nutritionData.fiber}g</td>
                            </tr>
                            <tr className="border-b even:bg-gray-100 odd:bg-white">
                                <td className="font-medium py-1 px-2">Sugars:</td>
                                <td className="text-right px-2 py-1">{recipe.nutritionData.sugar}g</td>
                            </tr>
                            <tr className="border-b even:bg-gray-100 odd:bg-white">
                                <td className="font-medium py-1 px-2">Protein:</td>
                                <td className="text-right px-2 py-1">{recipe.nutritionData.protein}g</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-gray-500 text-sm mt-2">Nutrition information is automatically calculated, so should only be used as an approximation.</p>
                </section>

                {(recipe.bakingTips || recipe.storageInfo) && (
                    <section className="bg-gray-100 px-6 py-4 rounded-2xl mb-12">
                        {recipe.bakingTips && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-4">Baking Tips</h2>
                                <ul className="list-disc list-outside pl-4 space-y-2">
                                    {recipe.bakingTips.map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {recipe.storageInfo && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-4">Storage Information</h2>
                                <ul className="list-disc list-outside pl-4 space-y-2">
                                    {recipe.storageInfo.map((info, index) => (
                                        <li key={index}>{info}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                )}

                <section className="mb-8">
                    <div className="flex justify-center">
                        <Button variant="secondary" onClick={() => setShowReportModal(true)}>
                            <AlertCircleIcon className="w-5 h-5" />
                            Report a Mistake
                        </Button>
                    </div>
                </section>
            </div>

            <div className="hidden md:block md:col-span-1 sticky top-20 h-fit">
                <Preview folder={recipe.previewFolder} items={recipe.previewItems} />
            </div>

            {showReportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowReportModal(false)}>
                    <div className="bg-white rounded-2xl px-6 py-4 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-bold mb-4">Report a Mistake</h2>
                        <p className="mb-4">
                            Thank you for helping improve our recipes. Please send any corrections to:
                        </p>
                        <Link
                            to="mailto:mixyourtreat@gmail.com"
                            target="_blank"
                            className="text-purple-500 hover:text-purple-600 underline"
                        >
                            mixyourtreat@gmail.com
                        </Link>
                        <div className="mt-6 flex justify-end">
                            <Button
                                variant="secondary"
                                onClick={() => setShowReportModal(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
