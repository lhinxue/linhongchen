import { useWindowSize } from "@uidotdev/usehooks";
import { create } from "zustand";

interface VideoBackgroundStore {
    isPlaying: boolean;
    play: (yesNo?: boolean) => void;
}

interface VideoBackgroundSource {
    landscape: string;
    portrait: string;
}

interface VideoBackgroundProps {
    src: string | VideoBackgroundSource;
    alt?: string | VideoBackgroundSource;
}

export const useVideoBackground = create<VideoBackgroundStore>((set) => ({
    isPlaying: false,
    play: (yesNo?: boolean) => set({ isPlaying: yesNo !== undefined ? (yesNo ? true : false) : true }),
}));

function VideoBackground({ src, alt }: VideoBackgroundProps) {
    const { width, height } = useWindowSize();
    const isLandscape = (width ?? 0) > (height ?? 0);

    const { isPlaying, play } = useVideoBackground();

    const videoSrc = typeof src === "string" ? src : isLandscape ? src.landscape : src.portrait;
    const imageSrc = typeof alt === "string" ? alt : isLandscape ? alt?.landscape : alt?.portrait;

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden -z-10">
            {!isPlaying && (
                <img
                    src={imageSrc}
                    alt="Background"
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                />
            )}
            <video
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                onPlay={() => play(true)}
                onError={() => play(false)}
                className={`absolute top-0 left-0 w-full h-full object-cover object-bottom ${
                    isPlaying ? "opacity-100" : "opacity-0"
                } -z-10`}
            />
        </div>
    );
}

export default VideoBackground;
