import { ButtonGroup, Button, Skeleton } from "@nextui-org/react";
import { FaDisplay } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { BannerItem } from "./BannerItem";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdPeople } from "react-icons/md";

export function Landing() {
  return (
    <div className="mb-10 flex w-full max-w-screen-xl flex-row">
      <div className="flex basis-3/5 flex-col items-start justify-start">
        <h1 className="mt-20 text-4xl font-bold">
          Discover <span className="text-yellow-400">Delicious Recipes</span>
          <br />
          Catered to Your Needs{" "}
        </h1>
        <div className="mt-12 flex flex-row gap-4">
          <Button
            color="warning"
            variant="shadow"
            radius="full"
            fullWidth="true"
          >
            Learn More
          </Button>
          <Button variant="shadow" radius="full" fullWidth="true">
            <FaDisplay />
            Watch a Demo
          </Button>
        </div>
        <div className="mt-20 flex flex-row gap-10">
          <BannerItem
            icon={<ImBooks color="white" />}
            header="Over 2,000,000+"
            description="recipes for all your needs"
          />
          <BannerItem
            icon={<AiOutlineOrderedList color="white" />}
            header="Cooking instructions"
            description="to help you make yummy meals"
          />
          <BannerItem
            icon={<MdPeople color="white" />}
            header="Communities"
            description="to share and get inspired by others"
          />
          {/* <BannerItem
            icon={<MdPeople color="white" />}
            header="Save"
            description="your recipes so you don't forget them later"
          /> */}
        </div>
      </div>
      <div className="flex w-full basis-2/5 items-center justify-center rounded-bl-full rounded-tl-full bg-yellow-400  pl-16">
        <img
          className="bottom-0 flex h-80 w-60 rounded-lg"
          src="/assets/cooking-bw.jpg"
          alt="landing-recipe"
        />
      </div>
    </div>
  );
}
