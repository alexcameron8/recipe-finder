/* eslint no-use-before-define: 0 */ // --> OFF

import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import bcrypt from "bcrypt";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.VITE_MONGO_URI, {
const client = new MongoClient(VITE_MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(dbName, collectionName) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Send a ping to confirm a successful connection
    await collection.command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function findAllDocuments(dbName, collectionName) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const cursor = collection.find();

    // Iterate over the cursor and log each document
    for await (const doc of cursor) {
      console.log(doc);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function addDocument(dbName, collectionName, document) {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const result = await collection.insertOne(document);

    console.log(
      `addDocument: A document was inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
async function updateArrayDocument(dbName, collectionName, filter, updateDoc) {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    /* Set the upsert option to insert a document if no documents match
    the filter */
    const options = { upsert: true };
    const result = await collection.updateOne(
      filter,
      { $addToSet: updateDoc },
      options,
    );

    // Print the number of matching and modified documents
    console.log(
      `updateArrayDocument: ${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    return result.matchedCount > 0 || result.modifiedCount > 0;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function removeFromArrayDocument(
  dbName,
  collectionName,
  filter,
  updateDoc,
) {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Update options
    const options = { upsert: true };

    // Use $pull operator to remove an item from the array
    const result = await collection.updateOne(
      filter,
      { $pull: updateDoc },
      options,
    );

    // Print the number of matching and modified documents
    console.log(
      `removeFromArrayDocument: ${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );

    return result.modifiedCount > 0;
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

async function updateDocument(dbName, collectionName, filter, updateDoc) {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    /* Set the upsert option to insert a document if no documents match
    the filter */
    const options = { upsert: true };

    const result = await collection.updateOne(
      filter,
      { $set: updateDoc },
      options,
    );

    // Print the number of matching and modified documents
    console.log(
      `updateDocument: ${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    return result.upsertedId;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
async function removeDocument(dbName, collectionName, document) {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const result = await collection.deleteOne(document);

    if (result.acknowledged) console.log(`A document was removed.`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//Create a user
async function createUser(user_email, firstName, lastName, user_password) {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db("RecipeApp");
    const collection = database.collection("Users");

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(user_password, 10);

    const new_user = {
      userId: new ObjectId().toString(),
      email: user_email,
      firstName: firstName,
      lastName: lastName,
      passwordHash: hashedPassword,
      savedRecipes: [],
    };

    const user = await collection.findOne({
      email: user_email,
    });

    if (!user) {
      addDocument("RecipeApp", "Users", new_user);
      return { status: true, data: new_user };
    } else {
      console.log("Error user already exists! Error message!");
      return {
        status: false,
        data: {
          errors: [{ msg: "Email already in use with existing account." }],
        },
      };
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//Find a user
async function findUser(user_email, user_password) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("RecipeApp");
    const collection = database.collection("Users");

    const filter = {
      email: user_email,
    };
    // const cursor = collection.findOne(credentials);
    const user = await collection.findOne(filter);

    if (!user) {
      return {
        status: false,
        data: { errors: [{ msg: "Email account not found." }] },
      };
    } else {
      //User found - Validating credentials
      const passwordMatch = await bcrypt.compare(
        user_password,
        user.passwordHash,
      );

      if (!passwordMatch) {
        return {
          status: false,
          data: { errors: [{ msg: "Passwords do not match." }] },
        };
      } else {
        return { status: true, data: user };
      }
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function saveRecipe(recipe) {
  try {
    // Connect the client to the server
    await client.connect();

    const database = client.db("RecipeApp");
    const collection = database.collection("Recipes");

    const recipe_query = await collection.findOne({
      id: recipe.id,
    });

    if (!recipe_query) {
      await addDocument("RecipeApp", "Recipes", recipe);
      return { status: true, data: recipe.id };
    } else {
      console.log(
        "Recipe already exists in database! Updating existing recipe...",
      );
      const filter = {
        id: recipe.id,
      };
      await updateDocument("RecipeApp", "Recipes", filter, recipe); //update recipe in case recipe has changed
      return {
        status: true,
        data: recipe.id,
      };
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function findAllSavedRecipes(userId) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("RecipeApp");
    const collection = database.collection("Users");

    const filter = {
      userId: userId,
    };
    console.log(filter);
    const options = {
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, savedRecipes: 1 },
    };

    const recipe_list = await collection.findOne(filter, options);
    console.log(recipe_list);
    const collection_recipes = database.collection("Recipes");
    const options_recipes = {
      // Include only the `title` and `imdb` fields in the returned document
      projection: {
        _id: 0,
        id: 1,
        name: 1,
        image: 1,
        source: 1,
        totalTime: 1,
        shareAs: 1,
        healthLabels: 1,
        ingredientLines: 1,
        calories: 1,
        totalNutrients: 1,
        dishType: 1,
      },
    };

    //Query collection_recipes and retrieve all documents related to all ids queried from recipe_list
    const recipes = await collection_recipes
      .find({ id: { $in: recipe_list.savedRecipes } })
      .toArray();

    return recipes; // Return the savedRecipes array
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//Code to retrieve ID
// const startIndex = recipe.uri.indexOf("#recipe_");
// // Extract the substring after #recipe_
// const recipeId = recipe.uri.substring(startIndex + "#recipe_".length);

// findAllDocuments("RecipeApp", "Users").catch(console.dir);

const record = {
  name: "Demo",
  email: "Demo@test.com",
  password: "password123",
};

// addDocument("RecipeApp", "Users", record).catch(console.dir);

// removeDocument("RecipeApp", "Users", record).catch(console.dir);
// findUser("alex8cameron@gmail.com", "password");
export {
  run,
  findAllDocuments,
  addDocument,
  removeDocument,
  findUser,
  createUser,
  saveRecipe,
  findAllSavedRecipes,
  updateArrayDocument,
  updateDocument,
  removeFromArrayDocument,
};
