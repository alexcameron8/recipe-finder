import { Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useCurrentTabContext } from "../App";

const mealTypes = {
  Breakfast: "Breakfast",
  Brunch: "Brunch",
  "Lunch/Dinner": "Lunch/Dinner",
  Snack: "Snack",
  Teatime: "Tea",
};

export function Meals() {
  return (
    <div>
      <Divider className="my-14" />
      <div className="mb-10 flex w-full max-w-screen-xl flex-col  ">
        <h2 className="mb-12 flex justify-center text-3xl font-bold">
          <span className="font-bold text-yellow-400">— &nbsp;</span>Recipe
          Categories
        </h2>
        <div className="flex flex-row justify-evenly">
          <Meal
            mealType={mealTypes.Breakfast}
            img="/assets/icons/breakfast-icon.jpg"
            meal="breakfast"
          />
          <Meal
            mealType={mealTypes.Brunch}
            img="/assets/icons/brunch-icon.jpg"
            meal="brunch"
          />
          <Meal
            mealType={mealTypes["Lunch/Dinner"]}
            img="/assets/icons/lunch-dinner-icon.jpg"
            meal="lunch-dinner"
          />
          <Meal
            mealType={mealTypes.Snack}
            img="/assets/icons/snacks-icon.jpg"
            meal="snack"
          />
          <Meal
            mealType={mealTypes.Teatime}
            img="/assets/icons/tea-time-icon.jpg"
            meal="teatime"
          />
        </div>
      </div>
    </div>
  );
}

export function Meal({ img, mealType, meal }) {
  const { curTab, setCurTab } = useCurrentTabContext();

  return (
    <Link
      onClick={() => setCurTab("explore")}
      color="foreground"
      to={`/explore`}
    >
      <div className="flex flex-col items-center justify-center gap-2 hover:scale-105 hover:cursor-pointer hover:brightness-110">
        <img
          className="h-32 w-32 rounded-full max-sm:h-14 max-sm:w-14"
          alt={mealType}
          src={img}
        />
        <p className="flex flex-wrap text-xl font-semibold max-sm:text-sm">
          {mealType}
        </p>
      </div>
    </Link>
  );
}
