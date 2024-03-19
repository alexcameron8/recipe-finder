/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  CircularProgress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoMdClose } from "react-icons/io";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useState } from "react";
import { IoTimerOutline } from "react-icons/io5";

export function RecipeInfoModal({
  recipe,
  isOpen,
  onClose,
  isSaving,
  isSaved,
  handleSaveClick,
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const handleImageError = (event) => {
    // If the image fails to load due to CORB, set a fallback image
    event.target.src = "/assets/no-photo.png";
  };

  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      scrollBehavior="inside"
      shadow="md"
      placement="top"
      hideCloseButton={true}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="mb-2 text-3xl font-bold max-sm:text-2xl">
            {recipe.name}
          </h2>
          <div className="absolute right-0 top-0 mr-4 mt-4 flex">
            <button
              className="flex items-center rounded-full p-1 text-3xl hover:bg-default"
              onClick={handleSaveClick}
            >
              {isSaving ? (
                <CircularProgress
                  size="sm"
                  color="danger"
                  aria-label="Loading..."
                />
              ) : isSaved ? (
                <IoMdHeart color="#f31260" />
              ) : (
                <IoMdHeartEmpty />
              )}
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-row max-md:flex-col max-md:gap-2">
            <img
              src={recipe.image}
              className="mr-12 flex h-72 w-full flex-1 items-center justify-center rounded-xl object-cover max-md:mr-4"
              alt={recipe.name}
              onError={handleImageError}
            />
            <div className="flex-1">
              <h3 className="font-medium underline">Ingredients List</h3>
              <ol className="my-1 list-inside list-decimal">
                {recipe.ingredientLines.map((ingredient, index) => (
                  <li className="text-sm" key={index}>
                    {ingredient}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="min-h-screen w-full rounded-t-xl bg-white">
            {/* <h2 className="mb-2 text-3xl font-bold">{recipe.name}</h2> */}
            <h3 className="font-medium">Author: {recipe.source}</h3>
            <hr className="my-3 h-0.5 rounded border-0 bg-gray-600" />
            {recipe.totalTime > 0 && (
              <h4 className=" flex flex-row items-center font-light">
                <IoTimerOutline /> &nbsp;
                {recipe.totalTime} mins
              </h4>
            )}
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList className="my-3 flex flex-row gap-2 hover:cursor-pointer">
                <Tab
                  className={
                    tabIndex === 0 ? "font-medium underline" : "font-normal"
                  }
                >
                  <h3 className="">Health & Allergens</h3>
                </Tab>
                <Tab
                  className={
                    tabIndex === 1 ? "font-medium underline" : "font-normal"
                  }
                >
                  <h3>Nutrition Facts</h3>
                </Tab>
              </TabList>
              <hr className="h-px rounded border-0 bg-gray-300" />
              <TabPanel>
                <div className="my-3 flex items-center justify-center p-1">
                  <table className="w-full table-auto border-collapse border border-gray-500">
                    <thead>
                      <tr>
                        <th className="border border-gray-500 px-4 py-2">
                          Nutrient
                        </th>
                        <th className="border border-gray-500 px-4 py-2">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(recipe.totalNutrients).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td className="border border-gray-500 px-4 py-2 text-sm">
                              {value.label}
                            </td>
                            <td className="border border-gray-500 px-4 py-2 text-sm">
                              {parseFloat(value.quantity).toFixed(1)}{" "}
                              {value.unit}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel>
                <div>
                  <ol className="my-3 list-inside list-decimal">
                    {recipe.healthLabels.map((healthLabel, index) => (
                      <li className="text-sm" key={index}>
                        {healthLabel}
                      </li>
                    ))}
                  </ol>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
            className="max-sm:text-md text-lg"
          >
            <IoMdClose className="text-xl max-sm:text-lg" />
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
