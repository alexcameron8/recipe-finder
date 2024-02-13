const fetchRecipes = async (recipeQuery, healthFilters) => {
  const REACT_APP_API_KEY = import.meta.env.VITE_API_KEY;
  const REACT_APP_APPLICATION_ID = import.meta.env.VITE_APPLICATION_ID;

  try {
    let query = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeQuery}&app_id=${REACT_APP_APPLICATION_ID}&app_key=${REACT_APP_API_KEY}`;
    if (healthFilters.length !== 0) {
      const health_query = healthFilters
        .map((filter) => `&health=${filter}`)
        .join("");
      query = query + health_query;
    }

    const response = await fetch(query);
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

const fetchRecipeByID = async (recipe_id) => {
  const REACT_APP_API_KEY = import.meta.env.VITE_API_KEY;
  const REACT_APP_APPLICATION_ID = import.meta.env.VITE_APPLICATION_ID;

  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2/${recipe_id}?type=public&app_id=${REACT_APP_APPLICATION_ID}&app_key=${REACT_APP_API_KEY}&field=&field=uri&field=label&field=image&field=images&field=source&field=url&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=ingredientLines&field=ingredients&field=calories&field=glycemicIndex&field=inflammatoryIndex&field=totalCO2Emissions&field=co2EmissionsClass&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=totalNutrients&field=totalDaily&field=digest&field=tags&field=externalId`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

const fetchRecipeByURI = async (recipe_uri) => {
  const REACT_APP_API_KEY = import.meta.env.VITE_API_KEY;
  const REACT_APP_APPLICATION_ID = import.meta.env.VITE_APPLICATION_ID;
  try {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${recipe_uri}&app_id=${REACT_APP_APPLICATION_ID}&app_key=${REACT_APP_API_KEY}&field=&field=uri&field=label&field=image&field=images&field=source&field=url&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=ingredientLines&field=ingredients&field=calories&field=glycemicIndex&field=inflammatoryIndex&field=totalCO2Emissions&field=co2EmissionsClass&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=totalNutrients&field=totalDaily&field=digest&field=tags&field=externalId`,
    );
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export { fetchRecipes, fetchRecipeByID, fetchRecipeByURI };
