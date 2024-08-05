import { useState, useEffect } from "react";

function useCustomWidth() {
    const calculateWidth = () => (window.innerWidth / 9 > 70 ? 70 : window.innerWidth / 9);

    const [width, setWidth] = useState(calculateWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(calculateWidth());
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return width;
}



export { useCustomWidth };
