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
import bgsvg from "/assets/landing/layered-waves-haikei.svg"; // Import the SVG file
import bgsvg1 from "/assets/landing/wave-haikei.svg"; // Import the SVG file
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";
import { Footer } from "../Footer/Footer";
import { FaHeart } from "react-icons/fa";
import { Nav } from "../navbar/Navbar";
import "../index.css";

export function Landing() {
  const { curTab, setCurTab } = useCurrentTabContext();
  return (
    <>
      <Nav />
      <div className="w-full">
        <div className="flex w-full flex-row bg-orange-50 max-md:items-center max-md:justify-center">
          <div className="relative z-10 mt-10 flex w-full flex-col items-center justify-center lg:mt-20">
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Discover{" "}
              <span className="text-yellow-400">Delicious Recipes</span>
              <br />
              Catered to Your Needs{" "}
            </h1>
            <div className="my-12 flex flex-row gap-6 max-sm:my-10 ">
              <Button
                color="warning"
                variant="shadow"
                radius="full"
                fullWidth="true"
                className="font-semibold "
              >
                <Link
                  onClick={() => setCurTab("search")}
                  color="foreground"
                  to="/search"
                  className="max-sm:text-sm"
                >
                  Get Started
                </Link>
              </Button>
              <Button
                variant="shadow"
                radius="full"
                fullWidth="true"
                className="font-semibold max-sm:text-sm"
              >
                <a
                  href="#demo"
                  className="flex flex-row items-center max-sm:text-sm"
                  onClick={() => setCurTab("home")}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Watch a Demo
                </a>
              </Button>
            </div>
            <div className="mb-20 flex flex-row items-start gap-3 max-lg:mx-4 sm:gap-10 md:gap-20">
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
        </div>

        <div
          className="spacer"
          style={{ backgroundImage: `url(${bgsvg})` }}
        ></div>
        <Meals />
        <Cover />
        <StepGuide />
        <Demo />
        <Footer />
      </div>
    </>
  );
}
