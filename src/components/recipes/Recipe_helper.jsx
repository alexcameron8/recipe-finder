// Helper class for recipe card component chips
import {
  MdOutlineCookie,
  MdOutlineDinnerDining,
  MdOutlineBrunchDining,
  MdOutlineFreeBreakfast,
} from "react-icons/md";

export const mealColorTypes = {
  breakfast: "rgba(255, 165, 0, 0.5)", // Orange with 50% opacity,
  brunch: "rgba(0, 0, 255, 0.5)", // Blue with 50% opacity
  "lunch/dinner": "rgba(144, 238, 144, 0.5)", // Light green with 50% opacity
  snack: "rgba(255, 192, 203, 0.5)", // Pink with 50% opacity
  teatime: "rgba(173, 216, 230, 0.5)", // Light blue with 50% opacity
};

export const cuisineTypes = [
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
export const cuisineEmojis = {
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

export const dishTypes = [
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
export const cuisineTypeColors = {
  american: "rgba(0, 0, 255, 0.3)", // Blue with 50% opacity
  asian: "rgba(255, 0, 0, 0.3)", // Red with 50% opacity
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

export const dishTypeColors = {
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

export function getMealColor(mealType) {
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
    default:
      color = "bg-white"; // Default color
      break;
  }
  return color;
}
export function getCuisineTypeColor(cuisineType) {
  return cuisineTypeColors[cuisineType.toLowerCase()] || "default";
}

export function getDishTypeColor(dishType) {
  return dishTypeColors[dishType] || "default";
}
export function getMealName(mealType) {
  let mealName;
  switch (mealType) {
    case "breakfast":
      mealName = (
        <span className="flex flex-row items-center font-medium">
          <MdOutlineFreeBreakfast />
          &nbsp;Breakfast
        </span>
      );
      break;
    case "brunch":
      mealName = (
        <span className="flex flex-row items-center font-medium">
          <MdOutlineBrunchDining />
          &nbsp;Brunch
        </span>
      );
      break;
    case "lunch/dinner":
      mealName = (
        <span className="flex flex-row items-center font-medium">
          <MdOutlineDinnerDining />
          &nbsp;Lunch/Dinner
        </span>
      );
      break;
    case "snack":
      mealName = (
        <span className="flex flex-row items-center font-medium">
          <MdOutlineCookie />
          &nbsp;Snack
        </span>
      );
      break;
    case "teatime":
      mealName = (
        <span className="flex flex-row items-center font-medium">
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
