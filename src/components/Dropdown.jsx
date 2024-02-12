import { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

export function Dropdown({
  dropdown_name,
  dropdown_data,
  isSelected,
  setIsSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleCheckboxChange = (apiParameter) => {
    setIsSelected((prevSelected) => {
      // Check if the dietary restriction is already in filter
      if (prevSelected.includes(apiParameter)) {
        //remove
        return prevSelected.filter((item) => item !== apiParameter);
      } else {
        //or add
        return [...prevSelected, apiParameter];
      }
    });
  };

  return (
    <div>
      <button
        id="dropdownBgHoverButton"
        data-dropdown-toggle="dropdownBgHover"
        className="dark:hover:bg-gray-00 inline-flex items-center rounded-lg bg-gray-700 px-2.5 py-1.5 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:focus:ring-blue-300"
        type="button"
        onClick={toggleDropdown} // Add onClick handler to toggle dropdown visibility
      >
        {dropdown_name} &nbsp;
        {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </button>
      <div
        id="dropdownBgHover"
        className={`absolute left-0 top-full z-10 ${isOpen ? "" : "hidden"} rounded-lg bg-white shadow dark:bg-gray-700`}
      >
        <ul
          className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownBgHoverButton"
        >
          {dropdown_data?.map((label) => (
            <li key={label.apiParameter}>
              <div className="flex w-auto items-center rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  id={`checkbox-item-${label.apiParameter}`}
                  type="checkbox"
                  value=""
                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  onChange={() => handleCheckboxChange(label.apiParameter)}
                  checked={isSelected?.includes(label.apiParameter)} //set checked if filter applied
                />
                <label
                  htmlFor={`checkbox-item-${label.apiParameter}`}
                  className="ms-2 w-auto rounded text-xs font-medium text-gray-900 dark:text-gray-300"
                >
                  {label.webLabel}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
