import { RecipeListItem } from "./RecipeListItem";
import { useSearchResults } from "../App";

export function RecipeList() {
  const { searchResults } = useSearchResults();

  return (
    <div className="flex flex-col items-center">
      {searchResults?.map((result) => (
        <RecipeListItem key={result.recipe.uri} recipe={result.recipe} />
      ))}
    </div>
  );
}
