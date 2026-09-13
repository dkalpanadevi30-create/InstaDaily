import React, { useState } from "react";

type IngredientChecklistProps = {
  ingredients: string[];
};

export default function IngredientChecklist({
  ingredients,
}: IngredientChecklistProps) {
  const [checked, setChecked] = useState<boolean[]>(
    ingredients.map(() => true)
  );

  const toggleIngredient = (index: number) => {
    setChecked((current) =>
      current.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <div>
      <h3>Ingredients</h3>

      {ingredients.map((ingredient, index) => (
        <label key={ingredient}>
          <input
            type="checkbox"
            checked={checked[index]}
            onChange={() => toggleIngredient(index)}
          />
          {ingredient}
        </label>
      ))}
    </div>
  );
}