import { create } from "zustand";
import { IStore } from "../interfaces/stores";


const useAppConfig = create<IStore.AppConfig>((set) => ({
    dark: "",
    locale: "",
    toggleDarkTheme: (yesNo?: boolean) =>
        set((state) => ({
            dark: yesNo !== undefined ? (yesNo ? "dark" : "") : state.dark === "dark" ? "" : "dark",
        })),
}));

export default useAppConfig;
