import { ButtonGroup, Button, Skeleton } from "@nextui-org/react";
import { useState } from "react";
import { Divider } from "@nextui-org/react";

export function Cover() {
  const images = [
    { src: "/assets/icons/greek-cover.jpg", label: "Greek" },
    { src: "/assets/icons/indian-cover.jpg", label: "Indian" },
    { src: "/assets/icons/japanese-cover.jpg", label: "Japanese" },
    { src: "/assets/icons/italian-cover.jpg", label: "Italian" },
  ];

  return (
    <div>
      <Divider className="my-14" />
      <div className="mb-10  flex w-full max-w-screen-xl flex-row max-sm:flex-col max-sm:items-center max-sm:justify-center">
        <div className=" mx-8 flex w-1/2 flex-col items-center justify-center max-sm:w-full">
          <h2 className="mb-4 self-start text-4xl font-bold max-sm:text-2xl">
            Enjoy recipes from all
            <br />
            over<span className="text-yellow-400"> the world</span>
          </h2>
          <p className="flex flex-wrap text-lg font-semibold max-sm:mb-4 max-sm:text-sm">
            Explore a culinary journey like no other, where recipes from all
            corners of the globe come together, each crafted by talented cooks
            just like you.
          </p>
        </div>
        <div className="mr-20 grid w-1/2 grid-cols-2 gap-4 max-sm:mr-0 max-sm:w-full">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.src}
                alt={image.label}
                className="h-auto w-full"
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-white bg-opacity-75">
                <div className="rounded-md px-2 py-1 text-sm">
                  {image.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
