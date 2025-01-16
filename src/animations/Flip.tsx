import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";
import { IAnimation } from "../interfaces/animations";


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

export default function Flip({ children, delay }: IAnimation.Default) {
    return (
        <Reveal keyframes={animate()} cascade damping={0.07} delay={delay}>
            {children}
        </Reveal>
    );
}
