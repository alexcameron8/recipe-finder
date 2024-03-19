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
  useDisclosure,
} from "@nextui-org/react";
import { IoTimerOutline } from "react-icons/io5";
import { RecipeInfoModal } from "./RecipeInfoModal";

/* eslint-disable react/prop-types */
export function UserRecipeListItem({ recipe, isRecipeSaved }) {
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
    <>
      <Card
        isPressable
        isHoverable
        variant="bordered"
        className="h-full"
        onPress={handleOpen}
      >
        <CardHeader className="relative flex">
          <img
            src={recipe.image}
            className="mx-4 mt-2 flex  w-full items-center justify-center rounded-xl object-cover"
            alt={recipe.name}
            onError={handleImageError}
          />
          {recipe.totalTime > 0 && (
            <Chip className="absolute bottom-0 left-0 mb-6 ml-10 ">
              <div className="flex flex-row items-center font-semibold">
                <IoTimerOutline /> &nbsp;{recipe.totalTime} mins
              </div>
            </Chip>
          )}
        </CardHeader>
        <CardBody>
          <div className="mx-4 text-base font-bold sm:text-sm md:text-lg lg:text-xl ">
            {recipe.name}
          </div>
        </CardBody>
        <CardFooter>
          <div className="mx-4 flex flex-row gap-1">
            <Chip>{recipe.mealType}</Chip>
            <Chip>{recipe.dishType}</Chip>
            <Chip>{recipe.cuisineType}</Chip>
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
