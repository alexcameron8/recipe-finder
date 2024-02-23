import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <main className="bg-background text-foreground light">
      <App />
    </main>
  </React.StrictMode>,
);
