import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import { useCurrentUserResults } from "../App";
import {
  MdOutlineCookie,
  MdOutlineDinnerDining,
  MdOutlineBrunchDining,
  MdOutlineFreeBreakfast,
} from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Chip } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";

const mealTypes = {
  breakfast: "warning",
  brunch: "primary",
  "lunch/dinner": "success",
  snack: "danger",
  teatime: "danger",
  // breakfast: "bg-yellow-200",
  // brunch: "bg-red-200",
  // "lunch/dinner": "bg-green-200",
  // snack: "bg-blue-200",
  // teatime: "bg-fuchsia-200",
};
function getColor(mealType) {
  let color;
  switch (mealType) {
    case "breakfast":
      color = mealTypes.breakfast;
      break;
    case "brunch":
      color = mealTypes.brunch;
      break;
    case "lunch/dinner":
      color = mealTypes["lunch/dinner"];
      break;
    case "snack":
      color = mealTypes.snack;
      break;
    case "teatime":
      color = mealTypes.teatime;
      break;
    default:
      color = "bg-white"; // Default color
      break;
  }
  return color;
}

function getMealName(mealType) {
  let mealName;
  switch (mealType) {
    case "breakfast":
      mealName = (
        <span className="flex flex-row items-center">
          <MdOutlineFreeBreakfast />
          &nbsp;Breakfast
        </span>
      );
      break;
    case "brunch":
      mealName = (
        <span className="flex flex-row items-center">
          <MdOutlineBrunchDining />
          &nbsp;Brunch
        </span>
      );
      break;
    case "lunch/dinner":
      mealName = (
        <span className="flex flex-row items-center">
          <MdOutlineDinnerDining />
          &nbsp;Lunch/Dinner
        </span>
      );
      break;
    case "snack":
      mealName = (
        <span className="flex flex-row items-center">
          <MdOutlineCookie />
          &nbsp;Snack
        </span>
      );
      break;
    case "teatime":
      mealName = (
        <span className="flex flex-row items-center">
          <MdOutlineCookie />
          &nbsp;Snack
        </span>
      );
      break;
    default:
      mealName = ""; // Default color
      break;
  }
  return mealName;
}

/* eslint-disable react/prop-types */
export function RecipeListItem({ recipe, isRecipeSaved }) {
  const [isSaved, setIsSaved] = useState(isRecipeSaved);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserResults();

  function handleShowRecipe(recipe) {
    // Retrieve the ID from the recipe uri
    const startIndex = recipe.uri.indexOf("#recipe_");

    // Extract the substring after #recipe_
    const recipeId = recipe.uri.substring(startIndex + "#recipe_".length);
    navigate(`/recipe/${recipeId}`);
  }

  const handleSaveClick = async () => {
    setIsSaving(true);
    if (!isSaved) {
      try {
        const data = { recipe: recipe, user: currentUser };
        const response = await axios.post(
          "http://localhost:3000/recipes/save",
          data,
        );
        setIsSaving(false);
        setIsSaved((prev) => !prev);
      } catch (error) {
        // Handle save recipe error (e.g., display error message to user)
      }
    } else {
      const data = { recipe: recipe, user: currentUser };
      const response = await axios.put(
        "http://localhost:3000/recipes/remove",
        data,
      );
      setIsSaving(false);
      setIsSaved((prev) => !prev);
    }
  };
  const styles =
    "m-2 items-center rounded-xl bg-white p-2 hover:bg-gray-100 " +
    getColor(recipe.mealType[0]);
  return (
    <div className="m-2 w-full max-w-screen-2xl items-center rounded-xl bg-white p-2 shadow-sm shadow-black/30 hover:bg-gray-100">
      {/* <div className={styles}> */}
      <div key={recipe.uri} className="flex flex-row">
        <img
          className="mr-2 size-1/3 rounded-xl"
          src={recipe.image}
          alt={recipe.label}
          onClick={() => handleShowRecipe(recipe)}
        />
        <div className="flex flex-grow flex-col">
          <div className="flex-grow" onClick={() => handleShowRecipe(recipe)}>
            <h3 className="text-xl font-bold">{recipe.label}</h3>
            <p>
              {recipe.dishType}, {recipe.cuisineType}
            </p>
            <p className="font-semibold">
              Calories: {recipe.calories.toFixed(0)}
            </p>
            <Chip color={getColor(recipe.mealType[0])}>
              {getMealName(recipe.mealType[0])}
            </Chip>
          </div>
          {currentUser !== null && (
            <div className="flex justify-end">
              <button
                className="flex items-center text-3xl"
                onClick={handleSaveClick}
              >
                {isSaving ? (
                  <CircularProgress
                    size="sm"
                    color="danger"
                    aria-label="Loading..."
                  />
                ) : isSaved ? (
                  <IoMdHeart color="#f31260" />
                ) : (
                  <IoMdHeartEmpty />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
