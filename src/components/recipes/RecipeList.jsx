import { RecipeListItem } from "./RecipeListItem";
import { useCurrentUserResults, useSearchResults } from "../App";
import { ScrollShadow } from "@nextui-org/react";

export function RecipeList() {
  const { searchResults } = useSearchResults();
  const { currentUser } = useCurrentUserResults();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col items-center">
      {searchResults?.map((result) => {
        const startIndex = result.recipe.uri.indexOf("#recipe_");
        // Extract the substring after #recipe_
        const recipeId = result.recipe.uri.substring(
          startIndex + "#recipe_".length,
        );
        let isRecipeSaved = false;

        if (currentUser !== null) {
          isRecipeSaved = currentUser.savedRecipes.some(
            (savedRecipe) => savedRecipe === recipeId,
          );
        }
        return (
          <RecipeListItem
            key={result.recipe.uri}
            recipe={result.recipe}
            isRecipeSaved={isRecipeSaved}
          />
        );
      })}
    </div>
  );
}
