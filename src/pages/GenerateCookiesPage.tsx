import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { snakeCase } from "lodash";
import { ShuffleIcon } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import Preview from "../components/Preview";

// Base Items with dynamic image paths
const baseItems: string[] = ["Classic", "Cocoa", "Oat", "Peanut Butter", "Red Velvet"]

// Mixin Items with dynamic image paths
const mixinItems: string[] = ["Chocolate Chips", "Nuts", "Raisins", "Dried Fruits", "Candy", "Mini Marshmallows"]

export default function GenerateCookiesPage() {
  const [base, setBase] = useState<string>(baseItems[0]);
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
    const randomBase = baseItems[Math.floor(Math.random() * baseItems.length)];

    // Determine the number of mix-ins to select (0 to 3)
    const numMixins = Math.floor(Math.random() * 4); // Random number between 0 and 3

    // Shuffle mix-in items and select the determined number
    const shuffledMixins = [...mixinItems]
      .sort(() => Math.random() - 0.5) // Shuffle the array
      .slice(0, numMixins) // Select the random number of items
      .map((item) => item);

    // Update state
    setBase(randomBase);
    setMixins(shuffledMixins);
  };


  const handleGenerateRecipe = () => {
    const searchParams = new URLSearchParams({
      base: base,
      mixins: mixins.join(','),
    });

    navigate(`/cookies?${searchParams.toString()}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-1">
          Create Your Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Cookie</span> Recipe
        </h1>
        <p className="text-gray-600 text-lg">
          Choose your base, add mix-ins, and get a personalized recipe in seconds
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Button variant="secondary" onClick={handleRandomIngredients}>
            <ShuffleIcon className="w-5 h-5" />
            Random Ingredients
          </Button>

          <section className="my-4">
            <h2 className="font-bold text-2xl">Choose Dough Base</h2>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {baseItems.map((item) => (
                <Card
                  key={item}
                  name={item}
                  image={`/images/cookies/${snakeCase(item)}_preview.png`}
                  selected={base === item}
                  onClick={() => handleBaseClick(item)}
                />
              ))}
            </div>
          </section>

          <section className="my-4">
            <h2 className="font-bold text-2xl">Add Mix-ins <span className="text-gray-500 text-sm">(Optional, max 3)</span></h2>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {mixinItems.map((item) => (
                <Card
                  key={item}
                  name={item}
                  image={`/images/cookies/${snakeCase(item)}_preview.png`}
                  selected={mixins.includes(item)}
                  onClick={() => handleMixinsClick(item)}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="hidden md:block sticky top-20 h-fit">
          <Preview folder="cookies" items={[base, ...mixins]} />
        </div>

        <div className="col-span-2 text-center">
          <Button onClick={handleGenerateRecipe}>Generate Recipe</Button>
        </div>
      </div>
    </div>

  );
}
