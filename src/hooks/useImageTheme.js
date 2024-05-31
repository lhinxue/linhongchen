import { useEffect, useState } from "react";
import utils from "../utils";

const useImageTheme = (srcList) => {
    const [i, $i] = useState(0);
    const [src, $src] = useState(srcList[0]);
    const [themeColor, $themeColor] = useState(null);

    useEffect(() => {
        const newSrc = srcList[i];
        utils.getImageThemeColor(newSrc).then($themeColor);
        $src(newSrc);
    }, [i, srcList]);

    const next = () => {
        $i((i) => (i + 1) % srcList.length);
    };
    const previous = () => {
        $i((i) => (i + srcList.length - 1) % srcList.length);
    };

    return [themeColor, src, next, previous];
};

export default useImageTheme;
