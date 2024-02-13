import { useState } from "react";
import { fetchRecipes } from "../services/recipes.js";
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Dropdown } from "./Dropdown";
import { useSearchResults } from "./App";

//Temporary until database is running
const webLabels = [
  {
    type: "Health",
    webLabel: "Alcohol-Cocktail",
    apiParameter: "alcohol-cocktail",
    definition: "Describes an alcoholic cocktail",
  },
  {
    type: "Health",
    webLabel: "Alcohol-Free",
    apiParameter: "alcohol-free",
    definition: "No alcohol used or contained",
  },
  {
    type: "Health",
    webLabel: "Celery-Free",
    apiParameter: "celery-free",
    definition: "Does not contain celery or derivatives",
  },
  {
    type: "Health",
    webLabel: "Crustcean-Free",
    apiParameter: "crustacean-free",
    definition:
      "Does not contain crustaceans (shrimp, lobster etc.) or derivatives",
  },
  {
    type: "Health",
    webLabel: "Dairy-Free",
    apiParameter: "dairy-free",
    definition: "No dairy; no lactose",
  },
  {
    type: "Health",
    webLabel: "DASH",
    apiParameter: "DASH",
    definition: "Dietary Approaches to Stop Hypertension diet",
  },
  {
    type: "Health",
    webLabel: "Egg-Free",
    apiParameter: "egg-free",
    definition: "No eggs or products containing eggs",
  },
  {
    type: "Health",
    webLabel: "Fish-Free",
    apiParameter: "fish-free",
    definition: "No fish or fish derivatives",
  },
  {
    type: "Health",
    webLabel: "FODMAP-Free",
    apiParameter: "fodmap-free",
    definition: "Does not contain FODMAP foods",
  },
  {
    type: "Health",
    webLabel: "Gluten-Free",
    apiParameter: "gluten-free",
    definition: "No ingredients containing gluten",
  },
  {
    type: "Health",
    webLabel: "Immuno-Supportive",
    apiParameter: "immuno-supportive",
    definition:
      "Recipes which fit a science-based approach to eating to strengthen the immune system",
  },
  {
    type: "Health",
    webLabel: "Keto-Friendly",
    apiParameter: "keto-friendly",
    definition: "Maximum 7 grams of net carbs per serving",
  },
  {
    type: "Health",
    webLabel: "Kidney-Friendly",
    apiParameter: "kidney-friendly",
    definition:
      "Per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium less than 500 mg",
  },
  {
    type: "Health",
    webLabel: "Kosher",
    apiParameter: "kosher",
    definition:
      "Contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves",
  },
  {
    type: "Health",
    webLabel: "Low Potassium",
    apiParameter: "low-potassium",
    definition: "Less than 150mg per serving",
  },
  {
    type: "Health",
    webLabel: "Low Sugar",
    apiParameter: "low-sugar",
    definition:
      "No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose",
  },
  {
    type: "Health",
    webLabel: "Lupine-Free",
    apiParameter: "lupine-free",
    definition: "Does not contain lupine or derivatives",
  },
  {
    type: "Health",
    webLabel: "Mediterranean",
    apiParameter: "Mediterranean",
    definition: "Mediterranean diet",
  },
  {
    type: "Health",
    webLabel: "Mollusk-Free",
    apiParameter: "mollusk-free",
    definition: "No mollusks",
  },
  {
    type: "Health",
    webLabel: "Mustard-Free",
    apiParameter: "mustard-free",
    definition: "Does not contain mustard or derivatives",
  },
  {
    type: "Health",
    webLabel: "No oil added",
    apiParameter: "no-oil-added",
    definition:
      "No oil added except to what is contained in the basic ingredients",
  },
  {
    type: "Health",
    webLabel: "Paleo",
    apiParameter: "paleo",
    definition:
      "Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils",
  },
  {
    type: "Health",
    webLabel: "Peanut-Free",
    apiParameter: "peanut-free",
    definition: "No peanuts or products containing peanuts",
  },
  {
    type: "Health",
    webLabel: "Pescatarian",
    apiParameter: "pecatarian",
    definition:
      "Does not contain meat or meat based products, can contain dairy and fish",
  },
  {
    type: "Health",
    webLabel: "Pork-Free",
    apiParameter: "pork-free",
    definition: "Does not contain pork or derivatives",
  },
  {
    type: "Health",
    webLabel: "Red-Meat-Free",
    apiParameter: "red-meat-free",
    definition:
      "Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.",
  },
  {
    type: "Health",
    webLabel: "Sesame-Free",
    apiParameter: "sesame-free",
    definition: "Does not contain sesame seed or derivatives",
  },
  {
    type: "Health",
    webLabel: "Shellfish-Free",
    apiParameter: "shellfish-free",
    definition: "No shellfish or shellfish derivatives",
  },
  {
    type: "Health",
    webLabel: "Soy-Free",
    apiParameter: "soy-free",
    definition: "No soy or products containing soy",
  },
  {
    type: "Health",
    webLabel: "Sugar-Conscious",
    apiParameter: "sugar-conscious",
    definition: "Less than 4g of sugar per serving",
  },
  {
    type: "Health",
    webLabel: "Sulfite-Free",
    apiParameter: "sulfite-free",
    definition: "No Sulfites",
  },
  {
    type: "Health",
    webLabel: "Tree-Nut-Free",
    apiParameter: "tree-nut-free",
    definition: "No tree nuts or products containing tree nuts",
  },
  {
    type: "Health",
    webLabel: "Vegan",
    apiParameter: "vegan",
    definition: "No meat, poultry, fish, dairy, eggs or honey",
  },
  {
    type: "Health",
    webLabel: "Vegetarian",
    apiParameter: "vegetarian",
    definition: "No meat, poultry, or fish",
  },
  {
    type: "Health",
    webLabel: "Wheat-Free",
    apiParameter: "wheat-free",
    definition: "No wheat, can have gluten though",
  },
];

export function Search() {
  const [recipeQuery, setRecipeQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isSelected, setIsSelected] = useState([]);

  const { setSearchResults } = useSearchResults();

  const handleSearch = async (e) => {
    e.preventDefault();
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
    setShowFilters(false);
  }

  return (
    <div className="mx-2 flex flex-col items-center justify-center">
      <h2 className="mt-4 justify-start text-2xl font-semibold">
        Search for Recipes:
      </h2>
      <form className="flex w-full items-center" onSubmit={handleSearch}>
        <input
          className="mx-1 my-2 flex-1 rounded-md border-0 p-1 shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          type="text"
          id="search-bar"
          name="search-bar"
          placeholder="Search recipes.."
          onChange={(e) => setRecipeQuery(e.target.value)}
          required
        />
        <button
          type="button"
          className="ms-2 w-max rounded-lg border border-indigo-600 bg-indigo-600 p-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <IoFilter />
        </button>
        <button
          type="submit"
          className="ms-2 w-max rounded-lg border border-indigo-600 bg-indigo-600 p-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        <>
          {/* <h4>Applied Filters: </h4> */}
          <ul className="mb-1 flex flex-wrap justify-center gap-1">
            {isSelected?.map((filters) => (
              <li
                className="flex flex-row items-center rounded-lg border-2 border-solid border-black px-1 py-0.5 text-xs font-medium"
                key={`tag-${filters}`}
                onClick={() => handleLiClick(filters)}
              >
                <IoMdClose /> {filters}
              </li>
            ))}
          </ul>
        </>
      )}
      {showFilters && (
        <div>
          <div className="relative flex flex-row gap-3">
            <Dropdown
              dropdown_name="Dietary Restriction"
              dropdown_data={webLabels}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
            <button className="relative top-0 underline" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
