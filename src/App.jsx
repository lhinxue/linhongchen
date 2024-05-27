import { createRef, useState } from "react";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import SquareImagePuzzle from "./components/SquareImagePuzzle";
import { useSpring, animated } from "@react-spring/web";
import BlurredBackground from "./components/BlurredBackground";
import usePortraitScreen from "./hooks/usePortraitScreen";
import * as Icons from "@phosphor-icons/react";
import Button from "./components/Buttons/Button";

function App() {
    const [grayscale, setGrayscale] = useState(1);
    const ref = createRef();
    const { width, height } = usePortraitScreen();

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
                <BlurredBackground src="./Firefly.jpg" />
                {/*  */}
                <div
                    className="flex justify-evenly items-center flex-col"
                    style={{
                        width: width,
                        height: height,
                    }}
                >
                    {/* <SquareImagePuzzle ref={ref} size={width} /> */}
                    <div className="flex items-center gap-5">
                        {/* <Button icon={<Icons.SkipBack />}></Button>
                        <Button
                            icon={<Icons.Play />}
                            onClick={() => {
                                setTimeout(() => setGrayscale(0), 500);
                                ref.current.reset();
                            }}
                        ></Button> */}
                        <Button Icon={Icons.SkipForward} />
                    </div>
                </div>
            </div>
        </GrayscaleWrapper>
    );
}

export default App;
