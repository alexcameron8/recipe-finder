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

export function Landing() {
  const { curTab, setCurTab } = useCurrentTabContext();
  const ref = useRef();

  return (
    <div className="overflow-hidden">
      <Parallax pages={4} ref={ref}>
        {/* Background Parallax Layer */}
        <ParallaxLayer
          offset={0}
          speed={0.5}
          factor={1.5}
          style={{
            backgroundImage: `url(${bgsvg})`,
            backgroundSize: "cover",
          }}
        />

        {/* Landing page content */}
        <ParallaxLayer
          offset={1}
          speed={0.5}
          factor={1.5}
          style={{
            backgroundImage: `url(${bgsvg1})`,
            backgroundSize: "cover",
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          offset={0}
          speed={0.05}
          // onClick={() => ref.current.scrollTo(2)}
        >
          <div className="flex w-full flex-row max-md:mx-2 max-md:items-center max-md:justify-center lg:pb-64 xl:pb-80">
            <div className="relative z-10 mb-52 mt-10 flex w-full flex-col items-center justify-center lg:mt-28">
              <h1 className="text-3xl font-bold tracking-tight max-md:text-center md:text-5xl">
                Discover{" "}
                <span className="text-yellow-400">Delicious Recipes</span>
                <br />
                Catered to Your Needs{" "}
              </h1>
              <div className="my-28 flex flex-row gap-12 max-sm:my-10">
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
              <div className="max-md:text flex flex-row gap-10 max-md:grid max-md:grid-cols-2 max-md:gap-2">
                <BannerItem
                  icon={<ImBooks color="white" />}
                  header="Over 2,000,000+"
                  description="recipes for all your needs"
                />
                <BannerItem
                  icon={<AiOutlineOrderedList color="white" />}
                  header="Cooking Instructions"
                  description="to help you make yummy meals"
                />
                <BannerItem
                  icon={<MdPeople color="white" />}
                  header="Communities"
                  description="to share and get inspired by others"
                />
                <BannerItem
                  icon={<FaHeart color="white" />}
                  header="Find & Save"
                  description="recipes to enjoy later"
                />
              </div>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1.1}
          speed={0.05}
          // onClick={() => ref.current.scrollTo(0)}
        >
          <Meals />
          <Cover />
          <StepGuide />
          <Demo />
        </ParallaxLayer>
        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 z-50 w-full bg-orange-50">
          <Footer />
        </div>
      </Parallax>
    </div>
  );
}
// export function Landing() {
//   const { curTab, setCurTab } = useCurrentTabContext();
//   const ref = useRef();

//   return (
//     <div className="w-full max-sm:mx-2">
//       <div
//         className="flex w-full flex-row max-md:items-center max-md:justify-center lg:pb-64 xl:pb-80"
//         // style={{
//         //   backgroundImage: `url(${BackgroundSVG})`,
//         //   backgroundRepeat: "no-repeat",
//         //   backgroundPosition: "bottom",
//         //   backgroundSize: "cover",
//         //   backgroundAttachment: "fixed",
//         //   backgroundBlendmode: "lighten",
//         // }}
//       >
//         <div className="relative z-10 mb-52 mt-10 flex w-full flex-col items-center justify-center lg:mt-28">
//           <h1 className="text-3xl font-bold tracking-tight lg:text-5xl">
//             Discover <span className="text-yellow-400">Delicious Recipes</span>
//             <br />
//             Catered to Your Needs{" "}
//           </h1>
//           <div className="my-8 flex flex-row gap-6 max-sm:my-10">
//             <Button
//               color="warning"
//               variant="shadow"
//               radius="full"
//               fullWidth="true"
//               className="font-semibold"
//             >
//               <Link
//                 onClick={() => setCurTab("search")}
//                 color="foreground"
//                 to="/search"
//               >
//                 Get Started
//               </Link>
//             </Button>
//             <Button
//               variant="shadow"
//               radius="full"
//               fullWidth="true"
//               className="font-semibold"
//             >
//               <a
//                 href="#demo"
//                 className="flex flex-row items-center"
//                 onClick={() => setCurTab("home")}
//                 style={{ color: "inherit", textDecoration: "inherit" }}
//               >
//                 Watch a Demo
//               </a>
//             </Button>
//           </div>
//           <div className="mb-20 flex flex-row gap-20">
//             <BannerItem
//               icon={<ImBooks color="white" />}
//               header="Over 2,000,000+"
//               description="recipes for all your needs"
//             />
//             <BannerItem
//               icon={<AiOutlineOrderedList color="white" />}
//               header="Cooking instructions"
//               description="to help you make yummy meals"
//             />
//             <BannerItem
//               icon={<MdPeople color="white" />}
//               header="Communities"
//               description="to share and get inspired by others"
//             />
//           </div>
//         </div>
//       </div>
//       <Meals />
//       <Cover />
//       <StepGuide />
//       <Demo />
//     </div>
//   );
// }
