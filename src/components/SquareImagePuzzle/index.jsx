import {a, useTransition} from "@react-spring/web";
import PropTypes from "prop-types";
import {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from "react";
import useMeasure from "react-use-measure";
import utils from "../../utils";
import styles from "./style.module.css";

const SquareImagePuzzle = forwardRef(
    (
        {
            columns = 3,
            interval = 5000,
            size = 80,
            src = "./Firefly.jpg",
            gap = 1, // default gap ratio in percentage
        },
        ref
    ) => {
        const [containerRef, {width, height}] = useMeasure();
        const [padding, setPadding] = useState(gap * (width + height) / 200);
        const [borderRadius, setBorderRadius] = useState('0.5rem');
        const [isShuffling, setIsShuffling] = useState(true);

        const initItems = () => {
            return Array.from({length: columns * columns}).map((_, i) => {
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
            });
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

        const reset = () => {
            setPadding(0);
            setBorderRadius('0');
            setIsShuffling(false);
            setItems(utils.resetArrayPosition);
        };

        const transitions = useTransition(gridItems, {
            key: (item) => item.index,
            from: ({x, y, width, height, padding, borderRadius}) => ({x, y, width, height, padding, borderRadius, opacity: 0}),
            enter: ({x, y, width, height, padding, borderRadius}) => ({x, y, width, height, padding, borderRadius, opacity: 1, immediate: true}),
            update: ({x, y, width, height, padding, borderRadius}) => ({x, y, width, height, padding, borderRadius}),
            leave: {height: 0, opacity: 0},
            config: {mass: 5, tension: 400, friction: 150},
            trail: 25
        });

        useEffect(() => {
            let t;
            if (isShuffling) {
                setItems(utils.shuffle);
                t = setInterval(() => setItems(utils.shuffle), interval);
                setBorderRadius('0.5rem');
            }
            return () => clearInterval(t);
        }, [isShuffling, interval]);

        useImperativeHandle(ref, () => ({
            reset,
            setIsShuffling: (shuffling) => {
                setIsShuffling(shuffling);
                if (shuffling) {
                    setPadding(gap * (width + height) / 200);
                    setBorderRadius('0.5rem');
                }
            }
        }));

        useEffect(() => {
            setPadding(gap * (width + height) / 200);
        }, [gap, width, height]);

        return (
            <div style={{width: `${size}vw`, height: `${size}vh`, maxWidth: `${size}vh`, maxHeight: `${size}vw`}}>
                <div
                    ref={containerRef}
                    className={styles.list}
                >
                    {transitions((style, item) => (
                        <a.div style={{...style, padding: style.padding.to((p) => p + 'px'), borderRadius: style.borderRadius}}>
                            <div
                                style={{
                                    ...item.css,
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 'inherit',
                                }}
                            />
                        </a.div>
                    ))}
                </div>
            </div>
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
