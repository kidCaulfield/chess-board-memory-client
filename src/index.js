import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api/v1/";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
