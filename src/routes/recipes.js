import { Router } from "express";
import { saveRecipe } from "../server/connect.js";

const router = Router();

router.post("/save", async (req, res) => {
    const { label, uri, image, source, shareAs, healthLabels, ingredientLines, calories, totalTime, totalNutrients, dishType } = req.body;
    const startIndex = uri.indexOf("#recipe_");
    // Extract the substring after #recipe_
    const recipeId = uri.substring(startIndex + "#recipe_".length);

    const recipe = {
        id : recipeId,
        name : label,
        image : image,
        source : source,
        totalTime : totalTime,
        shareAs: shareAs,
        healthLabels: healthLabels,
        ingredientLines: ingredientLines,
        calories: calories,
        totalNutrients : totalNutrients,
        dishType : dishType
    }
    try {
        const result = await saveRecipe(recipe);
        //TO-DO: Save recipe to users recipe list

        if (result.status) {
          //recipe successfully saved
          return res.status(200).send(result.data);
        } else {
          //recipe unsuccessfully saved
          return res.status(403).send(result.data);
        }
      } catch (error) {
        console.error("Error saving recipe:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

})

export default router;