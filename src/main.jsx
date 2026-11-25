import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import { UIProvider } from "./context/UIProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UIProvider>
        <App />
      </UIProvider>
    </ThemeProvider>
  </StrictMode>
);
