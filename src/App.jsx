import { Slider } from "@nextui-org/react";
import * as Icons from "@phosphor-icons/react";
import { motion, useAnimation } from "framer-motion";
import { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import BlurredBackground from "./components/BlurredBackground";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import useImageTheme from "./hooks/useImageTheme";
import usePortraitScreen from "./hooks/usePortraitScreen";
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
    ${
        "" /* & div,
    & svg,
    & button,
    & span {
        transition: color 0.8s ease-in-out, background-color 0.8s ease-in-out, border-color 0.8s ease-in-out,
            border-inline-start-color 0.8s ease-in-out, fill 0.8s ease-in-out, background-image 0.8s ease-in-out;
    } */
    }
`;

const MusicNote = motion(Icons.MusicNoteSimple);
function App() {
    const [grayscale, setGrayscale] = useState(1);
    const ref = createRef();
    const [themeColor, imageSrc, nextImage, previousImage] = useImageTheme(imageList);
    const { width, height } = usePortraitScreen();

    useEffect(() => {
        // setImageSrc(imageList[0]);
    }, []);
    const controls = useAnimation();

    const startAnimation = () => {
        controls.start({
            color: "#fff",
            transition: { duration: 0.5, easings: ["easeIn", "easeOut"] },
        });
    };
    const [v, _v] = useState(0);

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
                    <AnimatedRectangles value={v} />
                    <MusicNote
                        initial={{ rotate: 10, height: 50, width: 100, color: "#666", scale: 1 }}
                        animate={controls}
                        transition={{ duration: 0.5 }}
                        onClick={startAnimation}
                    />
                    <AnimatedRectangles value={v} reverse />
                    <Slider
                        size="sm"
                        classNames={{
                            base: "max-w-md gap-3 opacity-50",
                            thumb: "h-3",
                        }}
                        minValue={0}
                        maxValue={100}
                        renderThumb={(props) => <HideAfter {...props} />}
                        style={{
                            transition: "all 1s",
                        }}
                        value={v}
                        onChange={_v}
                    />

                    {/* <SquareImagePuzzle ref={ref} size={width} src={imageSrc} />
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
                    </div> */}
                </Tryshi>
            </div>
        </GrayscaleWrapper>
    );
}

const Rectangle = ({ d, active, color1, color2 }) => {
    const color = active ? color2 : color1;

    return (
        <motion.path
            d={d}
            stroke={color}
            strokeWidth="3"
            fill="transparent"
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            animate={{ stroke: color }}
            transition={{ duration: 0.6 }}
        />
    );
};

const AnimatedRectangles = ({ value, maxHeight = 20, numLines = 20, reverse = false }) => {
    const rectangles = Array.from({ length: numLines }, (_, i) => i + 1);
    const color1 = "#666";
    const color2 = "#fff";

    return (
        <svg viewBox={`-12 -${maxHeight + 5} ${numLines * (2 + 10) + 12} ${maxHeight * 2 + 10}`} height={maxHeight * 2}>
            {rectangles.map((_, i) => (
                <Rectangle
                    key={i}
                    color1={color1}
                    color2={color2}
                    d={`M ${(i * numLines * (2 + 10)) / numLines} ${
                        -((reverse ? i : numLines - i) * maxHeight) / numLines
                    } V ${((reverse ? i : numLines - i) * maxHeight) / numLines}`}
                    active={value > (i / numLines) * 100}
                />
            ))}
        </svg>
    );
};
export default App;
