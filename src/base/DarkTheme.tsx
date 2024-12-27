import { Switch } from "@nextui-org/react";
import { create } from "zustand";

import Lucide from "../icons/Lucide";

interface DarkThemeStore {
    dark: string;
    toggle: (yesNo?: boolean) => void;
}

export const useDarkTheme = create<DarkThemeStore>((set) => ({
    dark: "",
    toggle: (yesNo?: boolean) =>
        set((state) => ({
            dark: yesNo !== undefined ? (yesNo ? "dark" : "") : state.dark === "dark" ? "" : "dark",
        })),
}));

function DarkTheme() {
    const { dark, toggle } = useDarkTheme();

    return (
        <Switch
        endContent={<Lucide.Sun />}
        startContent={<Lucide.Moon />}
            isSelected={dark === "dark"}
            onValueChange={toggle}
        />
    );
}

export default DarkTheme;
