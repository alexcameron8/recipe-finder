import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";
import { useCurrentUserResults } from "../App";
import { Link } from "react-router-dom";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUserResults();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        className="inline-flex items-center rounded-full p-0.5 text-center text-3xl font-medium text-white focus:bg-blue-300 "
        type="button"
        onClick={toggleDropdown} // Add onClick handler to toggle dropdown visibility
      >
        <MdAccountCircle color="black" />
      </button>

      <div
        id="dropdownInformation"
        className={`absolute z-10 ${isOpen ? "block" : "hidden"} right-0 mr-1 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{currentUser?.firstName + " " + currentUser?.lastName}</div>
          <div className="truncate font-medium">{currentUser?.email}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              My Recipes
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setCurrentUser(null)}
          >
            <Link to="/login">Logout</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
