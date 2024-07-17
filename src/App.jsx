import { Button, Input, Popover, PopoverContent, PopoverTrigger, Slider } from "@nextui-org/react";
import * as Icons from "@phosphor-icons/react";
import { AnimatePresence, animate, motion, useAnimation } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BlurredBackground from "./components/BlurredBackground";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import useImageTheme from "./hooks/useImageTheme";
import usePortraitScreen from "./hooks/usePortraitScreen";
import SquareImagePuzzle from "./components/SquareImagePuzzle";
import Elements from "./assets/svg/Elements";
import Bg from "./Bg";
import GenshinLoader from "./GenshinLoader";
import VisibilityControl from "./VisibilityControl";
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

function App() {
    const [grayscale, setGrayscale] = useState(1);
    const [bgProgress, setBgProgress] = useState(5);
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

    const [taskCompletingProgress, setTaskCompletingProgress] = useState(0);

    const [preLoadTaskCompleted, setPreLoadTaskCompleted] = useState(false);
    const [bgLoadCompleted, setBgLoadCompleted] = useState(false);

    useEffect(() => {
        const taskList = [bgLoadCompleted];
        const totalItems = taskList.length;
        const trueCount = taskList.filter((value) => value === true).length;
        const completionPercentage = trueCount / totalItems;

        _v(completionPercentage * 65);
        if (completionPercentage >= 1) {
            setTimeout(() => {
                _v(70);
                setPreLoadTaskCompleted(true);
            }, 1500);
        }
    }, [bgLoadCompleted]);

    const [elementLoaderVisible, setELV] = useState(true);

    useEffect(() => {
        if (preLoadTaskCompleted) {
            setTimeout(() => {
                setELV(false);
                
            }, 1000);
        }
    }, [preLoadTaskCompleted]);

    return (
        <GrayscaleWrapper level={0}>
            {/* Control */}
            <Popover>
                <PopoverTrigger>
                    <Button isIconOnly className="absolute" t>
                        <Icons.Toolbox />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Slider
                        label="Element Loader"
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
                    <Slider
                        label="Background Size"
                        size="lg"
                        minValue={0}
                        maxValue={5}
                        renderThumb={(props) => <HideAfter {...props} />}
                        style={{
                            transition: "all 1s",
                        }}
                        value={bgProgress}
                        onChange={setBgProgress}
                    />
                </PopoverContent>
            </Popover>

            {/* Content */}

            <Bg src={"bg (1).mp4"} level={bgProgress} onLoadComplete={() => setBgLoadCompleted(true)} />

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
                    <GenshinLoader value={v} active={elementLoaderVisible} />
                    {/* <BlurredBackground src={imageSrc} /> */}

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

export default App;
