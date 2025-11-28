import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./App.css";
import "material-symbols/outlined.css";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <h1>FPrime</h1>
  </StrictMode>,
);
