import useMeasure from "react-use-measure";
import useMedia from "./useMedia";
import { useEffect, useMemo, useState } from "react";
// import shuffle from "lodash.shuffle";
import { useTransition, a } from "@react-spring/web";
import "./Masonry.css";

function shuffle(array) {
    let n = array.length;
    let arr = array.slice(); // Copy the array
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i); // Get a random index
        if (j === i) j--; // Ensure it's different from the current index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}

export default function Masonry({ columns = 3 }) {
    const [ref, { width, height }] = useMeasure();
    const [items, set] = useState([
        { css: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg" },
        { css: "https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg" },
        { css: "https://images.pexels.com/photos/358574/pexels-photo-358574.jpeg" },
        { css: "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg" },
        { css: "https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg" },
        { css: "https://images.pexels.com/photos/227675/pexels-photo-227675.jpeg" },
        { css: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" },
        { css: "https://images.pexels.com/photos/327482/pexels-photo-327482.jpeg" },
        { css: "https://images.pexels.com/photos/310452/pexels-photo-310452.jpeg" },
    ]);
    useEffect(() => {
        set(shuffle);
        const t = setInterval(() => set(shuffle), 2000);
        return () => clearInterval(t);
    }, []);
    const [gridItems] = useMemo(() => {
        let heights = new Array(columns).fill(0);
        let gridItems = items.map((child) => {
            const column = heights.indexOf(Math.min(...heights));
            const x = (width / columns) * column;
            const y = (heights[column] += height / columns) - height / columns;
            return {
                ...child,
                x,
                y,
                width: width / 3,
                height: height / 3,
            };
        });
        return [gridItems];
    }, [columns, height, items, width]);
    // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
    const transitions = useTransition(gridItems, {
        key: (item) => item.css,
        from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
        enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
        update: ({ x, y, width, height }) => ({ x, y, width, height }),
        leave: { height: 0, opacity: 0 },
        config: { mass: 5, tension: 500, friction: 100 },
        trail: 25,
    });
    // Render the grid
    return (
        <div className="Masonry">
            <div ref={ref} className={"list"}>
                {transitions((style, item) => (
                    <a.div style={style}>
                        <div
                            style={{
                                backgroundImage: `url(${item.css}?auto=compress&dpr=2&h=500&w=500)`,
                            }}
                        />
                    </a.div>
                ))}
            </div>
        </div>
    );
}
