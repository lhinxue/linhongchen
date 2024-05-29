import { animated, useSpring, useTransition } from "@react-spring/web";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import utils from "../../utils";
import styled from "styled-components";
import shuffle from "../../utils/src/shuffle";

const Back = styled.div``;

const List = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    & > div {
        position: absolute;
        will-change: transform, width, height, opacity;
        height: 33%;
        width: 33%;

        & > div {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 0.5rem;
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
        const [themeColor, setThemeColor] = useState("#FFFFFF");
        const [containerRef, { width, height }] = useMeasure();
        const [padding, setPadding] = useState((gap * (width + height)) / 200);
        const [borderRadius, setBorderRadius] = useState("0.5rem");

        const [isShuffling, setIsShuffling] = useState(true);

        const initItems = () => {
            return shuffle(
                Array.from({ length: columns * columns }).map((_, i) => {
                    const xPos = ((i % columns) * 100) / (columns - 1);
                    const yPos = (Math.floor(i / columns) * 100) / (columns - 1);
                    return {
                        index: i,
                        css: {
                            backgroundImage: `url(${src})`,
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
                const x = (width / columns) * column;
                const y = (heights[column] += height / columns) - height / columns;
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

        const [boxShadowCSS, glow] = useSpring(() => ({
            from: {
                boxShadow: `0px 0px 2px 0px #FFFFFFAA`,
            },
        }));

        const [outerCSS, outer] = useSpring(() => ({
            from: {
                boxShadow: `0px 0px 0px 0px ${themeColor}`,
                opacity: 0,
            },
        }));
        const [ctn, ctnapi] = useSpring(() => ({
            from: {
                opacity: 1,
            },
        }));

        const reset = () => {
            setPadding(0);
            setBorderRadius("0");
            setIsShuffling(false);
            setItems(utils.resetArrayPosition);
            glow.start({
                boxShadow: `0px 0px 6px 2px ${themeColor}`,
                config: { duration: 1600 },
            });
            outer.start({
                boxShadow: `0px 0px 6px 2px ${themeColor}`,

                opacity: 1,
                config: { duration: 300 },
                delay: 1800,
            });
            ctnapi.start({
                opacity: 0,
                config: { duration: 300 },
                delay: 2000,
            });
            setTimeout(() => {
                // glow.start({
                //     boxShadow: `inset 0px 0px 10px 10px #FFFFFF`,
                //     config: { duration: 200 },
                // });
            }, 1600);
        };

        useEffect(() => {
            utils.getImageThemeColor(src).then(setThemeColor);
            setItems(initItems());
        }, [src]);

        useEffect(() => {
            outer.start({ boxShadow: `0px 0px 10px 0px ${themeColor}00`, config: { duration: 0 } });
        }, [glow, themeColor]);

        const transitions = useTransition(gridItems, {
            key: (item) => item.index,
            from: ({ x, y, width, height, padding, borderRadius }) => ({
                x,
                y,
                width,
                height,
                padding,
                borderRadius,
                opacity: 0,
            }),
            enter: ({ x, y, width, height, padding, borderRadius }) => ({
                x,
                y,
                width,
                height,
                padding,
                borderRadius,
                opacity: 1,
                immediate: true,
            }),
            update: ({ x, y, width, height, padding, borderRadius }) => ({
                x,
                y,
                width,
                height,
                padding,
                borderRadius,
            }),
            leave: { height: 0, opacity: 0 },
            config: { mass: 5, tension: 600, friction: 200 },
            trail: 25,
        });

        useEffect(() => {
            let t;
            if (isShuffling) {
                // setItems(utils.shuffle);
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

        return (
            <animated.div
                style={{
                    width: size,
                    height: size,
                    maxHeight: "80vw",
                    maxWidth: "80vw",
                    position: "relative",
                }}
            >
                <animated.span style={{ ...ctn }}>
                    <List ref={containerRef}>
                        {transitions((style, item) => (
                            <animated.div
                                style={{
                                    ...style,
                                    padding: style.padding.to((p) => p + "px"),
                                    borderRadius: style.borderRadius,
                                }}
                            >
                                <animated.div
                                    style={{
                                        ...item.css,
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "inherit",
                                        ...boxShadowCSS,
                                    }}
                                />
                            </animated.div>
                        ))}
                    </List>
                </animated.span>

                <animated.div
                    style={{
                        position: "absolute",
                        top: 0,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${src})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        padding: padding,
                        zIndex: -1,

                        ...outerCSS,
                    }}
                ></animated.div>
            </animated.div>
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
