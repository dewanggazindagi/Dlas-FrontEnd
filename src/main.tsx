import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "react-day-picker/style.css";
import "./styles/dayPicker.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
