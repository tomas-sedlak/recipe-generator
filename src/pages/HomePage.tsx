import { EyeIcon, FileDownIcon, CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

// Base Items with dynamic image paths
const baseItems: string[] = ["Classic", "Cocoa", "Oat", "Peanut Butter", "Red Velvet"]

// Mixin Items with dynamic image paths
const mixinItems: string[] = ["Chocolate Chips", "Nuts", "Raisins", "Dried Fruits", "Candy", "Mini Marshmallows"]

export default function HomePage() {
    const [cookiePreview, setCookiePreview] = useState<string[]>([]);

    const randomCookiePreview = () => {
        const randomBase = baseItems[Math.floor(Math.random() * baseItems.length)];
        const randomMixins = mixinItems.filter(() => Math.random() < 0.5);
        setCookiePreview([randomBase, ...randomMixins]);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            randomCookiePreview();
        }, 2000);

        return () => clearInterval(interval);
    }, [cookiePreview]);

    return (
        <div className="pt-8 pb-12 px-4 mx-auto max-w-screen-lg">
            {/* Hero Section */}
            <div className="text-center mb-16 relative">
                <h1 className="mb-4 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                    Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Perfect Recipe</span>
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
                    Choose ingredients, watch your recipe come to life, and get instant, personalized instructions.
                </p>
                {/* <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                    <Button>
                        <Link to="/generate/cookies">Start with Cookies</Link>
                    </Button>
                    <Button variant="secondary">
                        <Link to="/generate/muffins">Try Muffins</Link>
                    </Button>
                </div> */}
            </div>

            {/* Recipe Cards */}
            <div className="grid md:grid-cols-2 gap-4">
                <Link to="/cookies/generate" className="relative h-48 rounded-xl overflow-hidden group">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundImage: 'url("/images/cookies/cookies.jpg")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-2xl font-bold">Custom Cookies</h3>
                    </div>
                </Link>

                <Link to="/muffins/generate" className="relative h-48 rounded-xl overflow-hidden group">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundImage: 'url("/images/muffins/muffins.jpg")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-2xl font-bold">Custom Muffins</h3>
                    </div>
                </Link>

                {/* <Link to="/cookies/generate" className="bg-gray-200 rounded-xl">
                    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl translate-y-[-4px] active:translate-y-0 transition-transform">
                        <img src="/images/cookies/cookies_bg.png" alt="Custom Muffins" className="aspect-square object-cover rounded-lg w-[40%]" />
                        <h3 className="text-2xl font-semibold">Custom Cookies</h3>
                    </div>
                </Link>

                <Link to="/muffins/generate" className="bg-gray-200 rounded-xl">
                    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl translate-y-[-4px] active:translate-y-0 transition-transform">
                        <img src="/images/muffins/muffins.jpg" alt="Custom Muffins" className="aspect-square object-cover rounded-2xl w-[40%]" />
                        <h3 className="text-2xl font-semibold">Custom muffins</h3>
                    </div>
                </Link> */}
            </div>

            {/* Features Section */}
            <div className="mt-16 text-center">
                <h2 className="text-3xl font-bold mb-8">Why Use Our Recipe Generator?</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div>
                        <EyeIcon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                        <h3 className="text-xl font-semibold mb-2">Interactive Preview</h3>
                        <p className="text-gray-600">See your creation come to life as you customize ingredients</p>
                    </div>
                    <div>
                        <FileDownIcon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                        <h3 className="text-xl font-semibold mb-2">Instant PDF Export</h3>
                        <p className="text-gray-600">Download and share your custom recipes with one click</p>
                    </div>
                    <div>
                        <CheckIcon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                        <h3 className="text-xl font-semibold mb-2">Tested Recipes</h3>
                        <p className="text-gray-600">All base recipes are kitchen-tested for perfect results</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
