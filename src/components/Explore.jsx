import { RecipeCarousel } from "./RecipeCarousel";
import { Divider, Spinner } from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";

export function Explore() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user's saved recipes from the database
    const fetchFeaturedRecipes = async () => {
      // Perform database query to fetch featured recipes
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/featured`,
        );
        // Set userSavedRecipes state with the fetched data
        setFeaturedRecipes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Update loading state after fetching data
      }
    };
    fetchFeaturedRecipes();
  }, []);

  const featuredBreakfast = featuredRecipes
    ?.slice()
    .filter(
      (recipe) =>
        Array.isArray(recipe.mealType) && recipe.mealType.includes("breakfast"),
    );

  const featuredBrunch = featuredRecipes
    ?.slice()
    .filter(
      (recipe) =>
        Array.isArray(recipe.mealType) && recipe.mealType.includes("brunch"),
    );

  const featuredLunchDinner = featuredRecipes
    ?.slice()
    .filter(
      (recipe) =>
        Array.isArray(recipe.mealType) &&
        recipe.mealType.includes("lunch/dinner"),
    );
  const featuredSnack = featuredRecipes
    ?.slice()
    .filter(
      (recipe) =>
        Array.isArray(recipe.mealType) && recipe.mealType.includes("snack"),
    );
  const featuredTeaSnack = featuredRecipes
    ?.slice()
    .filter(
      (recipe) =>
        Array.isArray(recipe.mealType) && recipe.mealType.includes("teatime"),
    );

  return (
    <div className="m-4 flex flex-col items-center">
      {isLoading ? (
        <div className="col-span-3 flex h-screen flex-col items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        <div className="max-w-screen-xl">
          {/* <RecipeCarousel
            header="Featured Recipes"
            subheader="Not sure what you are looking for? Check out some of these recipes!"
          /> */}
          <RecipeCarousel
            header="Breakfast"
            subheader="Popular recipes enjoyed by others!"
            data={featuredBreakfast}
          />
          <RecipeCarousel
            header="Lunch & Dinner"
            subheader="Popular lunch and dinner recipes enjoyed by others!"
            data={featuredLunchDinner}
          />
          <RecipeCarousel
            header="Brunch"
            subheader="Popular breakfast recipes enjoyed by others!"
            data={featuredBrunch}
          />
          <RecipeCarousel
            header="Snacks"
            subheader="Popular recipes enjoyed by others!"
            data={featuredSnack}
          />
        </div>
      )}
    </div>
  );
}
