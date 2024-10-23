import { useAppConfig } from "../contexts/AppConfig";
import Locale from "../utils/localeManagement";
import supported_language from "../assets/configs/supported_language";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

const LocaleController = () => {
    const { locale, _locale } = useAppConfig();

    const save = (v) => {
        _locale(v.key);
        Locale.set(v.key);
    };

    return (
        <Breadcrumbs separator="·">
            {supported_language.map((v) => (
                <BreadcrumbItem key={v.key} isCurrent={locale === v.key} onClick={() => save(v)}>
                    {v.label}
                </BreadcrumbItem>
            ))}
        </Breadcrumbs>
    );
};

export default LocaleController;
