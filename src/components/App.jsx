import { Login } from "./users/Login";
import { Register } from "./users/Register";
import { Main } from "./Main";
import { Navbar } from "./navbar/Navbar";
import { RecipeInformation } from "./recipes/RecipeInformation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState } from "react";

// Create a context
const SearchResultsContext = createContext();

// Custom hook to access the context
export const useSearchResults = () => useContext(SearchResultsContext);

function App() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
