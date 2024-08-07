import { useLang } from "./Context";

export default function T(props) {
    const [locale] = useLang();
    return props[locale] ?? props.c[locale] ?? "";
}
