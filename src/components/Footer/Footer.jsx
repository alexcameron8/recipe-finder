import { LuChefHat } from "react-icons/lu";
import { Link } from "react-router-dom";
import "../index.css";
export function Footer() {
  return (
    <>
      <section className="w-full bg-orange-100">
        <div className="mx-auto max-w-screen-xl px-4 py-6">
          <div className="mb-2 grid grid-cols-3 gap-10 md:grid-cols-3 lg:grid-cols-12 lg:gap-14">
            <div className="col-span-3">
              <Link to="/">
                <span className="logo flex select-none flex-row text-xl font-black leading-none text-gray-900">
                  <LuChefHat className="" />
                  &nbsp;MyRecipe<span className="text-yellow-400">Seeker</span>
                </span>
              </Link>
              <p className="my-4 text-xs leading-normal text-gray-500">
                Discover Delicious Recipes Catered to Your Needs
              </p>
            </div>
            <nav className="col-span-1 md:col-span-1 lg:col-span-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Product
              </p>
              <a
                href="https://github.com/alexcameron8/recipe-finder/blob/main/README.md"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Features
              </a>
              <a
                href="https://github.com/alexcameron8/recipe-finder/blob/main/README.md"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Documentation
              </a>
            </nav>
            <nav className="col-span-1 md:col-span-1 lg:col-span-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                About
              </p>
              <a
                href="#"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700  md:mb-2"
              >
                Our Story
              </a>
              <a
                href="#"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700  md:mb-2"
              >
                Company
              </a>
              <a
                href="#"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Privacy
              </a>
              <a
                href="https://www.acameron.tech/"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Portfolio
              </a>
            </nav>
            <nav className="col-span-1 md:col-span-1 lg:col-span-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Contact
              </p>
              <a
                href="#"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Advertising
              </a>
              <a
                href="#"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Press
              </a>
              <a
                href="https://mail.google.com/mail/u/0/?fs=1&to=alex8cameron@gmail.com&tf=cm"
                className="mb-3 flex text-sm font-medium text-gray-500 transition hover:text-gray-700 md:mb-2"
              >
                Email
              </a>
            </nav>
            <div className="col-span-3">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Socials
              </p>
              <span className="mt-4 inline-flex justify-center space-x-5 sm:ml-auto sm:mt-0 sm:justify-start">
                <a
                  href="https://www.linkedin.com/in/alexcameron8/"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    id="Layer_1"
                    style={{ enableBackground: "new 0 0 67 67" }}
                    version="1.1"
                    viewBox="0 0 67 67"
                    width="67px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      d="M49.837,48.137V36.425c0-6.275-3.35-9.195-7.816-9.195  c-3.604,0-5.219,1.983-6.119,3.374V27.71h-6.79c0.09,1.917,0,20.427,0,20.427h6.79V36.729c0-0.609,0.044-1.219,0.224-1.655  c0.49-1.22,1.607-2.483,3.482-2.483c2.458,0,3.44,1.873,3.44,4.618v10.929H49.837z M21.959,24.922c2.367,0,3.842-1.57,3.842-3.531  c-0.044-2.003-1.475-3.528-3.797-3.528s-3.841,1.524-3.841,3.528c0,1.961,1.474,3.531,3.753,3.531H21.959z M33,64  C16.432,64,3,50.568,3,34C3,17.431,16.432,4,33,4s30,13.431,30,30C63,50.568,49.568,64,33,64z M25.354,48.137V27.71h-6.789v20.427  H25.354z"
                      r="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/alexcameron8/recipe-finder"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      r="evenodd"
                    ></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-start justify-between border-t border-gray-100 pt-10 sm:mt-10 md:flex-row md:items-center">
            <p className="mb-6 text-left text-sm text-gray-600 md:mb-0">
              © Copyright 2024 MyRecipeSeeker. All Rights Reserved.
            </p>
            <div className="flex items-start justify-start space-x-6 md:items-center md:justify-center">
              <a
                href="#_"
                className="text-sm text-gray-600 transition hover:text-primary"
              >
                Terms
              </a>
              <a
                href="#_"
                className="text-sm text-gray-600 transition hover:text-primary"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
