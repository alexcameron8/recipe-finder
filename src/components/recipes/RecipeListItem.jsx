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
import { Chip, useDisclosure, CircularProgress, Card } from "@nextui-org/react";
import { RecipeInfoModal } from "./RecipeInfoModal";
import { GiMeal } from "react-icons/gi";
import { IoEarthOutline } from "react-icons/io5";
import {
  getMealColor,
  getCuisineTypeColor,
  getDishTypeColor,
  getMealName,
} from "./Recipe_helper";

/* eslint-disable react/prop-types */
export function RecipeListItem({ recipe, isRecipeSaved }) {
  const [isSaved, setIsSaved] = useState(isRecipeSaved);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserResults();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);

  const handleOpen = () => {
    onOpen();
  };

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
        let endpoint;
        if (
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
        ) {
          // Code for development environment
          endpoint = `http://localhost:3000/recipes/save`;
        } else {
          // Code for production environment
          endpoint = `https://recipe-finder-backend-6wdh.onrender.com/recipes/save`;
        }
        const data = { recipe: recipe, user: currentUser };
        const response = await axios.post(endpoint, data);
        setIsSaving(false);
        setIsSaved((prev) => !prev);
      } catch (error) {
        // Handle save recipe error (e.g., display error message to user)
      }
    } else {
      let endpoint;
      if (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      ) {
        // Code for development environment
        endpoint = `http://localhost:3000/recipes/remove`;
      } else {
        // Code for production environment
        endpoint = `https://recipe-finder-backend-6wdh.onrender.com/recipes/remove`;
      }
      const data = { recipe: recipe, user: currentUser };
      const response = await axios.put(endpoint, data);
      setIsSaving(false);
      setIsSaved((prev) => !prev);
    }
  };

  return (
    <>
      <div className="m-2 w-full max-w-screen-2xl items-center rounded-xl shadow-sm shadow-black/30 ">
        <Card
          isHoverable
          key={recipe.uri}
          className="flex flex-row hover:cursor-pointer "
        >
          <img
            className="mr-2 size-1/3 rounded-3xl p-4"
            src={recipe.image}
            alt={recipe.label}
            // onClick={() => handleShowRecipe(recipe)}
            onClick={handleOpen}
            onError={handleImageError}
          />
          <div className="flex flex-grow flex-col py-4 pr-4">
            {/* <div className="flex-grow" onClick={() => handleShowRecipe(recipe)}> */}
            <div className="flex-grow" onClick={handleOpen}>
              <h3 className="pb-2 text-base font-bold sm:text-xl md:text-2xl">
                {recipe.label}
              </h3>
              <p className="font-semibold">
                Calories: {recipe.calories.toFixed(0)}
              </p>
              <p className="font-semibold">Servings: {recipe.yield}</p>
              <div className="hidden py-2 font-light max-lg:text-sm md:flex">
                <p>{recipe.healthLabels.sort().join(" • ")}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {recipe.mealType && (
                <Chip
                  className="font-medium max-md:text-xs"
                  style={{
                    backgroundColor: getMealColor(recipe.mealType[0]),
                  }}
                >
                  {getMealName(recipe.mealType[0])}
                </Chip>
              )}
              {recipe.dishType && (
                <Chip
                  style={{
                    backgroundColor: getDishTypeColor(recipe.dishType[0]),
                  }}
                >
                  <span className="flex flex-row items-center font-medium max-md:text-xs">
                    <GiMeal /> &nbsp;
                    {recipe.dishType[0].charAt(0).toUpperCase() +
                      recipe.dishType[0].slice(1)}
                  </span>
                </Chip>
              )}
              {recipe.cuisineType && (
                <Chip
                  style={{
                    backgroundColor: getCuisineTypeColor(recipe.cuisineType[0]),
                  }}
                >
                  <span className="flex flex-row items-center font-medium max-md:text-xs">
                    <IoEarthOutline />
                    &nbsp;
                    {recipe.cuisineType[0].charAt(0).toUpperCase() +
                      recipe.cuisineType[0].slice(1)}
                  </span>
                </Chip>
              )}
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
      <RecipeInfoModal
        recipe={recipe}
        isOpen={isOpen}
        onClose={onClose}
        isSaving={isSaving}
        handleSaveClick={handleSaveClick}
        isSaved={isSaved}
      />
    </>
  );
}
