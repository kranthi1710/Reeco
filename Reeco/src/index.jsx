import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { state } from "./data";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css"; // Import the global CSS file
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={state}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
