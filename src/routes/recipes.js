import { Router } from "express";
import {
  saveRecipe,
  updateArrayDocument,
  removeFromArrayDocument,
  findAllFeaturedRecipes,
} from "../server/connect.js";

const router = Router();

router.post("/save", async (req, res) => {
  const { recipe, user } = req.body;
  const {
    label,
    uri,
    image,
    source,
    shareAs,
    healthLabels,
    ingredientLines,
    calories,
    totalTime,
    totalNutrients,
    dishType,
    mealType,
    cuisineType,
    dietLabels,
  } = recipe;

  const startIndex = uri.indexOf("#recipe_");
  // Extract the substring after #recipe_
  const recipeId = uri.substring(startIndex + "#recipe_".length);

  const recipe_doc = {
    id: recipeId,
    name: label,
    image: image,
    source: source,
    totalTime: totalTime,
    shareAs: shareAs,
    healthLabels: healthLabels,
    ingredientLines: ingredientLines,
    calories: calories,
    totalNutrients: totalNutrients,
    dishType: dishType,
    mealType: mealType,
    cuisineType: cuisineType,
    dietLabels: dietLabels,
    featured: true,
  };
  try {
    const result = await saveRecipe(recipe_doc);

    //TO-DO: Save recipe to users recipe list
    const filter = { email: user.email };
    const updateDoc = { savedRecipes: result.data };

    const update_user_saved_recipes = await updateArrayDocument(
      "RecipeApp",
      "Users",
      filter,
      updateDoc,
    ); //Update user saved recipes

    if (update_user_saved_recipes) {
      //recipe successfully saved
      return res.status(200).send("Recipe saved and added to user recipe list");
    } else {
      //recipe unsuccessfully saved
      return res
        .status(403)
        .send("Recipe not saved and not added to user recipe list");
    }
  } catch (error) {
    console.error("Error saving recipe:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/remove", async (req, res) => {
  const { recipe, user } = req.body;
  let recipeId;
  if (typeof recipe.id !== "undefined") {
    recipeId = recipe.id;
  } else {
    const startIndex = recipe.uri.indexOf("#recipe_");
    // Extract the substring after #recipe_
    recipeId = recipe.uri.substring(startIndex + "#recipe_".length);
  }

  try {
    const filter = { email: user.email };
    const updateDoc = { savedRecipes: recipeId };
    console.log(filter);
    console.log(updateDoc);
    const update_user_saved_recipes = await removeFromArrayDocument(
      "RecipeApp",
      "Users",
      filter,
      updateDoc,
    ); //Remove recipe from user saved recipes

    if (update_user_saved_recipes) {
      //recipe successfully removed
      return res.status(200).send("Recipe removed from user recipe list.");
    } else {
      //recipe unsuccessfully removed
      return res
        .status(403)
        .send("Recipe unsuccessfully removed from user recipe list.");
    }
  } catch (error) {
    console.error("Error saving recipe:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const result = await findAllFeaturedRecipes();

    if (result) {
      //featured recipes successfully retrieved
      return res.status(200).send(result);
    } else {
      //featured recipes unsuccessfully retrieved
      return res.status(403).send(result);
    }
  } catch (error) {
    console.error("Error retrieving featured recipes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;