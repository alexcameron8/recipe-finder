import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRecipeByID } from "../../services/recipes";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export function RecipeInformation() {
  const { id } = useParams();
  const [recipeInfo, setRecipeInfo] = useState(null);

  useEffect(() => {
    const fetchRecipeInfo = async () => {
      try {
        const recipeInfo = await fetchRecipeByID(id);
        setRecipeInfo(recipeInfo);
      } catch (error) {
        console.error("Error fetching recipe information:", error);
      }
    };

    fetchRecipeInfo();
  }, [id]);
  //   function handleNavigateBack() {
  //     const storedSearchResults = localStorage.getItem("searchResults");
  //     if (storedSearchResults) {
  //       setSearchResults(JSON.parse(storedSearchResults));
  //     }
  //   }
  return (
    <div>
      <h2>Recipe Information</h2>
      <button>
        <Link to="/">Back</Link>
      </button>
      {recipeInfo && <div>Test Div</div>}
    </div>
  );
}
