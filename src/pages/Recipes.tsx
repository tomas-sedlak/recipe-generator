import { useParams } from 'react-router-dom';
import RecipeTemplate from '../templates/RecipeTemplate'
import { getRecipeData as getCookieRecipeData } from '../data/cookies'
import { getRecipeData as getMuffinRecipeData } from '../data/muffins';
import NotFoundPage from './NotFoundPage';

export default function Recipes() {
    const { slug }: { slug: string } = useParams();

    let recipeData;
    if (slug.includes("cookie")) {
        recipeData = getCookieRecipeData(slug);
    } else if (slug.includes("muffin")) {
        recipeData = getMuffinRecipeData(slug);
    } else {
        return <NotFoundPage />
    }

    return (
        <RecipeTemplate recipe={recipeData} />
    )
}
