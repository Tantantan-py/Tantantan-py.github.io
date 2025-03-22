import React from "react";
import ReactDOM from "react-dom/client";
// remove the # from your URLs.
import { BrowserRouter as Router } from "react-router-dom";
// Below is for Github Pages
// import { HashRouter as Router } from "react-router-dom";

import App from "./App.jsx";

// ✅ Global CSS imports to ensure styles load everywhere
import "./css/common.css";
import "./css/home.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
