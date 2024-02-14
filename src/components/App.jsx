import { Login } from "./users/Login";
import { Register } from "./users/Register";
import { Main } from "./Main";
import { Navbar } from "./navbar/Navbar";
import { RecipeInformation } from "./recipes/RecipeInformation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState } from "react";

// Create a context
const SearchResultsContext = createContext();
const CurrentUserContext = createContext(); //create this and apply to whole app?

// Custom hook to access the context
export const useSearchResults = () => useContext(SearchResultsContext);
export const useCurrentUserResults = () => useContext(CurrentUserContext);

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar />
        <SearchResultsContext.Provider
          value={{ searchResults, setSearchResults }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recipe/:id" element={<RecipeInformation />} />
          </Routes>
        </SearchResultsContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
