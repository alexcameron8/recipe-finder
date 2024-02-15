import { Link } from "react-router-dom";
import { useCurrentUserResults } from "../App";
import { ProfileDropdown } from "./ProfileDropdown";
import { LuChefHat } from "react-icons/lu";
import { Alert } from "../alerts/Alert";

export function Navbar() {
  const { currentUser, setCurrentUser } = useCurrentUserResults();

  return (
    <>
    <div className="align-center flex flex-row bg-sky-500 px-2">
      <h2 className=" self-center font-semibold text-white">
        <Link className="flex flex-row items-center" to="/">
          <LuChefHat className="text-2xl" />
          &nbsp;RecipeApp
        </Link>
      </h2>
      <div className="my-1 ml-auto flex gap-1">
        {currentUser !== null ? (
          <ProfileDropdown />
          ) : (
            <>
            <button className="rounded-md bg-indigo-600 p-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <Link to="/login">Login</Link>
            </button>
            <button className="rounded-md bg-indigo-600 p-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <Link to="/register">Register</Link>
            </button>
          </>
        )}
      </div>
    </div>
    </>
  );
}
