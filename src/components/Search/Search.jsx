import { useState } from "react";
import { fetchRecipes } from "../../services/recipes_api.js";
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useSearchResults } from "../App.jsx";
import { Filters } from "./Filters";

export function Search() {
  const [recipeQuery, setRecipeQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isSelected, setIsSelected] = useState([]);

  const { setSearchResults } = useSearchResults();

  const handleSearch = async (e) => {
    e.preventDefault();
    setShowFilters(false);
    const recipes = await fetchRecipes(recipeQuery, isSelected);
    setSearchResults(recipes);
    localStorage.setItem("searchResults", JSON.stringify(recipes));
  };

  const handleLiClick = (apiParameter) => {
    setIsSelected((prevSelected) => {
      // Check if the dietary restriction is already in filter
      if (prevSelected.includes(apiParameter)) {
        // Remove the item
        return prevSelected.filter((item) => item !== apiParameter);
      } else {
        // No action needed if the item is not in the list
        return prevSelected;
      }
    });
  };

  function resetFilters() {
    setIsSelected([]);
    setShowFilters(true);
  }

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center max-lg:mx-2 md:w-full">
      <form className="flex w-full items-center" onSubmit={handleSearch}>
        <input
          className="mx-1 my-2 flex-1 rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-600"
          type="text"
          id="search-bar"
          name="search-bar"
          placeholder="Search recipes..."
          onChange={(e) => setRecipeQuery(e.target.value)}
          required
        />
        <button
          type="button"
          className="ms-2 w-max rounded-lg border border-yellow-600 bg-yellow-300 p-2.5 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-yellow-600"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <IoFilter />
        </button>
        <button
          type="submit"
          className="ms-2 w-max rounded-lg border border-yellow-600 bg-yellow-300 p-2.5 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 "
        >
          <svg
            className=" h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </form>
      {showFilters && (
        <div className="border-slate w-full rounded-b-xl border-x-2 border-b-2 px-4 pb-4 shadow-xl">
          <div className=" mt-2 flex flex-row items-start justify-start">
            <h4 className="mx-1 font-semibold">
              Active Filters:{" "}
              {isSelected.length == 0 ? (
                <span className="text-base">None</span>
              ) : (
                ""
              )}
            </h4>
            <ul className="mb-1 flex flex-wrap justify-center gap-1">
              {isSelected?.map((filters) => (
                <li
                  className="flex flex-row items-center rounded-lg border-2 border-solid border-black px-1 py-0.5 text-xs font-medium hover:cursor-pointer hover:brightness-110"
                  key={`tag-${filters}`}
                  onClick={() => handleLiClick(filters)}
                >
                  <IoMdClose /> {filters}
                </li>
              ))}
            </ul>
          </div>
          <Filters
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            resetFilters={resetFilters}
          />
        </div>
      )}
    </div>
  );
}
