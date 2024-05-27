import { createRef, useEffect, useState } from "react";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import SquareImagePuzzle from "./components/SquareImagePuzzle";
import { useSpring, animated } from "@react-spring/web";
import BlurredBackground from "./components/BlurredBackground";
import usePortraitScreen from "./hooks/usePortraitScreen";
import * as Icons from "@phosphor-icons/react";
import { Button } from "@nextui-org/react";
import useImageTheme from "./hooks/useImageTheme";
// import Button from "./components/Buttons/Button";

const imageList = ["./Firefly.jpg", "./March7th.jpg"];

function App() {
    const [grayscale, setGrayscale] = useState(1);
    const ref = createRef();
    const [themeColor, imageSrc, setImageSrc, imageSrcList, nextImage] = useImageTheme(imageList);
    const { width, height } = usePortraitScreen();

    useEffect(() => {
        setImageSrc(imageList[0]);
    }, []);

    return (
        <GrayscaleWrapper level={grayscale}>
            {/* <div className="absolute ">
                <Button aria-label="SetShuffle" onClick={() => ref.current.setIsShuffling(false)}>
                    Start Shuffle
                </Button>
                <Button
                    onClick={() => {
                        setTimeout(() => setGrayscale(0), 500);
                        ref.current.reset();
                    }}
                >
                    reset
                </Button>
                <Slider step={0.1} maxValue={1} minValue={0} value={grayscale} onChange={setGrayscale} />
            </div> */}
            <div className="h-screen w-screen flex justify-center items-center">
                <BlurredBackground src={imageSrc} />
                {/*  */}
                <div
                    className="flex justify-evenly items-center flex-col"
                    style={{
                        width: width,
                        height: height,
                    }}
                >
                    <SquareImagePuzzle ref={ref} size={width} src={imageSrc} />
                    <div className="flex items-center gap-5">
                        <Button isIconOnly radius="full" variant="bordered" size="sm" style={{ color: themeColor }}>
                            <Icons.SkipBack weight="bold" />
                        </Button>
                        <Button
                            isIconOnly
                            radius="full"
                            variant="bordered"
                            size="lg"
                            style={{ color: themeColor }}
                            onClick={() => {
                                setTimeout(() => setGrayscale(0), 500);
                                ref.current.reset();
                            }}
                        >
                            <Icons.Play weight="bold" />
                        </Button>
                        <Button isIconOnly radius="full" variant="bordered" size="sm" style={{ color: themeColor }}>
                            <Icons.SkipForward weight="bold" onClick={() => nextImage()} />
                        </Button>
                    </div>
                </div>
            </div>
        </GrayscaleWrapper>
    );
}

export default App;
