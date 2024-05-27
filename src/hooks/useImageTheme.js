import { useEffect, useState } from "react";
import utils from "../utils";

const useImageTheme = (initialImageSrcList) => {
    const [imageSrcList] = useState(initialImageSrcList);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [themeColor, setThemeColor] = useState(null);
    const [imageSrc, setImageSrc] = useState(imageSrcList[currentImageIndex]);

    const getThemeColor = async (imageSrc) => {
        try {
            const themeColor = await utils.getImageThemeColor(imageSrc);
            setThemeColor(themeColor);
        } catch (error) {
            console.error("Error processing image:", error);
        }
    };

    useEffect(() => {
        getThemeColor(imageSrc);
    }, [imageSrc]);

    const nextImage = (random = true) => {
        let newIndex;
        if (random) {
            newIndex = Math.floor(Math.random() * imageSrcList.length);
        } else {
            newIndex = (currentImageIndex + 1) % imageSrcList.length;
        }
        setCurrentImageIndex(newIndex);
        setImageSrc(imageSrcList[newIndex]);
    };

    return [themeColor, imageSrc, setImageSrc, imageSrcList, nextImage];
};

export default useImageTheme;
