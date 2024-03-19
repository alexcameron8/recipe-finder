import { ButtonGroup, Button, Skeleton } from "@nextui-org/react";
import { FaDisplay } from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { BannerItem } from "./BannerItem";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdPeople } from "react-icons/md";
import { Cover } from "./Cover";
import { Meals } from "./Meals";
import { StepGuide } from "./StepGuide";
import { Link } from "react-router-dom";
import { useCurrentTabContext } from "../App";
import { Demo } from "./Demo";
export function Landing() {
  const { curTab, setCurTab } = useCurrentTabContext();

  return (
    <div className="max-sm:mx-2">
      <div className="flex w-full max-w-screen-xl flex-row max-md:items-center max-md:justify-center">
        <div className="mt-10 flex basis-3/5 flex-col items-start justify-start max-sm:basis-full lg:mt-28">
          <h1 className="text-3xl font-bold tracking-tight lg:text-5xl">
            Discover <span className="text-yellow-400">Delicious Recipes</span>
            <br />
            Catered to Your Needs{" "}
          </h1>
          <div className="my-20 flex flex-row gap-4 max-sm:my-10">
            <Button
              color="warning"
              variant="shadow"
              radius="full"
              fullWidth="true"
              className="font-semibold"
            >
              <Link
                onClick={() => setCurTab("search")}
                color="foreground"
                to="/search"
              >
                Get Started
              </Link>
            </Button>
            <Button
              variant="shadow"
              radius="full"
              fullWidth="true"
              className="font-semibold"
            >
              <a
                href="#demo"
                className="flex flex-row items-center"
                onClick={() => setCurTab("home")}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Watch a Demo
              </a>
            </Button>
          </div>
          <div className="max-sm:space-evenly flex flex-row max-sm:mt-5 max-sm:gap-4 md:mb-10 md:mt-20 md:gap-10">
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
          </div>
        </div>
        <div className="flex w-full basis-2/5 items-center justify-center rounded-bl-full rounded-tl-full bg-yellow-400 pl-16  max-md:hidden">
          <img
            className="bottom-0 flex h-80 w-60 rounded-lg"
            src="/assets/cooking-bw.jpg"
            alt="landing-recipe"
          />
        </div>
      </div>
      <Meals />
      <Cover />
      <StepGuide />
      <Demo />
    </div>
  );
}
