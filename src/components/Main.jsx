import { Search } from "./Search";
import { RecipeList } from "./recipes/RecipeList";
import { useState } from "react";
export function Main() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <Search setSearchResults={setSearchResults} />
      <RecipeList searchResults={searchResults} />
    </div>
  );
}
