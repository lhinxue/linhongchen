import { useWindowSize } from "@uidotdev/usehooks";

const usePortraitScreen = () => {
    const { width, height } = useWindowSize();
    const wRatio = 3;
    const hRatio = 5;
    // Calculate the maximum height and width for a 4:3 aspect ratio
    const maxWidth = height * (wRatio / hRatio);
    const maxHeight = width * (hRatio / wRatio);

    return {
        height: height < maxHeight ? height : maxHeight,
        width: width < maxWidth ? width : maxWidth,
    };
};

export default usePortraitScreen;
