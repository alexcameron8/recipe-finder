import { MongoClient, ServerApiVersion } from "mongodb";

const VITE_MONGO_URI = "temp";

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

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
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

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
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

removeDocument("RecipeApp", "Users", record).catch(console.dir);
