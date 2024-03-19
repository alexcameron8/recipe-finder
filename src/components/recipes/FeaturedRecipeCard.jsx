import { useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { useCurrentUserResults } from "../App";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Skeleton,
} from "@nextui-org/react";
import { IoTimerOutline } from "react-icons/io5";
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
export function FeaturedRecipeCard({ recipe, isRecipeSaved, isLoading }) {
  const [isSaved, setIsSaved] = useState(isRecipeSaved);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserResults();

  function handleShowRecipe(recipe) {
    // Extract the substring after #recipe_
    const recipeId = recipe.id;
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
  const handleImageError = (event) => {
    // If the image fails to load due to CORB, set a fallback image
    event.target.src = "/assets/no-photo.png";
  };

  return (
    <Card isPressable isHoverable variant="bordered" className="h-full w-64">
      <CardHeader className="relative flex">
        <img
          src={recipe.image}
          className="flex h-full items-center justify-center rounded-xl object-cover"
          alt={recipe.name}
          onError={handleImageError}
        />
        <div className="flex flex-row items-center">
          <Chip color="default" className="absolute bottom-0 left-0 mb-6 ml-8 ">
            <div className="flex flex-row items-center font-semibold">
              <IoTimerOutline /> &nbsp;
              {recipe.totalTime > 0 ? recipe.totalTime + " mins" : "N/A"}
            </div>
          </Chip>

          <div className="absolute bottom-0 right-0 mb-6 mr-8">
            <button
              className="flex items-center rounded-full bg-default p-1 text-xl hover:bg-default-100"
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
        </div>
      </CardHeader>
      <CardBody>
        <div className="mx-2 text-base font-bold ">{recipe.name}</div>
      </CardBody>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}

/* eslint-disable react/prop-types */
export function SkeletonRecipeCard() {
  return (
    <Card isPressable isHoverable variant="bordered" className="h-full">
      <CardHeader className="relative flex">
        <Skeleton className="rounded-lg">
          <img className="flex h-full items-center justify-center rounded-xl object-cover" />
        </Skeleton>
        <div className="flex flex-row items-center">
          <Skeleton className="rounded-lg">
            <Chip
              color="default"
              className="absolute bottom-0 left-0 mb-6 ml-8 "
            >
              <div className="flex flex-row items-center font-semibold">
                <IoTimerOutline /> &nbsp;
                {/* {recipe.totalTime > 0 ? recipe.totalTime + " mins" : "N/A"} */}
              </div>
            </Chip>

            <div className="absolute bottom-0 right-0 mb-6 mr-8">
              <button className="flex items-center rounded-full bg-default p-1 text-xl hover:bg-default-100">
                <IoMdHeartEmpty />
              </button>
            </div>
          </Skeleton>
        </div>
      </CardHeader>
      <CardBody>
        <Skeleton className="rounded-lg">
          <div className="mx-2 text-base font-bold "></div>
        </Skeleton>
      </CardBody>
      <CardFooter>
        <div className="flex flex-row">
          <Skeleton className="rounded-lg">
            <Chip>1</Chip>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <Chip>2</Chip>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <Chip>3</Chip>
          </Skeleton>
        </div>
      </CardFooter>
    </Card>
  );
}
