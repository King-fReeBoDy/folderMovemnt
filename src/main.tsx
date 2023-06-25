import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextAPI from "./context/AuthContext";
import DataContextAPI from "./context/DataContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataContextAPI>
        <AuthContextAPI>
          <App />
        </AuthContextAPI>
      </DataContextAPI>
    </BrowserRouter>
  </React.StrictMode>
);
