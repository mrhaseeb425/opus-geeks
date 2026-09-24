import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import "./index.css";
import "./styles/polish.css";
import "./styles/hero.css";
import "./styles/sections.css";
import "./styles/theme.css";
import "./styles/type.css";
import "./styles/editorial.css";
import "./styles/system.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
