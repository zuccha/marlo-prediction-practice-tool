import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import MainView from "./views/MainView";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainView />
  </React.StrictMode>
);
