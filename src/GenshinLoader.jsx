import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Elements from "./assets/svg/Elements";
import styled from "styled-components";

const Container = styled.div`
    height: 50px;
    width: ${(props) => `${props.length * 50}px`};

    position: fixed;
`;

function GenshinLoader({ value, gap = 200, active = true, fadeInDuration = 0.5, fadeOutDuration = 0.5 }) {
    const numElements = Elements.length;
    const animationControls = useAnimation();

    useEffect(() => {
        animationControls.start({ width: Math.floor(value / 10) * (1600 + gap) + 1600 * ((value % 10) / 10) });
    }, [animationControls, gap, value]);

    const containerVariants = {
        active: {
            scale: 1,
            opacity: 1,
            transition: { duration: fadeInDuration },
        },
        inactive: {
            scale: 1.2,
            opacity: 0,
            transition: { duration: fadeOutDuration },
        },
    };

    return (
        <motion.div
            initial="active"
            animate={active ? "active" : "inactive"}
            variants={containerVariants}
            style={{ height: "50px", width: `${numElements * 50}px`, position: "fixed", maxWidth: "80vw" }}
        >
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
    );
}

export default GenshinLoader;
