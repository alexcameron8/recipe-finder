import { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

export function Filter({
  filter_name,
  filter_data,
  isSelected,
  setIsSelected,
  filterType,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleCheckboxChange = (apiParameter) => {
    setIsSelected((prevSelected) => {
      // Check if the dietary restriction is already in filter
      // Check if the dietary restriction is already in filter
      const existingFilter = prevSelected.find(
        (item) =>
          item.filter === apiParameter && item.filterType === filterType,
      );
      if (existingFilter) {
        // Remove the existing filter
        return prevSelected.filter(
          (item) =>
            !(item.filter === apiParameter && item.filterType === filterType),
        );
      } else {
        //or add new filter
        return [
          ...prevSelected,
          { filter: apiParameter, filterType: filterType },
        ];
      }
    });
  };
  return (
    <div>
      <h2 className="mx-1 font-semibold">{filter_name}</h2>
      <ul
        className="max-rows-10 border-slate grid grid-cols-2 gap-4 overflow-y-auto rounded-md border-2 bg-orange-100 p-3 text-sm text-gray-700 dark:text-gray-200 max-sm:gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5	"
        aria-labelledby="dropdownBgHoverButton"
      >
        {filter_data?.map((filter_item, index) => {
          return (
            <li key={`filter-item-"${filter_item}`}>
              <div className="flex w-auto items-center rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id={`checkbox-item-${filter_item}`}
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  onChange={() => handleCheckboxChange(filter_item)}
                  checked={isSelected?.some(
                    (item) =>
                      item.filter === filter_item &&
                      item.filterType === filterType,
                  )}
                />
                <label
                  htmlFor={`checkbox-item-${filter_item}`}
                  className="ms-2 w-auto rounded text-xs font-medium text-gray-900 dark:text-gray-300"
                >
                  {filter_item}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
