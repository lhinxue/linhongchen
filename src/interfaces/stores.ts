import { DarkThemeType, Locale } from "../enums/locale";

export namespace IStore {
    export interface AppConfig {
        dark: DarkThemeType;
        locale: Locale;
        toggleDarkTheme: (yesNo?: boolean) => void;
    }

    export interface VideoBackground {
        isPlaying: boolean;
        play: (yesNo?: boolean) => void;
    }

    export interface Navigator {
        current: string;
        scrolling: boolean;
        setCurrent: (id: string) => void;
        scrollTo: (id: string) => Promise<void>;
    }
    export interface DarkTheme {
        dark: string;
        isDark: boolean;
        toggle: (yesNo?: boolean) => void;
    }
}
