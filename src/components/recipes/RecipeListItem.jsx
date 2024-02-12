import { useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";
import { useState } from "react";

/* eslint-disable react/prop-types */
export function RecipeListItem({ recipe }) {
  const [isSaved, setIsSaved] = useState(false);
  const isHorizontal = true;
  const navigate = useNavigate();

  //To-do: Logic to check if recipe is already in users list
  //   setIsSaved(false);

  function handleShowRecipe(recipe) {
    // Retrieve the ID from the recipe uri
    const startIndex = recipe.uri.indexOf("#recipe_");

    // Extract the substring after #recipe_
    const recipeId = recipe.uri.substring(startIndex + "#recipe_".length);
    navigate(`/recipe/${recipeId}`);
  }

  function handleSaveClick() {
    console.log("Test");
    setIsSaved((prev) => !prev);
  }

  return (
    <div className="m-2 items-center rounded-xl bg-white p-2 hover:bg-gray-100">
      {isHorizontal ? (
        <div key={recipe.uri} className="flex flex-row">
          <img
            className="mr-2 size-1/3 rounded-xl"
            src={recipe.image}
            alt={recipe.label}
            onClick={() => handleShowRecipe(recipe)}
          />
          <div className="flex flex-grow flex-col">
            <div className="flex-grow">
              <h3 className="text-xl font-bold">{recipe.label}</h3>
              <p>Calories: {recipe.calories}</p>
            </div>
            <div className="flex justify-end">
              <button className="flex items-center" onClick={handleSaveClick}>
                {isSaved ? <IoMdCheckmark /> : <IoMdAdd />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          key={recipe.uri}
          className="flex flex-col"
          onClick={() => handleShowRecipe(recipe)}
        >
          <img src={recipe.image} alt={recipe.label} />
          <h3 className="font-bold">{recipe.label}</h3>
          <p>Calories: {recipe.calories}</p>
        </div>
      )}
    </div>
  );
}
