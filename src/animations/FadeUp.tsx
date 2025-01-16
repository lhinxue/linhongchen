import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";

import { IAnimation } from "../interfaces/animations";

const animate = (distance: number) => keyframes`
  from {
    opacity: 0;
    transform: translateY(${distance}px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export default function FadeUp({ children, delay = 200, distance = 20 }: IAnimation.Default) {
    return (
        <Reveal keyframes={animate(distance)} cascade delay={delay} damping={0.1}>
            {children}
        </Reveal>
    );
}
