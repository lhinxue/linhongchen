import { createRef, useEffect, useState } from "react";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import SquareImagePuzzle from "./components/SquareImagePuzzle";
import { useSpring, animated } from "@react-spring/web";
import BlurredBackground from "./components/BlurredBackground";
import usePortraitScreen from "./hooks/usePortraitScreen";
import * as Icons from "@phosphor-icons/react";
import { Button, Slider, cn } from "@nextui-org/react";
import useImageTheme from "./hooks/useImageTheme";
import styled from "styled-components";
// import Button from "./components/Buttons/Button";

const imageList = ["./Firefly.jpg", "./March7th.jpg"];
function hexToHSL(hex) {
    // Convert hex to RGB first
    try {
        let r = 0,
            g = 0,
            b = 0;
        if (hex.length == 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length == 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(2);
        l = +(l * 100).toFixed(2);
        return [h, s + "%", l + "%"];
    } catch (error) {
        return [];
    }
}
const HideAfter = styled.span`
    &:after {
        display: none;
    }
`;
const Tryshi = styled.div`
    & div,
    & svg,
    & button,
    & span {
        transition: color 0.8s ease-in-out, background-color 0.8s ease-in-out, border-color 0.8s ease-in-out,
            border-inline-start-color 0.8s ease-in-out, fill 0.8s ease-in-out, background-image 0.8s ease-in-out;
    }
`;
function App() {
    const [grayscale, setGrayscale] = useState(1);
    const ref = createRef();
    const [themeColor, imageSrc, nextImage, previousImage] = useImageTheme(imageList);
    const { width, height } = usePortraitScreen();

    useEffect(() => {
        // setImageSrc(imageList[0]);
    }, []);

    return (
        <GrayscaleWrapper level={grayscale}>
            <div className="h-screen w-screen flex justify-center items-center">
                {/*  */}
                <Tryshi
                    className="flex justify-evenly items-center flex-col"
                    style={{
                        width: width,
                        height: height,
                        "--nextui-primary": hexToHSL(themeColor).join(" "),
                    }}
                >
                    <BlurredBackground src={imageSrc} />
                    <SquareImagePuzzle ref={ref} size={width} src={imageSrc} />
                    <div className="flex flex-col w-full items-center gap-5">
                        <Slider
                            size="sm"
                            classNames={{
                                base: "max-w-md gap-3 opacity-50",
                                thumb: "h-3",
                            }}
                            minValue={0}
                            maxValue={100}
                            defaultValue={100}
                            renderThumb={(props) => <HideAfter {...props} />}
                            style={{
                                transition: "all 1s",
                            }}
                        />
                        <div className="flex items-center gap-5">
                            <Button
                                isIconOnly
                                radius="full"
                                variant="bordered"
                                size="sm"
                                style={{ color: themeColor, borderColor: `${themeColor}AA` }}
                                onClick={previousImage}
                            >
                                <Icons.SkipBack weight="bold" fill={themeColor} />
                            </Button>
                            <Button
                                isIconOnly
                                radius="full"
                                variant="bordered"
                                size="lg"
                                style={{ color: themeColor, borderColor: `${themeColor}AA` }}
                                onClick={() => {
                                    setTimeout(() => setGrayscale(0), 500);
                                    ref.current.reset();
                                }}
                            >
                                <Icons.Play weight="bold" fill={themeColor} />
                            </Button>
                            <Button
                                isIconOnly
                                radius="full"
                                variant="bordered"
                                size="sm"
                                onClick={() => nextImage()}
                                style={{ color: themeColor, borderColor: `${themeColor}AA` }}
                            >
                                <Icons.SkipForward weight="bold" fill={themeColor} />
                            </Button>
                        </div>
                    </div>
                </Tryshi>
            </div>
        </GrayscaleWrapper>
    );
}

export default App;
