import { RecipeCarousel } from "./RecipeCarousel";
import { useState, useEffect } from "react";
import axios from "axios";
import { Nav } from "./navbar/Navbar";
import { Footer } from "./Footer/Footer";
import "../index.css";

export function Explore() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user's saved recipes from the database
    const fetchFeaturedRecipes = async () => {
      // Perform database query to fetch featured recipes
      try {
        let endpoint;
        if (
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
        ) {
          // Code for development environment
          endpoint = `http://localhost:3000/recipes/featured`;
        } else {
          // Code for production environment
          endpoint = `https://recipe-finder-backend-6wdh.onrender.com/recipes/featured`;
        }
        const response = await axios.get(endpoint);
        // Set userSavedRecipes state with the fetched data
        setFeaturedRecipes(response.data);
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
    <>
      <Nav />
      <div>
        <div className="flex flex-col items-center bg-orange-50 p-4">
          <div className="mx-4 max-w-screen-xl bg-orange-50 ">
            {/* <RecipeCarousel
            header="Featured Recipes"
            subheader="Not sure what you are looking for? Check out some of these recipes!"
          /> */}
            <RecipeCarousel
              id="breakfast"
              header="Breakfast"
              subheader="Popular recipes enjoyed by others!"
              data={featuredBreakfast}
              isLoading={isLoading}
            />
            <RecipeCarousel
              id="lunch-dinner"
              header="Lunch & Dinner"
              subheader="Popular lunch and dinner recipes enjoyed by others!"
              data={featuredLunchDinner}
              isLoading={isLoading}
            />
            <RecipeCarousel
              id="brunch"
              header="Brunch"
              subheader="Popular breakfast recipes enjoyed by others!"
              data={featuredBrunch}
              isLoading={isLoading}
            />
            <RecipeCarousel
              id="snacks"
              header="Snacks"
              subheader="Popular recipes enjoyed by others!"
              data={featuredSnack}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="footer-section-divider bg-orange-50">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <Footer />
      </div>
    </>
  );
}
