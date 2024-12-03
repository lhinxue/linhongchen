import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";

const animate = (d) => keyframes`
  from {
    opacity: 0;
    transform: translateX(-${d}px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export default function FadeRight({ children }) {
    return (
        <Reveal keyframes={animate(20)} cascade delay={200} damping={0.1}>
            {children}
        </Reveal>
    );
}
