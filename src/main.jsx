import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppConfigProvider } from "./contexts/AppConfig.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppConfigProvider>
            <App />
        </AppConfigProvider>
    </StrictMode>
);
