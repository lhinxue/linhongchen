import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppConfigProvider } from "./Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NextUIProvider className="light">
            <AppConfigProvider>
                <App />
            </AppConfigProvider>
        </NextUIProvider>
    </React.StrictMode>
);
