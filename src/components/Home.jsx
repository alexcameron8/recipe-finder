import { Search } from "./Search/Search";
import { RecipeList } from "./recipes/RecipeList";
export function Home() {
  return (
    <div className="flex flex-col items-center justify-center md:mx-2 md:px-2">
      <Search />
      <RecipeList />
    </div>
  );
}
