import { Login } from "./users/Login";
import { Register } from "./users/Register";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Login/>
      <Register/>
    </div>
  );
}

export default App;
