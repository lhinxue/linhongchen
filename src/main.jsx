import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppConfigProvider } from "./contexts/AppConfig.jsx";
import { ConfigProvider } from "antd";
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <NextUIProvider>
            <AppConfigProvider>
                <ConfigProvider
                    theme={{
                        token: {
                            fontFamily: `Genshin, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
                        },
                    }}
                >
                    <App />
                </ConfigProvider>
            </AppConfigProvider>
        </NextUIProvider>
    </StrictMode>
);
