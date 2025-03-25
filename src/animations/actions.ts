import { TargetAndTransition } from "motion/react";

interface aAction {
    fadeIn: (options?: {
        up?: number | string;
        left?: number | string;
        right?: number | string;
        down?: number | string;
        delay?: number;
    }) => TargetAndTransition;
    fadeOut: (options?: {
        up?: number | string;
        left?: number | string;
        right?: number | string;
        down?: number | string;
        delay?: number;
    }) => TargetAndTransition;
}

const getTransform = (options?: {
    up?: number | string;
    left?: number | string;
    right?: number | string;
    down?: number | string;
}) => {
    let translateX: string | number = 0,
        translateY: string | number = 0;

    if (options) {
        if (options.up) translateY = `-${typeof options.up === "number" ? `${options.up}px` : options.up}`;
        if (options.down) translateY = `${typeof options.down === "number" ? `${options.down}px` : options.down}`;
        if (options.left) translateX = `-${typeof options.left === "number" ? `${options.left}px` : options.left}`;
        if (options.right) translateX = `${typeof options.right === "number" ? `${options.right}px` : options.right}`;
    }

    return `translate(${translateX}, ${translateY})`;
};

const aActions: aAction = {
    fadeIn: (options) => ({
        opacity: 1,
        transform: getTransform(options),
        transition: { duration: 0.5, delay: options?.delay ?? 0.3, ease: "easeInOut" },
    }),
    fadeOut: (options) => ({
        opacity: 0,
        transform: getTransform(options),
        transition: { duration: 0.5, delay: options?.delay ?? 0, ease: "easeInOut" },
    }),
};

export default aActions;
