import { useWindowSize } from "@uidotdev/usehooks";
import React, { useState } from "react";
import styled from "styled-components";

function Background({ input }) {
    const { width, height } = useWindowSize();
    const isLandscape = width > height;

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const handleVideoPlay = () => setIsVideoPlaying(true);
    const handleVideoError = () => setIsVideoPlaying(false);

    // Determine the appropriate src and poster based on orientation
    const { src, poster } = isLandscape ? input.landscape : input.portrait;

    return (
        <Container>
            {/* Fallback image */}
            {!isVideoPlaying && <Image src={poster} alt="Background" />}
            {/* Video background */}
            <Video
                src={src}
                autoPlay
                muted
                loop
                playsInline
                onPlay={handleVideoPlay}
                onError={handleVideoError}
                isVisible={isVideoPlaying}
            />
        </Container>
    );
}

// Styled Components
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
`;

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`;

const Video =    styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
    z-index: -2;
`;

export default Background;
