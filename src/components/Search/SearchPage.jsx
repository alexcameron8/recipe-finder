import { Search } from "./Search";
import { RecipeList } from "../recipes/RecipeList";

export function SearchPage() {
  return (
    <div className="flex flex-col justify-center bg-orange-50 pt-10">
      <div className="mb-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
          Find <span className="font-bold text-yellow-400">New</span> Recipes{" "}
          <span className="font-bold">
            Now
            <br />
            <span className="text-2xl font-bold lg:text-3xl"></span>
          </span>
        </h2>
        <p className="mt-2 flex flex-row text-lg font-semibold">
          Savor the Possibilities by Adding Recipes to your own List of Recipes!
        </p>
      </div>
      <Search />
      <RecipeList />
    </div>
  );
}
