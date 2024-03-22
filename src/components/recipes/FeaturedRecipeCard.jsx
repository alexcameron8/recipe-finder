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
  useDisclosure,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  function handleShowRecipe(recipe) {
    // Extract the substring after #recipe_
    const recipeId = recipe.id;
    navigate(`/recipe/${recipeId}`);
  }

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
  const handleImageError = (event) => {
    // If the image fails to load due to CORB, set a fallback image
    event.target.src = "/assets/no-photo.png";
  };

  return (
    <>
      <Card
        isPressable
        isHoverable
        variant="bordered"
        style={{ height: "450px" }}
        className="flex w-64 flex-col justify-between"
      >
        <CardHeader className="relative flex">
          <img
            src={recipe.image}
            className="flex items-center justify-center rounded-xl object-cover"
            alt={recipe.name}
            onError={handleImageError}
            onClick={handleOpen}
          />
          <div className="flex flex-row items-center">
            <Chip
              color="default"
              className="absolute bottom-0 left-0 mb-6 ml-8 "
            >
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
        <CardBody className="flex-grow" onClick={handleOpen}>
          <div className="mx-2 flex-grow text-base font-bold">
            {recipe.name}
          </div>
        </CardBody>
        <CardFooter className="flex-grow" onClick={handleOpen}>
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

/* eslint-disable react/prop-types */
export function SkeletonRecipeCard() {
  return (
    <Card isPressable isHoverable variant="bordered" className="h-96 w-64">
      <CardHeader className="relative flex">
        <Skeleton className="rounded-lg">
          <img
            src="/assets/no-photo.png"
            className="flex h-4/6 items-center justify-center rounded-xl object-cover"
          />
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
          <div className="mx-2 text-base font-bold ">Skeleton</div>
        </Skeleton>
      </CardBody>
      <CardFooter>
        <div className="flex flex-row gap-1">
          <Skeleton className="w-full rounded-lg">
            <Chip>Skeleton</Chip>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <Chip>Skeleton</Chip>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <Chip>Skeleton</Chip>
          </Skeleton>
        </div>
      </CardFooter>
    </Card>
  );
}
