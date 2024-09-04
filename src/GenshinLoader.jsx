import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Elements from "./assets/svg/Elements";
import styled from "styled-components";
import OpController from "./OpController";

const Container = motion(styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333;
    visibility: visible;
    z-index: 9999;
`);

function GenshinLoader({ value, gap = 200, completed = false }) {
    const numElements = Elements.length;
    const animationControls = useAnimation();
    const containerControls = useAnimation();

    useEffect(() => {
        animationControls.start({ width: Math.floor(value / 10) * (1600 + gap) + 1600 * ((value % 10) / 10) });
    }, [animationControls, gap, value]);

    useEffect(() => {
        if (completed) {
            containerControls.start({
                scale: 1.2,
                opacity: 0,
                transition: { duration: 1 },
                transitionEnd: { visibility: "hidden" },
            });
        }
    }, [completed, containerControls]);

    return (
        <Container
            className="loader"
            initial={{
                scale: 1,
                opacity: 1,
            }}
            animate={containerControls}
        >
            <motion.div style={{ height: "50px", width: `${numElements * 50}px`, position: "fixed", maxWidth: "80vw" }}>
                <svg viewBox={`0 0 ${(1600 + gap) * 7} 1600`} width="100%" height="100%">
                    <defs>
                        <mask id={`mask`}>
                            <rect x="0" y="0" width="100%" height="100%" fill="black" />
                            {Elements.map((E, i) => (
                                <E key={i} fill="white" transform={`translate(${i * (1600 + gap)})`} />
                            ))}
                        </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="#666" mask={`url(#mask)`} />
                    <motion.rect
                        initial={{ width: 0 }}
                        animate={animationControls}
                        exit={{ width: 0 }}
                        height="100%"
                        fill="#fff"
                        mask={`url(#mask)`}
                    />
                </svg>
            </motion.div>
        </Container>
    );
}

export default GenshinLoader;
