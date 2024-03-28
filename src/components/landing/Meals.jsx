import { Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useCurrentTabContext } from "../App";
import bgsvg1 from "/assets/landing/wave-haikei.svg"; // Import the SVG file
import "../index.css";
const mealTypes = {
  Breakfast: "Breakfast",
  Brunch: "Brunch",
  "Lunch/Dinner": "Lunch/Dinner",
  Snack: "Snack",
  Teatime: "Tea",
};

export function Meals() {
  return (
    <>
      <div className="relative flex items-center justify-center bg-orange-50 py-14">
        <div className="section-divider">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="mb-10 flex w-full max-w-screen-xl flex-col max-sm:mb-5">
          <h2 className="mb-12 flex justify-center text-3xl font-bold max-sm:mb-6 max-sm:text-xl">
            <span className="font-bold text-yellow-400">— &nbsp;</span>Recipe
            Categories
          </h2>
          <div className="flex flex-row justify-evenly max-sm:mx-4">
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
    </>
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
      <div className="my-1 flex flex-col items-center justify-center gap-2 hover:scale-105 hover:cursor-pointer hover:brightness-110">
        <img
          className="h-32 w-32 rounded-full max-sm:h-14 max-sm:w-14"
          alt={mealType}
          src={img}
        />
        <p className="flex flex-wrap text-xl font-semibold max-sm:text-xs">
          {mealType}
        </p>
      </div>
    </Link>
  );
}
