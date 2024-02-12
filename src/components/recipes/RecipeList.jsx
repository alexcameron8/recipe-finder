import { RecipeListItem } from "./RecipeListItem";

export function RecipeList({ searchResults }) {
  return (
    <div className="flex flex-col items-center">
      {searchResults?.map((result) => (
        <RecipeListItem key={result.recipe.uri} recipe={result.recipe} />
      ))}
    </div>
  );
}
