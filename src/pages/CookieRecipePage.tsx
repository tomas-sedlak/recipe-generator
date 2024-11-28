import { useEffect, useState } from 'react';
import ArrowBack from '../components/ArrowBack';
import Preview from '../components/Preview';
import Button from '../components/Button';
import { DownloadIcon, ShareIcon } from 'lucide-react';

export default function CookieRecipePage() {
    const searchParams = new URLSearchParams(window.location.search);
    const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(new Set());

    const base = searchParams.get('base') || "";
    const mixins = (searchParams.get('mixins') || "").split(',').filter(Boolean);
    const quantity = parseInt(searchParams.get('quantity') || "30");

    const recipeTitle = `${base} Cookie Recipe${mixins.length > 0
        ? ` with ${mixins.length > 1 ? mixins.slice(0, -1).join(', ') + ' and ' + mixins.slice(-1) : mixins[0]}`
        : ''}`;

    const generateBaseIngredients = (quantity: number) => {
        const conversions = {
            flour: 120,
            butter: 227,
            sugar: 200,
            brownSugar: 220,
        };

        const base = {
            flour: 2.5 * quantity / 30,
            butter: 1 * quantity / 30,
            sugar: 0.75 * quantity / 30,
            brownSugar: 0.75 * quantity / 30,
            eggs: Math.ceil(2 * quantity / 30),
            vanilla: 1 * quantity / 30,
            bakingSoda: 1 * quantity / 30,
            salt: 0.5 * quantity / 30,
        };

        return Object.entries(base).reduce((acc, [ingredient, amount]) => ({
            ...acc,
            [ingredient]: `${amount.toFixed(2)} g`
        }), {});
    };

    const getBaseModifications = () => {
        switch (base) {
            case 'Cocoa':
                return {
                    cocoa: `${(0.75 * quantity / 30).toFixed(2)} cups`,
                    note: "Reduce flour by 1/4 cup to account for cocoa powder"
                };
            case 'Oat':
                return {
                    oats: `${(1 * quantity / 30).toFixed(2)} cups`,
                    note: "Reduce flour by 1/2 cup to account for oats"
                };
            default:
                return {};
        }
    };

    const getMixinQuantities = () => {
        const totalMixins = mixins.length;
        if (totalMixins === 0) return {};

        // 1.5 cups total mixins for 30 cookies, divided among chosen mixins
        const cupsPerMixin = (1.5 / totalMixins * quantity / 30).toFixed(2);
        return mixins.reduce((acc, mixin) => ({
            ...acc,
            [mixin]: `${cupsPerMixin} cups`
        }), {});
    };

    const baseIngredients = generateBaseIngredients(quantity);
    const baseModifications = getBaseModifications();
    const mixinQuantities = getMixinQuantities();

    const handleDownload = () => {
        let content = `${recipeTitle}\n`;
        content += `Makes ${quantity} cookies\n\n`;

        // Add ingredients
        content += "INGREDIENTS:\n";
        Object.entries(baseIngredients).forEach(([ingredient, amount]) => {
            content += `- ${amount} ${ingredient.replace(/([A-Z])/g, ' $1').toLowerCase()}\n`;
        });
        Object.entries(baseModifications).forEach(([ingredient, amount]) => {
            if (ingredient !== 'note') {
                content += `- ${amount} ${ingredient}\n`;
            }
        });
        Object.entries(mixinQuantities).forEach(([ingredient, amount]) => {
            content += `- ${amount} ${ingredient}\n`;
        });
        if (baseModifications.note) {
            content += `Note: ${baseModifications.note}\n`;
        }

        // Add instructions
        content += "\nINSTRUCTIONS:\n";
        content += "1. Preheat oven to 375°F (190°C)\n";
        content += "2. Cream together butter, sugar, and brown sugar until smooth\n";
        content += "3. Beat in eggs one at a time, then stir in vanilla\n";
        content += `4. Combine flour, baking soda, and salt${base === 'Cocoa' ? ', cocoa powder' : ''}\n`;
        content += "5. Gradually blend dry mixture into the wet ingredients\n";
        if (base === 'Oat') {
            content += "6. Stir in oats until well combined\n";
        }
        if (mixins.length > 0) {
            content += `${base === 'Oat' ? '7' : '6'}. Fold in ${mixins.join(', ')}\n`;
        }
        content += `${base === 'Oat' || mixins.length > 0 ? '8' : '6'}. Drop rounded tablespoons onto ungreased baking sheets\n`;
        content += `${base === 'Oat' || mixins.length > 0 ? '9' : '7'}. Bake for 10 to 12 minutes or until edges are lightly browned\n`;
        content += `${base === 'Oat' || mixins.length > 0 ? '10' : '8'}. Let stand on baking sheet for 2 minutes before removing to cool on wire racks\n`;

        // Create and download file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${base.toLowerCase()}_cookie_recipe.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-screen-lg mx-auto px-4 py-8 flex flex-col md:grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <div className="mb-8">
                    <ArrowBack />

                    <h1 className="text-4xl font-bold mb-4">
                        {recipeTitle}
                    </h1>

                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={handleDownload}>
                            <DownloadIcon className="w-5 h-5" />
                            Download Recipe
                        </Button>

                        <Button variant="secondary" onClick={handleDownload}>
                            <ShareIcon className="w-5 h-5" />
                            Share
                        </Button>
                    </div>
                </div>

                <div className="md:hidden">
                    <Preview folder="cookies" items={[base, ...mixins]} />
                </div>

                <section className="mb-4">
                    <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
                    <ul className="space-y-2">
                        {Object.entries(baseIngredients).map(([ingredient, amount]) => (
                            <li key={ingredient} className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    className="mt-1"
                                    checked={checkedIngredients.has(ingredient)}
                                    onChange={(e) => {
                                        const newChecked = new Set(checkedIngredients);
                                        e.target.checked ? newChecked.add(ingredient) : newChecked.delete(ingredient);
                                        setCheckedIngredients(newChecked);
                                    }}
                                />
                                <span className={checkedIngredients.has(ingredient) ? 'line-through' : ''}>
                                    {amount} {ingredient.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </span>
                            </li>
                        ))}
                        {Object.entries(baseModifications).map(([ingredient, amount]) => (
                            ingredient !== 'note' && (
                                <li key={ingredient} className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="mt-1"
                                        checked={checkedIngredients.has(ingredient)}
                                        onChange={(e) => {
                                            const newChecked = new Set(checkedIngredients);
                                            e.target.checked ? newChecked.add(ingredient) : newChecked.delete(ingredient);
                                            setCheckedIngredients(newChecked);
                                        }}
                                    />
                                    <span className={checkedIngredients.has(ingredient) ? 'line-through' : ''}>
                                        {amount} {ingredient}
                                    </span>
                                </li>
                            )
                        ))}
                        {Object.entries(mixinQuantities).map(([ingredient, amount]) => (
                            <li key={ingredient} className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    className="mt-1"
                                    checked={checkedIngredients.has(ingredient)}
                                    onChange={(e) => {
                                        const newChecked = new Set(checkedIngredients);
                                        e.target.checked ? newChecked.add(ingredient) : newChecked.delete(ingredient);
                                        setCheckedIngredients(newChecked);
                                    }}
                                />
                                <span className={checkedIngredients.has(ingredient) ? 'line-through' : ''}>
                                    {amount} {ingredient}
                                </span>
                            </li>
                        ))}
                    </ul>
                    {baseModifications.note && (
                        <p className="mt-4 text-gray-600 italic">{baseModifications.note}</p>
                    )}
                </section>

                <section className="mb-4">
                    <div className="w-full h-64 bg-gray-200"></div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>Preheat oven to 375°F (190°C)</li>
                        <li>Cream together butter, sugar, and brown sugar until smooth</li>
                        <li>Beat in eggs one at a time, then stir in vanilla</li>
                        <li>Combine flour, baking soda, and salt{base === 'Cocoa' && ', cocoa powder'}</li>
                        <li>Gradually blend dry mixture into the wet ingredients</li>
                        {base === 'Oat' && <li>Stir in oats until well combined</li>}
                        {mixins.length > 0 && <li>Fold in {mixins.join(', ')}</li>}
                        <li>Drop rounded tablespoons onto ungreased baking sheets</li>
                        <li>Bake for 10 to 12 minutes or until edges are lightly browned</li>
                        <li>Let stand on baking sheet for 2 minutes before removing to cool on wire racks</li>
                    </ol>
                </section>
            </div>

            <div className="hidden md:block md:col-span-1 sticky top-20 h-fit">
                <Preview folder="cookies" items={[base, ...mixins]} />
            </div>
        </div>
    );
}
