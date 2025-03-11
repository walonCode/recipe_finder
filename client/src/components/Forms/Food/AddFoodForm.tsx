import { useState } from "react";
import axios from "axios";

const AddFoodForm = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]); // Start with one empty input
  const [steps, setSteps] = useState<string[]>([""]);

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]); // Add new empty input
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/foods", {
        name,
        origin,
        ingredient: ingredients, // Sending as an array
        steps,
      });
      console.log("Food added:", response.data);
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Food Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} required />

      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Ingredient ${index + 1}`}
            value={ingredient}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
          />
          <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addIngredient}>+ Add Ingredient</button>

      <button type="submit">Submit Food</button>
    </form>
  );
};

export default AddFoodForm;
