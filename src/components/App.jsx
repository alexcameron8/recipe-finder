import { Login } from "./users/Login";
import { Register } from "./users/Register";
import { Home } from "./Home";
import { Navbar } from "./navbar/Navbar";
import { RecipeInformation } from "./recipes/RecipeInformation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { AlertList } from "./alerts/Alert";
import {UserRecipeList} from "./recipes/UserRecipeList"
import { Profile } from "./users/Profile";

// Create a context
const SearchResultsContext = createContext();
const CurrentUserContext = createContext(); //create this and apply to whole app?
const AlertContext = createContext()

// Custom hook to access the context
export const useSearchResults = () => useContext(SearchResultsContext);
export const useCurrentUserResults = () => useContext(CurrentUserContext);
export const useAlertsContext = () => useContext(AlertContext);

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [alerts, setAlerts] = useState([]);

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <AlertContext.Provider value={{ alerts, setAlerts }}>
      <AlertList />
        <Navbar />
        <SearchResultsContext.Provider
          value={{ searchResults, setSearchResults }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-recipes" element={<UserRecipeList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipe/:id" element={<RecipeInformation />} />
          </Routes>
        </SearchResultsContext.Provider>
        </AlertContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
