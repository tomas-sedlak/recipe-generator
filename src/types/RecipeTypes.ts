interface RecipeData {
    title: string;
    prepTime: string;
    cookTime: string;
    recipeYield: string;
    previewFolder: string;
    previewItems: string[];
    ingredients: string[];
    instructions: string[];
    notes?: string[];
    nutritionData: NutritionData;
}

interface NutritionData {
    calories: number;
    fat: number;
    saturatedFat: number;
    cholesterol: number;
    sodium: number;
    carbohydrates: number;
    fiber: number;
    sugar: number;
    protein: number;
}

export default RecipeData;
export type { NutritionData };
