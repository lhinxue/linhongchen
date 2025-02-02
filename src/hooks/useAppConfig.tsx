import { create } from "zustand";

import { DarkThemeType, Locale } from "../enums/locale";
import { IStore } from "../interfaces/stores";

const getBrowserLocale = (): Locale => {
    // 获取浏览器语言前两位并转为小写
    const code = navigator.language.substring(0, 2).toLowerCase();
    
    // 验证是否是有效 Locale 值
    return Object.values(Locale).includes(code as Locale)
        ? code as Locale
        : Locale.zh; // 默认回退到英文
};

const useAppConfig = create<IStore.AppConfig>((set) => ({
    dark: DarkThemeType.light,
    locale: getBrowserLocale(),
    toggleDarkTheme: (yesNo?: boolean) =>
        set((state) => ({
            dark: yesNo ?? state.dark !== DarkThemeType.dark ? DarkThemeType.dark : DarkThemeType.light,
        })),
}));

export default useAppConfig;
