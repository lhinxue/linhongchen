import { animated, useSpring } from "@react-spring/web";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const GrayscaleWrapper = ({ level, children, duration = 1000 }) => {
    const [_duration, set] = useState(0);

    const { grayscale } = useSpring({
        from: { grayscale: 0 },
        to: { grayscale: level > 0 ? Math.min(level, 1) * 100 : 0 },
        config: { duration: _duration },
    });

    useEffect(() => {
        let timer;
        timer = setTimeout(() => {
            set(duration);
        }, 300);
        return () => clearTimeout(timer);
    }, [duration]);

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
