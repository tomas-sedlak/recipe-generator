import { EyeIcon, FileDownIcon, CheckIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Preview from "../components/Preview";

// Base Items with dynamic image paths
const baseItems: string[] = ["Classic", "Cocoa", "Oat", "Peanut Butter", "Red Velvet"]

// Mixin Items with dynamic image paths
const mixinItems: string[] = ["Chocolate Chips", "Nuts", "Raisins", "Candy", "Mini Marshmallows"]

export default function HomePage() {
    const [cookiePreview, setCookiePreview] = useState<string[]>([]);

    const randomCookiePreview = () => {
        const randomBase = baseItems[Math.floor(Math.random() * baseItems.length)];
        // Randomly select 0-3 mixins
        const randomMixins = mixinItems
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.floor(Math.random() * 4));
        setCookiePreview([randomBase, ...randomMixins]);
    }

    useEffect(() => {
        // Initial preview
        randomCookiePreview();

        const interval = setInterval(randomCookiePreview, 1000);
        return () => clearInterval(interval);
    }, []); // Removed cookiePreview dependency

    return (
        <>
            <section className="max-w-screen-lg mx-auto px-4 my-8 md:my-16 grid md:grid-cols-3 gap-8 items-center">
                <div className="animate-fade-in-down col-span-2">
                    <h1 className="mb-4 text-5xl font-bold tracking-tight leading-none text-gray-900 lg:text-6xl">
                        Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Custom</span><br />Baking Recipes                        </h1>
                    <p className="mb-8 text-lg font-normal text-gray-600">
                        Design personalized cookie and muffin recipes with our interactive generator. Choose ingredients, preview results, and get instant baking instructions.
                    </p>
                </div>
                <Preview folder="cookies" items={cookiePreview} className="hidden md:block" />
            </section>

            {/* Recipe Cards */}
            <section id="recipe-types" aria-label="Recipe Types" className="max-w-screen-lg mx-auto px-4 mb-8 md:mb-16">
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                    <Link
                        to="/cookies/generate"
                        className="group relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 transition-all"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                            <img
                                src="/images/cookies/cookies.jpg"
                                alt="Cookie Generator"
                                className="relative aspect-square w-full md:w-[40%] rounded-xl object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2 text-gray-900">Cookies</h3>
                                <p className="text-gray-600 mb-4">Design your perfect cookie recipe with custom ingredients</p>
                                <Button variant="primary">
                                    Create Recipe
                                    <ArrowRightIcon className="w-6 h-5" />
                                </Button>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/muffins/generate"
                        className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                            <img
                                src="/images/muffins/muffins.jpg"
                                alt="Muffin Generator"
                                className="relative aspect-square w-full md:w-[40%] rounded-xl object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-2 text-gray-900">Muffins</h3>
                                <p className="text-gray-600 mb-4">Create custom muffin recipes with your favorite flavors</p>
                                <Button variant="primary">
                                    Create Recipe
                                    <ArrowRightIcon className="w-6 h-5" />
                                </Button>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* How It Works Section */}
            <section aria-label="How It Works" className="bg-gray-100 py-12 mb-8 md:mb-16">
                <div className="max-w-screen-lg mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-x-6 gap-y-4">
                        <div className="bg-white p-6 rounded-2xl border-2">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full inline-flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-indigo-600">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Pick Your Base
                            </h3>
                            <p className="text-gray-600">
                                Start with a classic cookie or muffin base - from traditional vanilla to decadent chocolate and more!
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border-2">
                            <div className="w-12 h-12 bg-violet-100 rounded-full inline-flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-violet-600">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Add Mix-ins
                            </h3>
                            <p className="text-gray-600">
                                Customize with up to 3 mix-ins like chocolate chips, nuts, or fruits. Watch your creation come to life in real-time!
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border-2">
                            <div className="w-12 h-12 bg-purple-100 rounded-full inline-flex items-center justify-center mb-4">
                                <span className="text-2xl font-bold text-purple-600">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">
                                Get Your Recipe
                            </h3>
                            <p className="text-gray-600">
                                Click generate and receive your personalized recipe with exact measurements and step-by-step instructions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section aria-label="Features" className="max-w-screen-lg mx-auto px-4 mb-8 md:mb-16 text-center">
                <h2 className="text-3xl font-bold mb-12">
                    Why Use Our Recipe Generator?
                </h2>
                <div className="grid md:grid-cols-3 gap-x-6 gap-y-4">
                    {[
                        { Icon: EyeIcon, title: "Interactive Preview", desc: "See your creation come to life as you customize ingredients" },
                        { Icon: FileDownIcon, title: "Instant PDF Export", desc: "Download and share your custom recipes with one click" },
                        { Icon: CheckIcon, title: "Tested Recipes", desc: "All base recipes are kitchen-tested for perfect results" }
                    ].map(({ Icon, title, desc }) => (
                        <div key={title} className="py-8 px-4 rounded-2xl bg-gray-100">
                            <Icon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                            <h3 className="text-xl font-semibold mb-3">{title}</h3>
                            <p className="text-gray-600">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Get Started Section */}
            <section aria-label="Get Started" className="max-w-screen-lg mx-auto px-4 mb-8 text-center">
                <div className="bg-purple-100 rounded-2xl px-4 py-8 md:py-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to Start Baking?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Choose your recipe type and create something delicious today.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link to="/cookies/generate">
                            <Button variant="primary" className="w-full md:w-auto">
                                Create Cookie Recipe
                            </Button>
                        </Link>
                        <Link to="/muffins/generate">
                            <Button variant="white" className="w-full md:w-auto">
                                Create Muffin Recipe
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
