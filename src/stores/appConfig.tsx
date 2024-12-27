import { create } from "zustand";

interface AppConfigStore {
    dark: string;
    locale: string;
    toggleDarkTheme: (yesNo?: boolean) => void;
}

const useAppConfig = create<AppConfigStore>((set) => ({
    dark: "",
    locale: "",
    toggleDarkTheme: (yesNo?: boolean) =>
        set((state) => ({
            dark: yesNo !== undefined ? (yesNo ? "dark" : "") : state.dark === "dark" ? "" : "dark",
        })),
}));

export default useAppConfig;
