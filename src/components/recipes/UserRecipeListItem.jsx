import { useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import axios from "axios";
import { useCurrentUserResults } from "../App";
import { Card, CardBody, Image } from "@nextui-org/react";

/* eslint-disable react/prop-types */
export function UserRecipeListItem({ recipe, isRecipeSaved }) {
  const [isSaved, setIsSaved] = useState(isRecipeSaved);
  const isHorizontal = true;
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserResults();

  function handleShowRecipe(recipe) {
    // Extract the substring after #recipe_
    const recipeId = recipe.id;
    navigate(`/recipe/${recipeId}`);
  }

  const handleSaveClick = async () => {
    if (!isSaved) {
      try {
        const data = { recipe: recipe, user: currentUser };
        const response = await axios.post(
          "http://localhost:3000/recipes/save",
          data,
        );

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
      setIsSaved((prev) => !prev);
    }
  };

  return (
    <Card isPressable isHoverable variant="bordered" onPress={handleShowRecipe}>
      <Image
        src={recipe.image}
        // objectFit="cover"
        // width="100%"
        // height={140}
        alt={recipe.name}
      />
      <CardBody>{recipe.name}</CardBody>
    </Card>
  );
}
