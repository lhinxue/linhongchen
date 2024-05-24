import { Button, Slider } from "@nextui-org/react";
import { createRef, useState } from "react";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import SquareImagePuzzle from "./components/SquareImagePuzzle";

function App() {
    const [shuffle, setShuffle] = useState(true);
    const [grayscale, setGrayscale] = useState(1);
    const ref = createRef();

    return (
        <>
            <div className="absolute">
                <Button aria-label="SetShuffle" onClick={() => setShuffle((pre) => !pre)}>
                    SetShuffle
                </Button>
                <Button onClick={() => ref.current.reset()}>reset</Button>
                <Slider step={0.1} maxValue={1} minValue={0} value={grayscale} onChange={setGrayscale} />
            </div>
            <div className="h-screen w-screen flex justify-center items-center">
                <GrayscaleWrapper level={grayscale}>
                    <SquareImagePuzzle isShuffling={shuffle} ref={ref} />
                </GrayscaleWrapper>
            </div>
        </>
    );
}

export default App;
