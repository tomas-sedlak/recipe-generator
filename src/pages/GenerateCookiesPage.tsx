import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { snakeCase } from "lodash";
import Card from "../components/Card";
import ArrowBack from "../components/ArrowBack";
import Button from "../components/Button";
import Preview from "../components/Preview";

// Define types for items
interface Item {
  name: string;
  previewImage: string;
  stackImage: string;
}

const IMAGE_BASE_PATH = "/assets/images/cookies"; // Base directory for images

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
  const [base, setBase] = useState<string>(baseItems[0].name);
  const [mixins, setMixins] = useState<string[]>([]);

  const navigate = useNavigate();

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
    const searchParams = new URLSearchParams({
      base: base,
      mixins: mixins.join(','),
    });

    navigate(`/cookie?${searchParams.toString()}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <div>
        <ArrowBack />

        <h1 className="text-4xl font-bold mb-2">
          Create Your Custom Cookie Recipe
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Choose your base, add mix-ins, and get a personalized recipe in seconds
        </p>
      </div>

      <section className="mb-4">
        <div className="w-full h-52 bg-gray-200"></div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Button variant="secondary" onClick={handleRandomIngredients}>🎲 Random Ingredients</Button>

          <section className="my-4">
            <h2 className="font-bold text-2xl">Choose Dough Base</h2>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {baseItems.map((item) => (
                <Card
                  key={item.name}
                  name={item.name}
                  image={`/images/cookies/${snakeCase(item.name)}_preview.png`}
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
                  image={`/images/cookies/${snakeCase(item.name)}_preview.png`}
                  selected={mixins.includes(item.name)}
                  onClick={() => handleMixinsClick(item.name)}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="hidden md:block sticky top-20 h-fit">
          <Preview folder="cookies" items={[base, ...mixins]} />

          <Button onClick={handleGenerateRecipe} className="mt-4">Generate My Recipe 📝</Button>
        </div>

        <div className="block md:hidden mt-6 text-center">
          <Button onClick={handleGenerateRecipe}>Generate My Recipe 📝</Button>
        </div>
      </div>
    </div>

  );
}
