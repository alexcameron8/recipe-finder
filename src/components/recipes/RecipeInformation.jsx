import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchRecipeByID } from "../../services/recipes";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoTimerOutline } from "react-icons/io5";

/* eslint-disable react/prop-types */
export function RecipeInformation() {
  const { id } = useParams();
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchRecipeInfo = async () => {
      try {
        const recipe_data = await fetchRecipeByID(id);
        setRecipeInfo(recipe_data);
      } catch (error) {
        console.error("Error fetching recipe information:", error);
      }
    };

    fetchRecipeInfo();
  }, [id]);

  return (
    <div className="flex flex-col">
      {recipeInfo && (
        <div className="relative">
          <div className="flex justify-start p-1">
            <button className="z-10 rounded-lg bg-gray-700 p-1 text-xl font-medium text-white">
              <Link to="/">
                <IoMdArrowBack />
              </Link>
            </button>
          </div>
          <img
            className="absolute top-0 w-full"
            src={recipeInfo.recipe.image}
            alt={recipeInfo.recipe.uri}
          />
          <div className="absolute top-40 min-h-screen w-full rounded-t-xl bg-white p-4">
            <h2 className="mb-2 text-3xl font-bold">
              {recipeInfo.recipe.label}
            </h2>
            <h3 className="font-medium">Author: {recipeInfo.recipe.source}</h3>
            <hr className="my-3 h-0.5 rounded border-0 bg-gray-600" />
            {recipeInfo.recipe.totalTime > 0 && (
              <h4 className=" flex flex-row items-center font-light">
                <IoTimerOutline /> &nbsp;
                {recipeInfo.recipe.totalTime} mins
              </h4>
            )}
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList className="my-3 flex flex-row gap-2">
                <Tab
                  className={
                    tabIndex === 0 ? "font-medium underline" : "font-normal"
                  }
                >
                  <h3>Ingredients List</h3>
                </Tab>
                <Tab
                  className={
                    tabIndex === 1 ? "font-medium underline" : "font-normal"
                  }
                >
                  <h3>Nutrition Facts</h3>
                </Tab>
                <Tab
                  className={
                    tabIndex === 2 ? "font-medium underline" : "font-normal"
                  }
                >
                  <h3>Health & Allergens</h3>
                </Tab>
              </TabList>
              <hr className="h-px rounded border-0 bg-gray-300" />
              <TabPanel>
                <div>
                  <ol className="my-3 list-inside list-decimal">
                    {recipeInfo.recipe.ingredientLines.map(
                      (ingredient, index) => (
                        <li className="text-sm" key={index}>
                          {ingredient}
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="my-3 flex items-center justify-center p-1">
                  <table className="w-full table-auto border-collapse border border-gray-500">
                    <thead>
                      <tr>
                        <th className="border border-gray-500 px-4 py-2">
                          Nutrient
                        </th>
                        <th className="border border-gray-500 px-4 py-2">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(recipeInfo.recipe.totalNutrients).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td className="border border-gray-500 px-4 py-2 text-sm">
                              {value.label}
                            </td>
                            <td className="border border-gray-500 px-4 py-2 text-sm">
                              {parseFloat(value.quantity).toFixed(1)}{" "}
                              {value.unit}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <ol className="my-3 list-inside list-decimal">
                    {recipeInfo.recipe.healthLabels.map(
                      (healthLabel, index) => (
                        <li className="text-sm" key={index}>
                          {healthLabel}
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
