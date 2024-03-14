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
import { CircularProgress, Card } from "@nextui-org/react";

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
  const handleImageError = (event) => {
    // If the image fails to load due to CORB, set a fallback image
    event.target.src = "/assets/no-photo.png";
  };

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

  return (
    <div className="m-2 w-full max-w-screen-2xl items-center rounded-xl shadow-sm shadow-black/30 ">
      {/* <div className={styles}> */}
      <Card isHoverable key={recipe.uri} className="flex flex-row">
        <img
          className="mr-2 size-1/3 rounded-3xl p-4"
          src={recipe.image}
          alt={recipe.label}
          onClick={() => handleShowRecipe(recipe)}
          onError={handleImageError}
        />
        <div className="flex flex-grow flex-col py-4 pr-4">
          <div className="flex-grow" onClick={() => handleShowRecipe(recipe)}>
            <h3 className="pb-2 text-base font-bold sm:text-xl md:text-2xl">
              {recipe.label}
            </h3>
            <Chip color={getColor(recipe.mealType[0])}>
              {getMealName(recipe.mealType[0])}
            </Chip>
            <p>
              {recipe.dishType}, {recipe.cuisineType}
            </p>
          </div>
          <p className="font-semibold">
            Calories: {recipe.calories.toFixed(0)}
          </p>
          <p className="font-semibold">Servings: {recipe.yield}</p>
          <div className="py-2 font-light">
            <p>{recipe.healthLabels.sort().join(" • ")}</p>
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
      </Card>
    </div>
  );
}
