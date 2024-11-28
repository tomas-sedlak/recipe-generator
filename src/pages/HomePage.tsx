import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function HomePage() {
    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">Generate baking recipes with interactive visualization</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Create your dream cookie! Choose your dough, mix-ins, and toppings. Get a personalized recipe to bake at home!</p>

            <div className="mt-6 text-center">
                <Button>
                    <Link to="/generate">
                        Start
                    </Link>
                </Button>
            </div>
        </div>
    )
}
