import { Divider, Button, ButtonGroup } from "@nextui-org/react";
import {
  FeaturedRecipeCard,
  SkeletonRecipeCard,
} from "./recipes/FeaturedRecipeCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { color, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
export function RecipeCarousel({ header, subheader, data, isLoading }) {
  const [startIndex, setStartIndex] = useState(0);
  let sliderRef = useRef(null);

  const handlePrev = () => {
    sliderRef.slickPrev();
  };

  const handleNext = () => {
    sliderRef.slickNext();
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    lazyLoad: true,
    arrows: false,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };
  return (
    <div className="my-10">
      <div className="flex flex-row items-center max-sm:justify-center">
        <h2 className="text-2xl font-semibold max-sm:ml-2">{header}</h2>
        <div className="m-2">
          <ButtonGroup className="gap-1">
            <Button
              style={{ backgroundColor: "#fed7aa" }}
              size="sm"
              onClick={handlePrev}
            >
              <FaArrowLeft />
            </Button>
            <Button
              style={{ backgroundColor: "#fed7aa" }}
              size="sm"
              onClick={handleNext}
            >
              <FaArrowRight />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Divider className="my-2 max-sm:justify-center" />
      <h6 className="mb-4 text-sm font-thin max-sm:ml-2 max-sm:flex max-sm:justify-center">
        {subheader}
      </h6>
      <div className="py-4">
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings}
        >
          {!isLoading
            ? data.map((result, index) => (
                <FeaturedRecipeCard
                  key={result.id}
                  recipe={result}
                  isRecipeSaved={false}
                  isLoading={isLoading}
                />
              ))
            : Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRecipeCard key={index} />
              ))}
        </Slider>
      </div>
    </div>
  );
}

// export function RecipeCarousel({ header, subheader, data, isLoading }) {
//   let randomData;
//   randomData = data;

//   const [startIndex, setStartIndex] = useState(0);

//   const handlePrev = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === 0 ? randomData?.length - 1 : prevIndex - 1,
//     );
//   };

//   const handleNext = () => {
//     setStartIndex((prevIndex) =>
//       prevIndex === randomData?.length - 1 ? 0 : prevIndex + 1,
//     );
//   };

//   return (
//     <div className="w-1/4 max-w-screen-xl sm:w-5/12 md:w-3/5 lg:w-4/5 xl:w-full">
//       <h2 className="text-2xl font-semibold">{header}</h2>
//       <Divider className="my-2" />
//       <h6 className="text-sm font-thin">{subheader}</h6>
//       <div className="flex flex-row gap-2 overflow-hidden p-2">
//         {randomData?.map((result, index) => {
//           const currentIndex = (index + startIndex) % randomData.length;
//           return (
//             <motion.div
//               key={result.id}
//               initial={{ opacity: 0, x: -100 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 100 }}
//               transition={{ duration: 0.5 }}
//             >
//               <FeaturedRecipeCard
//                 key={result.id}
//                 recipe={randomData[currentIndex]}
//                 isRecipeSaved={false}
//                 isLoading={isLoading}
//               />
//             </motion.div>
//           );
//         })}
//       </div>
//       <div className="m-2 flex items-center justify-center">
//         <ButtonGroup className="gap-1">
//           <Button size="sm" onClick={handlePrev}>
//             <FaArrowLeft />
//           </Button>
//           <Button size="sm" onClick={handleNext}>
//             <FaArrowRight />
//           </Button>
//         </ButtonGroup>
//       </div>
//     </div>
//   );
// }
