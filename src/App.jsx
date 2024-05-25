import { Button, Slider } from "@nextui-org/react";
import { createRef, useState } from "react";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import SquareImagePuzzle from "./components/SquareImagePuzzle";
import { useSpring, animated } from "@react-spring/web";
import BlurredBackground from "./components/BlurredBackground";

function App() {
    const [grayscale, setGrayscale] = useState(1);
    const ref = createRef();

    return (
        <GrayscaleWrapper level={grayscale}>
            <div className="absolute ">
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
            </div>
            <div className="h-screen w-screen flex justify-center items-center">
                <BlurredBackground src="./Firefly.jpg" />
                <SquareImagePuzzle ref={ref} />
            </div>
        </GrayscaleWrapper>
    );
}

export default App;
