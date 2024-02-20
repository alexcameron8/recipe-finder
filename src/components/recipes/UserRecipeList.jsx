import { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUserResults } from "../App";
import { UserRecipeListItem } from "./UserRecipeListItem";
import { Spinner } from "@nextui-org/react";

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
  }, []);
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      {isLoading ? ( // Render spinner if loading
        <div className="col-span-3 flex h-screen flex-col items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : userSavedRecipes.length === 0 ? (
        <div className="flex h-screen flex-col items-center justify-center text-lg font-semibold">
          No saved recipes.
        </div>
      ) : (
        userSavedRecipes?.map((result) => (
          <UserRecipeListItem key={result.id} recipe={result} />
        ))
      )}
    </div>
  );
}
