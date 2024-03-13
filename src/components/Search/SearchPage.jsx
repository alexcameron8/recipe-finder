import { Search } from "./Search";
import { RecipeList } from "../recipes/RecipeList";

export function SearchPage() {
  return (
    <div className="flex flex-col justify-center">
      <Search />
      <RecipeList />
    </div>
  );
}
