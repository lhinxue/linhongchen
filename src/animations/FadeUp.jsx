import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";

const animate = (d) => keyframes`
  from {
    opacity: 0;
    transform: translateY(${d}px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export default function FadeUp({ children, delay = 200 }) {
    return (
        <Reveal keyframes={animate(20)} cascade delay={delay} damping={0.1}>
            {children}
        </Reveal>
    );
}
