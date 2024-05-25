import { animated, useSpring } from "@react-spring/web";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
const GrayscaleWrapper = ({ level, children, duration = 1000 }) => {
    const initialGrayscale = useMemo(() => (level > 0 ? Math.min(level, 1) * 100 : 0), [level]);

    const { grayscale } = useSpring({
        grayscale: initialGrayscale,
        config: { duration },
    });

    useEffect(() => {
        // Force update the spring with new duration when it changes
        const forceUpdateSpring = async () => {
            await grayscale.start({ to: initialGrayscale, config: { duration } });
        };
        forceUpdateSpring();
    }, [duration, grayscale, initialGrayscale]);

    return (
        <animated.span style={{ filter: grayscale.to((value) => `grayscale(${value}%)`) }}>{children}</animated.span>
    );
};

GrayscaleWrapper.displayName = "GrayscaleWrapper";

GrayscaleWrapper.propTypes = {
    level: PropTypes.number.isRequired,
    children: PropTypes.any,
    duration: PropTypes.number,
};

export default GrayscaleWrapper;
