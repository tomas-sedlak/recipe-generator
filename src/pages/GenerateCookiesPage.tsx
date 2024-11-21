import { useState } from "react";
import Card from "../components/Card";

// Define types for items
interface Item {
  name: string;
  previewImage: string;
  stackImage: string;
}

const IMAGE_BASE_PATH = "/images/cookies"; // Base directory for images

// Base Items with dynamic image paths
const baseItems: Item[] = [
  {
    name: "Classic",
    previewImage: `${IMAGE_BASE_PATH}/base/classic.png`,
    stackImage: `${IMAGE_BASE_PATH}/base/classic.png`,
  },
  {
    name: "Cocoa",
    previewImage: `${IMAGE_BASE_PATH}/base/cocoa.png`,
    stackImage: `${IMAGE_BASE_PATH}/base/cocoa.png`,
  },
  {
    name: "Oat",
    previewImage: `${IMAGE_BASE_PATH}/base/oat.png`,
    stackImage: `${IMAGE_BASE_PATH}/base/oat.png`,
  },
];

// Mixin Items with dynamic image paths
const mixinItems: Item[] = [
  {
    name: "Chocolate Chips",
    previewImage: `${IMAGE_BASE_PATH}/mixins/chocolate_chips_preview.png`,
    stackImage: `${IMAGE_BASE_PATH}/mixins/chocolate_chips_stack.png`,
  },
  {
    name: "Nuts",
    previewImage: `${IMAGE_BASE_PATH}/mixins/nuts_preview.png`,
    stackImage: `${IMAGE_BASE_PATH}/mixins/nuts_stack.png`,
  },
  {
    name: "Raisins",
    previewImage: `${IMAGE_BASE_PATH}/mixins/raisins_preview.png`,
    stackImage: `${IMAGE_BASE_PATH}/mixins/raisins_stack.png`,
  },
  {
    name: "Dried Fruits",
    previewImage: `${IMAGE_BASE_PATH}/mixins/dried_fruits_preview.png`,
    stackImage: `${IMAGE_BASE_PATH}/mixins/dried_fruits_stack.png`,
  },
  {
    name: "Candy",
    previewImage: `${IMAGE_BASE_PATH}/mixins/candy_preview.png`,
    stackImage: `${IMAGE_BASE_PATH}/mixins/candy_stack.png`,
  },
  {
    name: "Mini Marshmallows",
    previewImage: `${IMAGE_BASE_PATH}/mixins/mini_marshmallow_preview.png`,
    stackImage: `${IMAGE_BASE_PATH}/mixins/mini_marshmallow_stack.png`,
  },
];

export default function GenerateCookiesPage() {
  const [base, setBase] = useState<string | undefined>();
  const [mixins, setMixins] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(30);

  const handleBaseClick = (item: string) => setBase(item);

  const handleMixinsClick = (item: string) => {
    setMixins((prevMixins) => {
      const isSelected = prevMixins.includes(item);

      if (isSelected) {
        return prevMixins.filter((mixin) => mixin !== item);
      } else if (prevMixins.length < 3) {
        return [...prevMixins, item];
      }
      return prevMixins;
    });
  };

  const handleRandomIngredients = () => {
    // Randomly select a base
    const randomBase = baseItems[Math.floor(Math.random() * baseItems.length)].name;

    // Determine the number of mix-ins to select (0 to 3)
    const numMixins = Math.floor(Math.random() * 4); // Random number between 0 and 3

    // Shuffle mix-in items and select the determined number
    const shuffledMixins = [...mixinItems]
      .sort(() => Math.random() - 0.5) // Shuffle the array
      .slice(0, numMixins) // Select the random number of items
      .map((item) => item.name);

    // Update state
    setBase(randomBase);
    setMixins(shuffledMixins);
  };


  const handleGenerateRecipe = () => {
    console.log("Generate recipe with:", { base, mixins });
  };

  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <button onClick={handleRandomIngredients} className="bg-gray-200 rounded-lg" aria-label="Randomize Ingredients">
            <span className="block text-gray-900 text-lg font-semibold bg-gray-100 rounded-lg px-5 py-2.5 translate-y-[-4px] active:translate-y-0 transition-transform">
              🎲 Random Ingredients
            </span>
          </button>

          <section className="my-4">
            <h2 className="font-bold text-2xl">Choose Dough Base</h2>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {baseItems.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  image={item.previewImage}
                  selected={base === item.name}
                  onClick={() => handleBaseClick(item.name)}
                />
              ))}
            </div>
          </section>

          <section className="my-4">
            <h2 className="font-bold text-2xl">Add Mix-ins <span className="text-gray-500 text-sm">(Optional, max 3)</span></h2>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {mixinItems.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  image={item.previewImage}
                  selected={mixins.includes(item.name)}
                  onClick={() => handleMixinsClick(item.name)}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="hidden md:block sticky top-4 h-fit">
          <div className="aspect-square bg-gray-100 border-2 border-gray-200 rounded-2xl p-4 h-full">
            <div className="relative">
              <img src={baseItems.find((item: Item) => item.name === base)?.stackImage} className="absolute top-0 left-0" />
              {mixins.map((value) =>
                <img src={mixinItems.find((item: Item) => item.name === value)?.stackImage} className="absolute top-0 left-0" />
              )}
            </div>
          </div>

          <div className="mt-4 relative flex items-center">
            <p className="mr-4 font-medium text-lg">Quantity:</p>

            <button
              type="button"
              className="flex-shrink-0 bg-gray-100 inline-flex items-center justify-center border-2 border-gray-200 rounded-md w-6 h-6 p-1.5 focus:outline-none"
              onClick={() => setQuantity((prevQuantity) => prevQuantity - 5)}
            >
              <svg className="text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
              </svg>
            </button>

            <input
              type="text"
              className="flex-shrink-0 text-lg text-gray-900 border-0 bg-transparent font-medium focus:outline-none max-w-[2.5rem] text-center"
              value={quantity}
              onChange={(event) => setQuantity(event.currentTarget.value)}
            />

            <button
              type="button"
              className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md w-6 h-6 p-1.5 focus:outline-none"
              onClick={() => setQuantity((prevQuantity) => prevQuantity + 5)}
            >
              <svg className="text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>

          <button onClick={handleGenerateRecipe} className="mt-4 bg-green-600 rounded-lg" aria-label="Generate Recipe">
            <span className="block text-white text-lg font-semibold bg-green-500 rounded-lg px-5 py-2.5 translate-y-[-4px] active:translate-y-0 transition-transform">
              Generate My Recipe 📝
            </span>
          </button>
        </div>
      </div>

      <div className="block md:hidden mt-6 text-center">
        <button onClick={handleGenerateRecipe} className="bg-green-600 rounded-lg" aria-label="Generate Recipe">
          <span className="block text-white text-lg font-semibold bg-green-500 rounded-lg px-5 py-2.5 translate-y-[-4px] active:translate-y-0 transition-transform">
            Generate My Recipe 📝
          </span>
        </button>
      </div>
    </main>
  );
}
