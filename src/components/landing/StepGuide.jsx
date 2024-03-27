import { GrUserNew } from "react-icons/gr";
import { BsSearch, BsSearchHeart } from "react-icons/bs";
import { VscListOrdered } from "react-icons/vsc";
import { Divider } from "@nextui-org/react";

export function StepGuide() {
  return (
    // <div className="bg-gray-100">
    <div className="relative flex flex-col items-center justify-center bg-orange-50 pb-7">
      <Divider className="" />
      <div className="mb-10 flex w-full max-w-screen-xl flex-col items-center justify-center pt-7 ">
        <h2 className="mb-10 text-3xl font-bold max-sm:text-xl">
          <span className="font-bold text-yellow-400">— &nbsp;</span>How it
          Works
        </h2>
        <div className="flex flex-row gap-2 md:gap-8">
          <img
            className="ml-8 flex h-fit w-1/2 self-center rounded-md max-sm:hidden "
            src="/assets/cooking-pour.jpg"
            alt="steps-landing-cook"
          />
          <div className="flex w-1/2 flex-col gap-12 max-sm:w-full max-sm:px-4">
            <Step
              icon={<GrUserNew color="white" />}
              header="Sign Up"
              description="Get started today and signup."
              color="bg-black"
            />
            <Step
              icon={<BsSearch />}
              header="Search and Explore Recipes"
              description="Search recipes using the search feature powered by Edamam API"
              color="bg-yellow-400"
            />
            <Step
              icon={<VscListOrdered />}
              header="Cooking Instructions"
              description="Find a recipe, gather the ingredients and follow along with the instructions to cook your desired dish."
              color="bg-yellow-400"
            />
            <Step
              icon={<BsSearchHeart />}
              header="Save Recipes for Later"
              description="Save your recipes to your recipe list to easily reference later."
              color="bg-yellow-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Step({ icon, header, description, color }) {
  return (
    <div className="flex flex-row ">
      <div
        className={`
        mr-4
        flex
        h-fit
        w-fit
        justify-center
        rounded-full
       ${color}
        p-5
        text-3xl
        max-sm:text-xl
        `}
      >
        {icon}
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <h3 className="text-2xl font-bold max-sm:text-xl">{header}</h3>
        <p className="flex flex-wrap text-lg font-semibold max-md:text-base max-sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
