import { motion, useAnimation } from "framer-motion";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import utils from "../../utils";
import styled from "styled-components";
import shuffle from "../../utils/src/shuffle";
import { useWindowSize } from "@uidotdev/usehooks";

const List = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    & > div {
        position: absolute;
        will-change: transform, width, height, opacity;
        height: 33%;
        width: 33%;

        & > div:hover {
            filter: grayscale(0.5);
        }

        & > div {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            ${"" /* border-radius: 5px; */}
        }
    }
`;

const SquareImagePuzzle = forwardRef(
    (
        {
            columns = 3,
            interval = 5000,
            size = 300,
            src = "./Firefly.jpg",
            gap = 1, // default gap ratio in percentage
        },
        ref
    ) => {
        const { width: windowWidth, height: windowHeight } = useWindowSize();
        const [themeColor, setThemeColor] = useState("#FFFFFF");
        const [containerRef, { width: containerWidth, height: containerHeight }] = useMeasure();
        const [listRef, { width, height }] = useMeasure();
        const [padding, setPadding] = useState((gap * (width + height)) / 200);
        const [borderRadius, setBorderRadius] = useState("0.5rem");
        const [isReset, $isReset] = useState(false);

        const [isShuffling, setIsShuffling] = useState(true);

        const initItems = () => {
            return shuffle(
                Array.from({ length: columns * columns }).map((_, i) => {
                    const xPos = ((i % columns) * 100) / (columns - 1);
                    const yPos = (Math.floor(i / columns) * 100) / (columns - 1);
                    return {
                        index: i,
                        css: {
                            backgroundImage: `url(${src}?auto=compress&dpr=2&h=500&w=500)`,
                            backgroundPosition: `${xPos}% ${yPos}%`,
                            backgroundSize: `${columns * 100}% ${columns * 100}%`,
                        },
                    };
                })
            );
        };

        const [items, setItems] = useState(initItems());

        const [gridItems] = useMemo(() => {
            let heights = new Array(columns).fill(0);
            let gridItems = items.map((child, i) => {
                const column = heights.indexOf(Math.min(...heights));
                const x = (width / columns) * column - size / 2;
                const y = (heights[column] += height / columns) - height / columns - size / 2;
                const xPos = ((i % column) * 100) / (column - 1);
                const yPos = (Math.floor(i / column) * 100) / (column - 1);
                return {
                    ...child,
                    x,
                    y,
                    width: width / columns,
                    height: height / columns,
                    backgroundPosition: `${xPos}% ${yPos}%`,
                    padding,
                    borderRadius,
                };
            });
            return [gridItems];
        }, [columns, height, items, width, padding, borderRadius]);

        const boxShadowControls = useAnimation();
        const outerControls = useAnimation();
        const ctnControls = useAnimation();

        const reset = () => {
            setPadding(0);
            setBorderRadius("0");
            setIsShuffling(false);
            setItems(utils.resetArrayPosition);
            boxShadowControls.start({
                boxShadow: `0px 0px 6px 2px ${themeColor}`,
                transition: { duration: 1.6 },
            });
            outerControls.start({
                boxShadow: `0px 0px 6px 2px ${themeColor}`,
                opacity: 1,
                transition: { duration: 0.3, delay: 1.8 },
            });
            ctnControls.start({
                opacity: 0,
                transition: { duration: 0.3, delay: 2 },
            });
            $isReset(true);
        };

        useEffect(() => {
            utils.getImageThemeColor(src).then(setThemeColor);
            setItems(initItems());
        }, [src]);

        useEffect(() => {
            if (isReset) {
                outerControls.start({ boxShadow: `0px 0px 6px 2px ${themeColor}FF`, transition: { duration: 1 } });
            } else {
                outerControls.start({ boxShadow: `0px 0px 6px 2px ${themeColor}00`, transition: { duration: 0 } });
            }
        }, [outerControls, themeColor, isReset]);

        useEffect(() => {
            let t;
            if (isShuffling) {
                t = setInterval(() => setItems(utils.shuffle), interval);
                setBorderRadius("0.5rem");
            }
            return () => clearInterval(t);
        }, [isShuffling, interval]);

        useImperativeHandle(ref, () => ({
            reset,
            setIsShuffling: (shuffling) => {
                setIsShuffling(shuffling);
                if (shuffling) {
                    setPadding((gap * (width + height)) / 200);
                    setBorderRadius("0.5rem");
                }
            },
        }));

        useEffect(() => {
            setPadding((gap * (width + height)) / 200);
        }, [gap, width, height]);
        console.log(containerHeight, containerWidth);
        if (size)
            return (
                <motion.div
                    style={{
                        width: size,
                        height: size,
                        position: "fixed",
                        top: windowHeight / 2,
                        left: windowWidth / 2,
                    }}
                    ref={containerRef}
                >
                    <motion.span initial={{ opacity: 1 }} animate={ctnControls}>
                        <List ref={listRef}>
                            {gridItems.map((item) => (
                                <motion.div
                                    key={item.index}
                                    initial={{
                                        x: item.x,
                                        y: item.y,
                                        width: item.width,
                                        height: item.height,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: item.x,
                                        y: item.y,
                                        width: item.width,
                                        height: item.height,
                                        opacity: 1,
                                    }}
                                    transition={{ type: "spring", stiffness: 100, damping: 40, mass: 5 }}
                                    style={{
                                        padding: item.padding + "px",
                                        borderRadius: item.borderRadius,
                                    }}
                                >
                                    <motion.div
                                        style={{
                                            ...item.css,
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "none",
                                        }}
                                        initial={{ boxShadow: "0px 0px 2px 0px #FFFFFFAA" }}
                                        animate={boxShadowControls}
                                    />
                                </motion.div>
                            ))}
                        </List>
                    </motion.span>

                    <motion.div
                        style={{
                            position: "absolute",
                            top: -containerHeight / 2,
                            left: -containerWidth / 2,
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${src})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            padding: padding,
                            zIndex: -1,
                        }}
                        initial={{ boxShadow: `0px 0px 0px 0px ${themeColor}`, opacity: 0 }}
                        animate={outerControls}
                    ></motion.div>
                </motion.div>
            );
    }
);

SquareImagePuzzle.displayName = "SquareImagePuzzle";

SquareImagePuzzle.propTypes = {
    columns: PropTypes.number,
    gap: PropTypes.number,
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
    interval: PropTypes.number,
};

export default SquareImagePuzzle;
