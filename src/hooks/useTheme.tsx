import { create } from "zustand";

interface ThemeState {
    dark: boolean;
    toggle: () => void;
}

const useTheme = create<ThemeState>((set) => ({
    dark: false,
    toggle: () => set((state) => ({ dark: !state.dark })),
}));

export default useTheme;
