import { useEffect, useState } from "react";

import contents from "../contents";
import { Locale } from "../enums/locale";
import { IAppContent } from "../interfaces/config";
import useAppConfig from "./useAppConfig";

const useContent = (): IAppContent => {
    const { locale } = useAppConfig();
    const [content, _content] = useState<IAppContent>(contents[Locale.zh]);
    useEffect(() => {
        if (contents[locale]) {
            _content(contents[locale]);
        }
    }, [locale]);
    useEffect(() => {
        console.log(locale, content);
    }, [content]);
    return content;
};

export default useContent;
