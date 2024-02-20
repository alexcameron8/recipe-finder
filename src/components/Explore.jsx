import { RecipeCarousel } from "./RecipeCarousel";
import { Divider } from "@nextui-org/react";

export function Explore() {
  return (
    <div className="m-4">
      <RecipeCarousel
        header="Featured Recipes"
        subheader="Not sure what you are looking for? Check out some of these recipes!"
      />
      <RecipeCarousel
        header="Recommended Recipes"
        subheader="Popular recipes enjoyed by others!"
      />
    </div>
  );
}
