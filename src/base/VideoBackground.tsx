import { useWindowSize } from "@uidotdev/usehooks";
import { create } from "zustand";
import { IStore } from "../interfaces/stores";
import { IComponent } from "../interfaces/components";

export const useVideoBackground = create<IStore.VideoBackground>((set) => ({
    isPlaying: false,
    play: (yesNo?: boolean) => set({ isPlaying: yesNo !== undefined ? (yesNo ? true : false) : true }),
}));

function VideoBackground({ src, alt }: IComponent.VideoBackground) {
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
