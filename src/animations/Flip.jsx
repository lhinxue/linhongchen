import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";

const animate = () => keyframes`
    from {
    opacity: 0;
    transform: rotateY(60deg);
    }
    to {
    opacity: 1;
    transform: rotateY(0);
    }
`;

export default function Flip({ children }) {
    return (
        <Reveal keyframes={animate()} cascade damping={0.07}>
            {children}
        </Reveal>
    );
}
