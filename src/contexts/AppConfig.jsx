import { createContext, useContext, useEffect, useState } from "react";
import Locale from "../utils/localeManagement";

const AppConfig = createContext(undefined);

const useAppConfig = () => useContext(AppConfig);

const AppConfigProvider = ({ children }) => {
    const [locale, _locale] = useState(Locale.get());

    return <AppConfig.Provider value={{ locale, _locale }}>{children}</AppConfig.Provider>;
};

export { useAppConfig, AppConfigProvider };
