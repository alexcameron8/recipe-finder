import { Login } from "./users/Login";
import { Register } from "./users/Register";
import { Main } from "./Main";
import { Navbar } from "./navbar/Navbar";
import { RecipeInformation } from "./recipes/RecipeInformation";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipe/:id" element={<RecipeInformation />} />
      </Routes>
      {/* <Search /> */}
    </BrowserRouter>
  );
}

export default App;
