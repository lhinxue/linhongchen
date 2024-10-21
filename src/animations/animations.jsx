import { keyframes } from "@emotion/react";
import Reveal from "react-awesome-reveal";

const FadeUp = (d) => keyframes`
  from {
    opacity: 0;
    transform: translateY(${d}px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Fu = ({ children }) => {
    return (
        <Reveal keyframes={FadeUp(20)} cascade damping={0.1}>
            {children}
        </Reveal>
    );
};

const FadeRight = (d) => keyframes`
  from {
    opacity: 0;
    transform: translateX(-${d}px);
  }

  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

const FlipY = () => keyframes`
  from {
    opacity: 0;
    transform: rotateY(60deg);
  }
  to {
    opacity: 1;
    transform: rotateY(0);
  }
`;

const FlipX = () => keyframes`
  from {
    opacity: 0;
    transform: rotateX(60deg);
  }
  to {
    opacity: 1;
    transform: rotateX(0);
  }
`;

export { FadeUp, FadeRight, FlipY, FlipX, Fu };
