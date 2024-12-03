import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";

const animate = (d) => keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export default function FadeIn({ children }) {
    return (
        <Reveal keyframes={animate(20)} cascade delay={400} damping={0.1}>
            {children}
        </Reveal>
    );
}
