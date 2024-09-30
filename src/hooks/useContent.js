import { useEffect, useState } from "react";
import en from "../assets/contents/en";
import zh from "../assets/contents/zh";
import { useAppConfig } from "../contexts/AppConfig";

const useContent = () => {
    const { locale } = useAppConfig();
    const maps = { en, zh };
    const [content, _content] = useState();
    useEffect(() => {
        _content(maps[locale]);
    }, [locale]);
    return content;
};

export default useContent;
