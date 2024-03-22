import { Router } from "express";
import {
  saveRecipe,
  updateArrayDocument,
  removeFromArrayDocument,
  findAllFeaturedRecipes,
} from "../server/connect.js";
import axios from "axios";
import fs from "fs";
import { Storage } from "@google-cloud/storage";
import { dirname, join, basename } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const router = Router();
const envKeyFilePath = process.env.VITE_GC_STORAGE_KEY_PATH;
const localServerUrl = process.env.VITE_SERVER_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Production env:
const keyFilePath = `/etc/secrets/${envKeyFilePath}`;

// Development env:
// const keyFilePath = join(__dirname, "..", envKeyFilePath);

const storage = new Storage({
  keyFilename: keyFilePath,
});

// storage.getBuckets().then((x) => console.log(x)); //Testing

const bucket = storage.bucket("recipe-finder-storage");

async function downloadImage(url, destination, uploadUrl) {
  try {
    const response = await axios({
      url: url,
      method: "GET",
      responseType: "arraybuffer", // Set the responseType to arraybuffer
    });

    // Write the downloaded image to the destination file
    fs.writeFileSync(destination, Buffer.from(response.data));

    console.log(`Image downloaded successfully and saved to: ${destination}`);
    // Extract only the filename from the destination path
    const filename = basename(destination);
    //GCP Logic
    const file = fs.createReadStream(destination);
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      console.error("Error uploading image:", err);
    });

    blobStream.on("finish", () => {
      console.log(`Image uploaded successfully to: ${publicUrl}`);
      // Delete the file after uploading
      fs.unlinkSync(destination);
      console.log(`Image file deleted: ${destination}`);
    });

    file.pipe(blobStream);
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    return publicUrl;
  } catch (error) {
    console.error("Error downloading or uploading image:", error);
  }
}

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
    featured: false,
  };
  try {
    const download = await downloadImage(
      recipe_doc.image,
      `C:/repos/recipe-list/public/assets/${recipe_doc.name}.jpg`,
      localServerUrl,
    );

    const updated_recipe_doc = { ...recipe_doc, image: download };
    const result = await saveRecipe(updated_recipe_doc);

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
    // console.log(filter);
    // console.log(updateDoc);
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
