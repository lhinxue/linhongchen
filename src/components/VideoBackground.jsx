import { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { doNothing } from "../utils/system";

const Container = motion(styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
    opacity: ${(props) => props.opacity};
    transition: opacity 1.5s ease;
`);

const VdC = motion(styled.span`
    position: relative;
    display: block;
    transition: height 1s cubic-bezier(0.215, 0.61, 0.355, 1), width 1s cubic-bezier(0.215, 0.61, 0.355, 1);
    left: 50%;
    transform: translateX(-50%);
`);

const Vdo = styled.video`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

const VideoBackground = ({ src, scale, opacity = 1, onLoadComplete = doNothing }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const loadVideo = async () => {
            try {
                const response = await fetch(src);

                const reader = response.body.getReader();
                const contentLength = +response.headers.get("Content-Length");

                let receivedLength = 0;
                let chunks = [];

                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        break;
                    }

                    chunks.push(value);
                    receivedLength += value.length;
                }

                let chunksAll = new Uint8Array(receivedLength);
                let position = 0;
                for (let chunk of chunks) {
                    chunksAll.set(chunk, position);
                    position += chunk.length;
                }

                const blob = new Blob([chunksAll]);
                onLoadComplete();
                const videoUrl = URL.createObjectURL(blob);

                videoRef.current.src = videoUrl;
            } catch (error) {
                console.error("Error loading video:", error);
            }
        };

        loadVideo();
    }, [src]);

    return (
        <Container opacity={opacity} className="bg">
            <VdC style={{ height: `${101 + 10 * scale}%`, width: `${101 + 10 * scale}%` }}>
                <Vdo ref={videoRef} autoPlay muted controls={false} loop />
            </VdC>
        </Container>
    );
};

export default VideoBackground;
