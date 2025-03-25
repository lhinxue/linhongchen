import { create } from "zustand";
import contentsRaw, { Content } from "../contents";

// Generate available locales from the keys of the contents object
const contents = contentsRaw as Record<string, Content>;
const availableLocales = Object.keys(contents);

// Helper function to get the initial locale
const getInitialLocale = (): string => {
    let locale = localStorage.getItem("locale");
    if (!locale) {
        locale = (navigator.language || "en").split("-")[0];
    }
    if (!availableLocales.includes(locale)) {
        locale = "en";
    }
    return locale;
};

interface AppState {
    // Locale state
    locale: string;
    content: Content;
    locales: string[];
    setLocale: (locale: string) => void;
    // Theme state
    dark: boolean;
    toggleDarkTheme: () => void;
}

const useApp = create<AppState>((set) => {
    const initialLocale = getInitialLocale();
    return {
        // Locale state
        locale: initialLocale,
        content: contents[initialLocale],
        locales: availableLocales,
        setLocale: (newLocale: string) => {
            if (!availableLocales.includes(newLocale)) {
                newLocale = "en";
            }
            localStorage.setItem("locale", newLocale);
            set({
                locale: newLocale,
                content: contents[newLocale],
            });
        },
        // Theme state
        dark: false,
        toggleDarkTheme: () => set((state) => ({ dark: !state.dark })),
    };
});

export default useApp;
