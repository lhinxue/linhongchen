import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";

const animate = (d) => keyframes`
  from {
    opacity: 0;
    transform: translateY(-${d}px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export default function FadeDown({ children }) {
    return (
        <Reveal keyframes={animate(20)} cascade delay={200} damping={0.1}>
            {children}
        </Reveal>
    );
}
