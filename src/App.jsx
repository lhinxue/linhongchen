import { Button, Input, Slider } from "@nextui-org/react";
import * as Icons from "@phosphor-icons/react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import BlurredBackground from "./components/BlurredBackground";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import useImageTheme from "./hooks/useImageTheme";
import usePortraitScreen from "./hooks/usePortraitScreen";
import SquareImagePuzzle from "./components/SquareImagePuzzle";
import Elements from "./assets/svg/Elements";
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

const ElementsLoading = ({ value, gap = 200 }) => {
    const numElements = Elements.length;
    const animationControls = useAnimation();

    useEffect(() => {
        animationControls.start({ width: Math.floor(value / 10) * (1600 + gap) + 1600 * ((value % 10) / 10) });
    }, [animationControls, gap, value]);

    return (
        <div style={{ width: `${numElements * 50}px`, height: "50px" }}>
            <svg viewBox={`0 0 ${(1600 + gap) * 7} 1600`} width="100%" height="100%">
                <defs>
                    <mask id={`mask`}>
                        <rect x="0" y="0" width="100%" height="100%" fill="black" />
                        {Elements.map((E, i) => (
                            <E key={i} fill="white" transform={`translate(${i * (1600 + gap)})`} />
                        ))}
                    </mask>
                </defs>
                <rect width="100%" height="100%" fill="#ccc" mask={`url(#mask)`} />
                <motion.rect
                    initial={{ width: 0 }}
                    animate={animationControls}
                    exit={{ width: 0 }}
                    height="100%"
                    fill="#000"
                    mask={`url(#mask)`}
                />
            </svg>
        </div>
    );
};

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
    useEffect(() => {
        setTimeout(() => {
            _v(30);
            setTimeout(() => {
                _v(65);
            }, 2000);
        }, 1000);
    }, []);

    return (
        <GrayscaleWrapper level={0}>
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
                    {/* <BlurredBackground src={imageSrc} /> */}
                    <ElementsLoading value={v} />

                    <div className="flex flex-row items-center">
                        {/* <AnimatedRectangles value={v} reverse /> */}
                        {/* <MusicNote
                            initial={{ rotate: 10, height: 50, width: 50, color: "#666", scale: 1 }}
                            animate={controls}
                            transition={{ duration: 0.5 }}
                            onClick={startAnimation}
                        /> */}
                        {/* <AnimatedRectangles value={v} /> */}
                    </div>
                    {/* <Wave /> */}
                    <Slider
                        size="lg"
                        minValue={0}
                        maxValue={70}
                        renderThumb={(props) => <HideAfter {...props} />}
                        style={{
                            transition: "all 1s",
                        }}
                        value={v}
                        onChange={_v}
                    />
                    <Input value={v} onValueChange={_v} />

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
const Wave = () => {
    const waveVariants = {
        hidden: { d: "M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" },
        visible: { d: "M0,100 C150,50 350,150 500,100 L500,00 L0,0 Z" },
    };

    return (
        <motion.svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                stroke="black"
                strokeWidth="3"
                variants={waveVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
        </motion.svg>
    );
};
const Rectangle = ({ d, active, color1, color2, strokeWidth }) => {
    const color = active ? color2 : color1;

    return (
        <motion.path
            d={d}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            animate={{ stroke: color }}
            transition={{ duration: 0.6 }}
        />
    );
};

const AnimatedRectangles = ({
    value,
    maxHeight = 20,
    maxWidth = 200,
    numLines = 20,
    reverse = false,
    strokeWidth = 3,
    gap = 5,
}) => {
    const color1 = "#666";
    const color2 = "#fff";
    numLines = Math.floor(maxWidth / (strokeWidth + gap));
    const rectangles = Array.from({ length: numLines }, (_, i) => i + 1);
    return (
        <svg
            viewBox={`-${gap + strokeWidth} -${maxHeight + 5} ${(numLines + 1) * (strokeWidth + gap) + strokeWidth} ${
                maxHeight * 2 + 10
            }`}
            height={maxHeight * 2}
        >
            {rectangles.map((_, i) => (
                <Rectangle
                    key={i}
                    color1={color1}
                    color2={color2}
                    strokeWidth={strokeWidth}
                    d={`M ${(i * numLines * (strokeWidth + gap)) / numLines} ${
                        -((reverse ? i : numLines - i) * maxHeight) / numLines
                    } V ${((reverse ? i : numLines - i) * maxHeight) / numLines}`}
                    active={value > (i / numLines) * 100}
                />
            ))}
        </svg>
    );
};
export default App;
