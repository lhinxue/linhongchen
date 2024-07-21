import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const OpController = ({ on, children }) => {
    const controls = useAnimation();

    useEffect(() => {
        if (on) {
            controls.start({ opacity: 1, transition: { duration: 1 }, display: "block" });
        } else {
            controls.start({
                opacity: 0,
                transition: { duration: 1 },
                transitionEnd: { display: "none" },
            });
        }
    }, [on, controls]);

    return (
        <motion.span initial={{ opacity: 0, display: "none" }} animate={controls}>
            {children}
        </motion.span>
    );
};

export default OpController;
