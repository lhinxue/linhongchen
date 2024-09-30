import supported_language from "../assets/configs/supported_language";
import Cache from "./cacheManagement";

const key = "locale";

const get = () => {
    const cachedLocale = Cache.get(key);
    const browserLocale = new Intl.Locale(navigator.language || navigator.userLanguage).language;
    return (
        supported_language.find((v) => v.key === cachedLocale)?.key ||
        supported_language.find((v) => v.key === browserLocale)?.key ||
        supported_language[0].key
    );
};

const set = (v) => {
    Cache.set(key, v);
};

const Locale = { get, set };

export default Locale;
