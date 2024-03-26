import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";
import { useCurrentUserResults } from "../App";
import { Link } from "react-router-dom";
import { useAlertsContext } from "../App";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUserResults();
  const { alerts, setAlerts } = useAlertsContext();

  const addAlert = (type, message) => {
    const newAlerts = [...alerts, { type, message }];
    setAlerts(newAlerts);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  function handleLogOut() {
    localStorage.removeItem("token");
    setCurrentUser(null);
    addAlert("info", "Log out successful.");
  }
  return (
    <div>
      <button
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        className="inline-flex items-center rounded-full border-1 border-orange-200 bg-orange-100 p-0.5 text-center text-4xl font-medium text-white focus:bg-blue-300 "
        type="button"
        onClick={toggleDropdown} // Add onClick handler to toggle dropdown visibility
      >
        <MdAccountCircle color="black" />
      </button>

      <div
        id="dropdownInformation"
        className={`absolute z-10 ${isOpen ? "block" : "hidden"} right-0 mr-1 w-44 divide-y divide-gray-100 rounded-lg border-1 border-orange-200 bg-orange-100 shadow`}
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
            <Link
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              to="/my-recipes"
            >
              My Recipes
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              to="/profile"
            >
              Profile Settings
            </Link>
          </li>
        </ul>
        <div className="py-2">
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleLogOut}
          >
            <Link to="/login">Logout</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
