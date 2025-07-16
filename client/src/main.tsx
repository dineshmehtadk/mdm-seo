import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");

if (container) {
  hydrateRoot(
    container,
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="securemdm-ui-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
}
