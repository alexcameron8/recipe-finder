import { Search } from "./Search";
import { RecipeList } from "./recipes/RecipeList";
import { useState } from "react";
export function Home() {

  return (
    <div>
      <Search />
      <RecipeList />
    </div>
  );
}
