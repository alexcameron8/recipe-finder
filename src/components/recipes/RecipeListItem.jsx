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

const mealColorTypes = {
  breakfast: "warning",
  brunch: "primary",
  "lunch/dinner": "success",
  snack: "danger",
  teatime: "danger",
};

const cuisineTypes = [
  "american",
  "asian",
  "british",
  "caribbean",
  "central europe",
  "chinese",
  "eastern europe",
  "french",
  "greek",
  "indian",
  "italian",
  "japanese",
  "korean",
  "kosher",
  "mediterranean",
  "mexican",
  "middle eastern",
  "nordic",
  "south american",
  "south east asian",
  "world",
];
const cuisineEmojis = {
  american: "🇺🇸",
  asian: "🍜",
  british: "🇬🇧",
  caribbean: "🌴",
  "central europe": "🏰",
  chinese: "🥢",
  "eastern europe": "🇷🇺",
  french: "🇫🇷",
  greek: "🇬🇷",
  indian: "🇮🇳",
  italian: "🍝",
  japanese: "🍣",
  korean: "🇰🇷",
  kosher: "🍏",
  mediterranean: "🌊",
  mexican: "🌮",
  "middle eastern": "🕌",
  nordic: "❄️",
  "south american": "🌎",
  "south east asian": "🍲",
  world: "🌍",
};

const dishTypes = [
  "Alcohol Cocktail",
  "Biscuits and Cookies",
  "Bread",
  "Cereals",
  "Condiments and Sauces",
  "Desserts",
  "Drinks",
  "Egg",
  "Ice Cream and Custard",
  "Main Course",
  "Pancake",
  "Pasta",
  "Pastry",
  "Pies and Tarts",
  "pizza",
  "Preps",
  "Preserve",
  "Salad",
  "Sandwiches",
  "Seafood",
  "Side Dish",
  "Soup",
  "Special Occasions",
  "Starter",
  "Sweets",
];
const cuisineTypeColors = {
  american: "rgba(0, 0, 255, 0.5)", // Blue with 50% opacity
  asian: "rgba(255, 0, 0, 0.5)", // Red with 50% opacity
  british: "rgba(0, 128, 0, 0.5)", // Green with 50% opacity
  caribbean: "rgba(255, 255, 0, 0.5)", // Yellow with 50% opacity
  "central europe": "rgba(128, 0, 128, 0.5)", // Purple with 50% opacity
  chinese: "rgba(255, 165, 0, 0.5)", // Orange with 50% opacity
  "eastern europe": "rgba(0, 128, 128, 0.5)", // Teal with 50% opacity
  french: "rgba(0, 255, 255, 0.5)", // Cyan with 50% opacity
  greek: "rgba(75, 0, 130, 0.5)", // Indigo with 50% opacity
  indian: "rgba(255, 192, 203, 0.5)", // Pink with 50% opacity
  italian: "rgba(255, 215, 0, 0.5)", // Gold with 50% opacity
  japanese: "rgba(0, 255, 0, 0.5)", // Lime with 50% opacity
  korean: "rgba(128, 0, 128, 0.5)", // Deep purple with 50% opacity
  kosher: "rgba(255, 140, 0, 0.5)", // Deep orange with 50% opacity
  mediterranean: "rgba(173, 216, 230, 0.5)", // Light blue with 50% opacity
  mexican: "rgba(144, 238, 144, 0.5)", // Light green with 50% opacity
  "middle eastern": "rgba(105, 105, 105, 0.5)", // Blue-grey with 50% opacity
  nordic: "rgba(255, 215, 0, 0.5)", // Gold with 50% opacity
  "south american": "rgba(173, 216, 230, 0.5)", // Light blue with 50% opacity
  "south east asian": "rgba(144, 238, 144, 0.5)", // Light green with 50% opacity
  world: "rgba(255, 192, 203, 0.5)", // Pink with 50% opacity
};

const dishTypeColors = {
  "alcohol cocktail": "rgba(0, 0, 255, 0.5)", // Blue with 50% opacity
  "biscuits and cookies": "rgba(165, 42, 42, 0.5)", // Brown with 50% opacity
  bread: "rgba(255, 255, 0, 0.5)", // Yellow with 50% opacity
  cereals: "rgba(0, 128, 0, 0.5)", // Green with 50% opacity
  "condiments and sauces": "rgba(255, 0, 0, 0.5)", // Red with 50% opacity
  desserts: "rgba(128, 0, 128, 0.5)", // Purple with 50% opacity
  drinks: "rgba(0, 255, 255, 0.5)", // Cyan with 50% opacity
  egg: "rgba(255, 165, 0, 0.5)", // Orange with 50% opacity
  "ice cream and custard": "rgba(255, 192, 203, 0.5)", // Pink with 50% opacity
  "main course": "rgba(0, 128, 128, 0.5)", // Teal with 50% opacity
  pancake: "rgba(75, 0, 130, 0.5)", // Indigo with 50% opacity
  pasta: "rgba(0, 255, 0, 0.5)", // Lime with 50% opacity
  pastry: "rgba(255, 215, 0, 0.5)", // Amber with 50% opacity
  "pies and tarts": "rgba(128, 0, 128, 0.5)", // Deep purple with 50% opacity
  pizza: "rgba(255, 140, 0, 0.5)", // Deep orange with 50% opacity
  preps: "rgba(173, 216, 230, 0.5)", // Light blue with 50% opacity
  preserve: "rgba(144, 238, 144, 0.5)", // Light green with 50% opacity
  salad: "rgba(0, 255, 0, 0.5)", // Lime with 50% opacity
  sandwiches: "rgba(255, 165, 0, 0.5)", // Orange with 50% opacity
  seafood: "rgba(105, 105, 105, 0.5)", // Blue-grey with 50% opacity
  "side dish": "rgba(144, 238, 144, 0.5)", // Light green with 50% opacity
  soup: "rgba(173, 216, 230, 0.5)", // Light blue with 50% opacity
  "special occasions": "rgba(255, 215, 0, 0.5)", // Gold with 50% opacity
  starter: "rgba(173, 216, 230, 0.5)", // Light blue with 50% opacity
  sweets: "rgba(255, 192, 203, 0.5)", // Pink with 50% opacity
};

function getMealColor(mealType) {
  let color;
  switch (mealType) {
    case "breakfast":
      color = mealColorTypes.breakfast;
      break;
    case "brunch":
      color = mealColorTypes.brunch;
      break;
    case "lunch/dinner":
      color = mealColorTypes["lunch/dinner"];
      break;
    case "snack":
      color = mealColorTypes.snack;
      break;
    case "teatime":
      color = mealColorTypes.teatime;
      break;
    case "main course":
      color = "yellow";
      break;
    default:
      color = "bg-white"; // Default color
      break;
  }
  return color;
}
function getCuisineTypeColor(cuisineType) {
  console.log(cuisineType);
  console.log(cuisineTypeColors[cuisineType.toLowerCase()]);
  return cuisineTypeColors[cuisineType.toLowerCase()] || "default";
}

function getDishTypeColor(dishType) {
  return dishTypeColors[dishType] || "default";
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
      <Card
        isHoverable
        key={recipe.uri}
        className="flex flex-row hover:cursor-pointer"
      >
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
            <p className="font-semibold">
              Calories: {recipe.calories.toFixed(0)}
            </p>
            <p className="font-semibold">Servings: {recipe.yield}</p>
            <div className="hidden py-2 font-light md:flex">
              <p>{recipe.healthLabels.sort().join(" • ")}</p>
            </div>
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
          <div className="flex flex-wrap gap-1">
            <Chip color={getMealColor(recipe.mealType[0])}>
              {getMealName(recipe.mealType[0])}
            </Chip>
            <Chip
              style={{ backgroundColor: getDishTypeColor(recipe.dishType[0]) }}
            >
              {recipe.dishType[0].charAt(0).toUpperCase() +
                recipe.dishType[0].slice(1)}
            </Chip>
            <Chip
              style={{
                backgroundColor: getCuisineTypeColor(recipe.cuisineType[0]),
              }}
            >
              {recipe.cuisineType[0].charAt(0).toUpperCase() +
                recipe.cuisineType[0].slice(1)}
            </Chip>
          </div>
        </div>
      </Card>
    </div>
  );
}
