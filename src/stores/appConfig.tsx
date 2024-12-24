import { create } from "zustand";

interface AppConfig {
    dark: string;
    locale: string;
    toggleDarkTheme: (yesNo?: boolean) => void;
}

const useAppConfig = create<AppConfig>((set) => ({
    dark: "",
    locale: "",
    toggleDarkTheme: (yesNo?: boolean) =>
        set((state) => ({
            dark: yesNo !== undefined ? (yesNo ? "dark" : "") : state.dark === "dark" ? "" : "dark",
        })),
}));

export default useAppConfig;
