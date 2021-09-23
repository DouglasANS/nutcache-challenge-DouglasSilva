import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import DataProvider from "./context/DataContext";

ReactDOM.render(
  <DataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DataProvider>,
  document.getElementById("root")
);
