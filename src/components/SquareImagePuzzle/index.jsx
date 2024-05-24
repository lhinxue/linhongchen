import { a, useTransition } from "@react-spring/web";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import utils from "../../utils";
import styles from "./style.module.css";

const SquareImagePuzzle = forwardRef(
    (
        {
            columns = 3,
            interval = 5000,
            isShuffling = true,
            size = 80,
            src = "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
        },
        ref
    ) => {
        const [containerRef, { width, height }] = useMeasure();

        const initItems = () => {
            return Array.from({ length: columns * columns }).map((_, i) => {
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

        const [items, set] = useState(initItems());

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
                };
            });
            return [gridItems];
        }, [columns, height, items, width]);

        const reset = () => {
            set(utils.resetArrayPosition);
        };

        const transitions = useTransition(gridItems, {
            key: (item) => item.css,
            from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
            enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
            update: ({ x, y, width, height }) => ({ x, y, width, height }),
            leave: { height: 0, opacity: 0 },
            config: { mass: 5, tension: 500, friction: 100 },
            trail: 25,
        });

        useEffect(() => {
            let t;
            if (isShuffling) {
                set(utils.shuffle);
                t = setInterval(() => set(utils.shuffle), interval);
            }
            return () => clearInterval(t);
        }, [isShuffling, interval]);

        useImperativeHandle(ref, () => ({ reset }));

        return (
            <div style={{ width: `${size}vw`, height: `${size}vh`, maxWidth: `${size}vh`, maxHeight: `${size}vw` }}>
                <div
                    ref={containerRef}
                    className={styles.list}
                    style={{ position: "relative", width: "100%", height: "100%" }}
                >
                    {transitions((style, item) => (
                        <a.div style={style}>
                            <div
                                style={{
                                    ...item.css,
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
    isShuffling: PropTypes.bool,
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
    interval: PropTypes.number,
};

export default SquareImagePuzzle;
