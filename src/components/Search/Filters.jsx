import { Dropdown } from "../Dropdown.jsx";
import { Filter } from "./Filter.jsx";

//Temporary until database is running
const healthLabels = [
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
const mealTypes = ["Breakfast", "Brunch", "Lunch/Dinner", "Snack", "Teatime"];
const dishTypes = [
  "Alcohol Cocktail",
  "Biscuits and Cookies",
  "Bread",
  "Cereals",
  "Condiments and Sauces",
  "Desserts",
  "Drinks",
  "Egg",
  "Ice Cream and Custard",
  "Main Course",
  "Pancake",
  "Pasta",
  "Pastry",
  "Pies and Tarts",
  "pizza",
  "Preps",
  "Preserve",
  "Salad",
  "Sandwiches",
  "Seafood",
  "Side Dish",
  "Soup",
  "Special Occasions",
  "Starter",
  "Sweets",
];
const cuisineTypes = [
  "american",
  "asian",
  "british",
  "caribbean",
  "central europe",
  "chinese",
  "eastern europe",
  "french",
  "greek",
  "indian",
  "italian",
  "japanese",
  "korean",
  "kosher",
  "mediterranean",
  "mexican",
  "middle eastern",
  "nordic",
  "south american",
  "south east asian",
  "world",
];
export function Filters({ isSelected, setIsSelected, resetFilters }) {
  return (
    <div className="w-full">
      <div className="relative flex flex-col gap-3">
        <div>
          <button
            className="relative top-0 mx-1 text-yellow-600 underline"
            onClick={resetFilters}
          >
            Reset All Filters
          </button>
        </div>
        <Filter
          filter_name="Dietary Restrictions"
          filter_data={healthLabels.map((label) => label.webLabel)}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          filterType="healthLabel"
        />
        <Filter
          filter_name="Meal Types"
          filter_data={mealTypes}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          filterType="mealType"
        />
        <Filter
          filter_name="Dish Types"
          filter_data={dishTypes}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          filterType="dishType"
        />
      </div>
    </div>
  );
}
