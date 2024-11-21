import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">🍪 Cookies recipe generator</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Create your dream cookie! Choose your dough, mix-ins, and toppings. Get a personalized recipe to bake at home!</p>

            <div className="mt-6 text-center">
                <Link to="/generate" className="bg-green-600 rounded-lg" aria-label="Generate Recipe">
                    <span className="block text-white text-lg font-semibold bg-green-500 rounded-lg px-5 py-2.5 translate-y-[-4px] active:translate-y-0 transition-transform">
                        Start
                    </span>
                </Link>
            </div>
        </div>
    )
}
