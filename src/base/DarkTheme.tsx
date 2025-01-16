import { Switch } from "@nextui-org/react";
import { create } from "zustand";

import Lucide from "../icons/Lucide";
import { IStore } from "../interfaces/stores";

export const useDarkTheme = create<IStore.DarkTheme>((set) => ({
    dark: "",
    isDark: false,
    toggle: (yesNo?: boolean) =>
        set((state) => ({
            dark: yesNo !== undefined ? (yesNo ? "dark" : "") : state.dark === "dark" ? "" : "dark",
            isDark: yesNo !== undefined ? yesNo : !state.dark,
        })),
}));

function DarkTheme() {
    const { dark, toggle } = useDarkTheme();

    return (
        <Switch
            startContent={<Lucide.Sun />}
            endContent={<Lucide.Moon />}
            isSelected={dark !== "dark"}
            onValueChange={() => toggle()}
            color="default"
            className="opacity-70 dark:opacity-90"
            size="sm"
        />
    );
}

export default DarkTheme;
