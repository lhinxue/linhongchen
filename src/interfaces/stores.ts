export namespace IStore {
    export interface AppConfig {
        dark: string;
        locale: string;
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
