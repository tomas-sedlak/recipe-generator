import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { snakeCase } from "lodash";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Preview from "../components/common/Preview";

// Base Items with dynamic image paths
const baseItems: string[] = ["Classic", "Cocoa", "Banana", "Carrot", "Pumpkin"];

// Mixin Items with dynamic image paths
const mixinItems: string[] = ["Chocolate Chunks", "Nuts", "Berries", "Cream Cheese", "Streusel", "Cinnamon", "Coconut", "Poppy Seeds"];

const toppingItems: string[] = ["Streusel Crumb", "Sugar Glaze", "Cream Cheese Frosting", "Turbinado Sugar", "Oat Crumble"];

const specialAdditions: string[] = ["Extra Moist", "Protein Boost", "Gluten Free", "Sugar Free", "Vegan"];

export default function GenerateMuffinsPage() {
  const [base, setBase] = useState<string>(baseItems[0]);
  const [mixins, setMixins] = useState<string[]>([]);
  const [topping, setTopping] = useState<string | null>(null);
  const [special, setSpecial] = useState<string | null>(null);

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

  const handleToppingClick = (item: string) => {
    setTopping(topping === item ? null : item);
  };

  const handleSpecialClick = (item: string) => {
    setSpecial(special === item ? null : item);
  };

  const handleRandomIngredients = () => {
    // Randomly select a base
    const randomBase = baseItems[Math.floor(Math.random() * baseItems.length)];

    // Random mix-ins (0 to 3)
    const numMixins = Math.floor(Math.random() * 4);
    const shuffledMixins = [...mixinItems]
      .sort(() => Math.random() - 0.5)
      .slice(0, numMixins);

    // Random topping
    const randomTopping = toppingItems[Math.floor(Math.random() * toppingItems.length)];

    // 30% chance of special addition
    const randomSpecial = Math.random() < 0.3 
      ? specialAdditions[Math.floor(Math.random() * specialAdditions.length)]
      : null;

    // Update state
    setBase(randomBase);
    setMixins(shuffledMixins);
    setTopping(randomTopping);
    setSpecial(randomSpecial);
  };

  const handleGenerateRecipe = () => {
    const searchParams = new URLSearchParams({
      base: base,
      mixins: mixins.join(','),
      ...(topping && { topping }),
      ...(special && { special }),
    });

    navigate(`/muffins?${searchParams.toString()}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-1">
          Create Your Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Muffin</span> Recipe
        </h1>
        <p className="text-gray-600 text-lg">
          Choose your base, add mix-ins, and get a personalized recipe in seconds
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Button variant="secondary" onClick={handleRandomIngredients}>🎲 Random Ingredients</Button>

          <section className="my-4">
            <h2 className="font-bold text-2xl">Choose Muffin Base</h2>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {baseItems.map((item) => (
                <Card
                  key={item}
                  name={item}
                  image={`/images/muffins/${snakeCase(item)}_preview.png`}
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
                  image={`/images/muffins/${snakeCase(item)}_preview.png`}
                  selected={mixins.includes(item)}
                  onClick={() => handleMixinsClick(item)}
                />
              ))}
            </div>
          </section>

          <section className="my-4">
            <h2 className="font-bold text-2xl">Choose Topping <span className="text-gray-500 text-sm">(Optional)</span></h2>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {toppingItems.map((item) => (
                <Card
                  key={item}
                  name={item}
                  image={`/images/muffins/${snakeCase(item)}_preview.png`}
                  selected={topping === item}
                  onClick={() => handleToppingClick(item)}
                />
              ))}
            </div>
          </section>

          <section className="my-4">
            <h2 className="font-bold text-2xl">Special Requirements <span className="text-gray-500 text-sm">(Optional)</span></h2>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
              {specialAdditions.map((item) => (
                <Card
                  key={item}
                  name={item}
                  image={`/images/muffins/${snakeCase(item)}_preview.png`}
                  selected={special === item}
                  onClick={() => handleSpecialClick(item)}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="hidden md:block sticky top-20 h-fit">
          <Preview 
            folder="muffins" 
            items={[base, ...mixins, topping, special].filter(Boolean)} 
          />
          <Button onClick={handleGenerateRecipe} className="mt-4">Generate My Recipe 📝</Button>
        </div>

        <div className="col-span-2 block md:hidden mt-6 text-center">
          <Button onClick={handleGenerateRecipe}>Generate My Recipe 📝</Button>
        </div>
      </div>
    </div>
  );
}
