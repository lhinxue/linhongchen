import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppConfigProvider } from "./contexts/AppConfig.jsx";
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <NextUIProvider>
            <AppConfigProvider>
                <App />
            </AppConfigProvider>
        </NextUIProvider>
    </StrictMode>
);
