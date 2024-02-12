import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="align-center flex flex-row bg-sky-500 px-2">
      <h2 className="self-center font-semibold text-white">
        <Link to="/">Recipe App</Link>
      </h2>
      <div className="my-1 ml-auto flex gap-1">
        <button className=" rounded-md bg-indigo-600 p-2 py-1 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <Link to="/login">Login</Link>
        </button>
        <button className=" rounded-md bg-indigo-600 p-2 py-1 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
}
