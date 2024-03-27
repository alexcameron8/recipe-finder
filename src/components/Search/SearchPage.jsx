import { Search } from "./Search";
import { RecipeList } from "../recipes/RecipeList";
import { Nav } from "../navbar/Navbar";
import { Footer } from "../Footer/Footer";
import "../index.css";

export function SearchPage() {
  return (
    <>
      <Nav />
      <div>
        <div className="flex flex-col justify-center bg-orange-50 pt-10">
          <div className="mb-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Find <span className="font-bold text-yellow-400">New</span>{" "}
              Recipes{" "}
              <span className="font-bold">
                Now
                <br />
                <span className="text-2xl font-bold lg:text-3xl"></span>
              </span>
            </h2>
            <p className="mt-2 flex flex-row text-lg font-semibold">
              Savor the Possibilities by Adding Recipes to your own List of
              Recipes!
            </p>
          </div>
          <Search />
          <RecipeList />
        </div>
        <div className="footer-section-divider bg-orange-50">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <Footer />
      </div>
    </>
  );
}
