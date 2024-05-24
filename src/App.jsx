import { Button, Slider } from "@nextui-org/react";
import { createRef, useState } from "react";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import SquareImagePuzzle from "./components/SquareImagePuzzle";
import {useSpring,animated} from "@react-spring/web";
const FadeIn = ({ children, duration = 500, delay = 0 }) => {
    const fadeInAnimation = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration },
        delay,
    });

    return (
        <animated.div style={fadeInAnimation}>
            {children}
        </animated.div>
    );
};
function App() {
    const [grayscale, setGrayscale] = useState(1);
    const ref = createRef();

    return (
        <>
            <div className="absolute">
                <Button aria-label="SetShuffle" onClick={() => ref.current.setIsShuffling(true)}>
                    Start Shuffle
                </Button>
                <Button onClick={() => {
                    setTimeout(()=>setGrayscale(0),500)
                    ref.current.reset()
                }}>reset</Button>
                <Slider step={0.1} maxValue={1} minValue={0} value={grayscale} onChange={setGrayscale} />
            </div>
            <div className="h-screen w-screen flex justify-center items-center">

                <GrayscaleWrapper level={grayscale}>

                        <SquareImagePuzzle ref={ref} />
                </GrayscaleWrapper>
            </div>
        </>
    );
}

export default App;
