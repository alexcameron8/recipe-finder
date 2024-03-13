import { Divider, Button, ButtonGroup } from "@nextui-org/react";
import {
  FeaturedRecipeCard,
  SkeletonRecipeCard,
} from "./recipes/FeaturedRecipeCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function RecipeCarousel({ header, subheader, data, isLoading }) {
  let randomData;
  randomData = data;

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? randomData?.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      prevIndex === randomData?.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="w-1/4 max-w-screen-xl sm:w-5/12 md:w-3/5 lg:w-4/5 xl:w-full">
      <h2 className="text-2xl font-semibold">{header}</h2>
      <Divider className="my-2" />
      <h6 className="text-sm font-thin">{subheader}</h6>
      <div className="flex flex-row gap-2 overflow-hidden p-2">
        {randomData?.map((result, index) => {
          const currentIndex = (index + startIndex) % randomData.length;
          return (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              <FeaturedRecipeCard
                key={result.id}
                recipe={randomData[currentIndex]}
                isRecipeSaved={false}
                isLoading={isLoading}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="m-2 flex items-center justify-center">
        <ButtonGroup className="gap-1">
          <Button size="sm" onClick={handlePrev}>
            <FaArrowLeft />
          </Button>
          <Button size="sm" onClick={handleNext}>
            <FaArrowRight />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
