// new Intl.Locale(navigator.language).language
import { useContext, useEffect } from "react";
import { useAppConfig } from "../contexts/AppConfig";
import styled from "styled-components";
import { Dropdown, FloatButton } from "antd";
import * as Icons from "@phosphor-icons/react";
import Locale from "../utils/localeManagement";
import supported_language from "../assets/configs/supported_language";

const Container = styled.span`
    position: fixed;

    & .ant-float-btn-body {
        background-color: inherit !important;
    }

    & .ant-float-btn {
        inset-inline-end: 16px;
        inset-block-start: 16px;
    }
`;

const LocaleController = () => {
    const { locale, _locale } = useAppConfig();

    const save = (v) => {
        _locale(v.key);
        Locale.set(v.key);
    };

    return (
        <Container>
            <Dropdown arrow menu={{ items: supported_language, onClick: save, selectedKeys: [locale] }}>
                <FloatButton icon={<Icons.Translate />} />
            </Dropdown>
        </Container>
    );
};

export default LocaleController;
