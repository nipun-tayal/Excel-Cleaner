import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";   // 👈 THIS LINE WAS MISSING

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);