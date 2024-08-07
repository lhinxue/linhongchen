import { createContext, useContext, useState } from "react";

export const AppConfig = createContext();

export function AppConfigProvider({ children }) {
    const [lang, _lang] = useState("en");

    return <AppConfig.Provider value={{ lang, _lang }}>{children}</AppConfig.Provider>;
}

export function useLang() {
    const { lang, _lang } = useContext(AppConfig);
    const list = ["en", "zh", "jp"];
    return [lang, _lang, list];
}
