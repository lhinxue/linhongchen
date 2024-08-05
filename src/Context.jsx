import { createContext, useState } from "react";

export const AppConfig = createContext();

export function AppConfigProvider({ children }) {
    const [lang, _lang] = useState("en");

    return <AppConfig.Provider value={{ lang, _lang }}>{children}</AppConfig.Provider>;
}
