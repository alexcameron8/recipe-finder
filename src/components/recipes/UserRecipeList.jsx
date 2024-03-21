import { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUserResults } from "../App";
import { UserRecipeListItem } from "./UserRecipeListItem";
import { Spinner, Divider } from "@nextui-org/react";

export function UserRecipeList() {
  const [userSavedRecipes, setUserSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { currentUser } = useCurrentUserResults();

  useEffect(() => {
    if (currentUser !== null) {
      // Fetch user's saved recipes from the database
      const fetchUserSavedRecipes = async () => {
        // Perform database query to fetch user's saved recipes
        try {
          const response = await axios.get(
            `http://localhost:3000/users/${currentUser?.userId}/savedRecipes`,
          );
          // Set userSavedRecipes state with the fetched data
          setUserSavedRecipes(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false); // Update loading state after fetching data
        }
      };
      fetchUserSavedRecipes();
    }
  }, [currentUser]);

  return (
    <div className="mb-8 flex flex-col items-center justify-center bg-orange-50">
      <div className="w-full max-w-screen-xl">
        <h2 className="my-4 self-start px-6 text-2xl font-semibold">
          My Recipes
        </h2>
        <Divider className="mx-6 my-2  " />
      </div>
      <div className="grid max-w-screen-xl grid-cols-2 items-center gap-4  md:grid-cols-3">
        {isLoading ? ( // Render spinner if loading
          <div className="col-span-3 flex h-screen flex-col items-center justify-center">
            <Spinner size="md" />
          </div>
        ) : userSavedRecipes.length === 0 ? (
          <div className="flex h-screen flex-col items-center justify-center self-center text-lg font-semibold">
            No saved recipes.
          </div>
        ) : (
          userSavedRecipes?.map((result) => {
            return (
              <UserRecipeListItem
                key={result.id}
                recipe={result}
                isRecipeSaved={true}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
