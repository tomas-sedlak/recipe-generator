import { useParams } from 'react-router-dom';
import RecipeTemplate from '../templates/RecipeTemplate'
import { getRecipeData } from '../utils/cookies'
import { getRecipeType } from '../utils/utils';
import NotFoundPage from './NotFoundPage';

export default function Recipes() {
    const { slug }: { slug: string } = useParams();
    const recipeType = getRecipeType(slug);

    let recipeData;
    switch (recipeType) {
        case "cookie":
            recipeData = getRecipeData(slug);
            break;
        case "muffin":
            recipeData = getRecipeData(slug);
            break;
        default:
            return <NotFoundPage />
    }

    return (
        <RecipeTemplate recipe={recipeData} />
    )
}
