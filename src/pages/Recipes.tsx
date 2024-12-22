import { useParams } from 'react-router-dom';
import RecipeTemplate from '../templates/RecipeTemplate'
import { getRecipeData } from '../utils/cookies'
import { getRecipeType } from '../utils/utils';

export default function Recipes() {
    const { slug } = useParams();
    const recipeType = getRecipeType(slug);
    

    switch (recipeType) {
        case "cookie":
            const recipeData = getRecipeData(slug);
            return <RecipeTemplate recipe={recipeData} />
        default:
            return <div>Recipe not found</div>
    }
}
