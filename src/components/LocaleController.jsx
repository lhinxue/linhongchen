// new Intl.Locale(navigator.language).language
import { useContext, useEffect } from "react";
import { useAppConfig } from "../contexts/AppConfig";
import styled from "styled-components";
import { Dropdown, FloatButton, Typography } from "antd";
import * as Icons from "@phosphor-icons/react";
import Locale from "../utils/localeManagement";
import supported_language from "../assets/configs/supported_language";
import Text from "./Text";

const LocaleController = () => {
    const { locale, _locale } = useAppConfig();

    const save = (v) => {
        _locale(v.key);
        Locale.set(v.key);
    };

    return (
        <span>
            {supported_language.map((v, i) => (
                <>
                    <Text link active={locale === v.key} onClick={() => save(v)}>
                        {v.label}
                    </Text>
                    {i !== supported_language.length - 1 && <Text>|</Text>}
                </>
            ))}
        </span>
    );
};

export default LocaleController;
