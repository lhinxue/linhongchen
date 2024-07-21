import React, { useRef, useEffect } from "react";

// eslint-disable-next-line react/display-name
const AudioPlayer = React.forwardRef((_, ref) => {
    const initialAudioRef = useRef(null);
    const loopAudioRef = useRef(null);

    // Expose play method to parent component
    React.useImperativeHandle(ref, () => ({
        play: () => {
            initialAudioRef.current.play();
        },
    }));

    useEffect(() => {
        const initialAudio = initialAudioRef.current;
        const loopAudio = loopAudioRef.current;

        const handleInitialAudioEnded = () => {
            loopAudio.play();
        };

        const handleLoopAudioEnded = () => {
            loopAudio.play();
        };

        initialAudio.addEventListener("ended", handleInitialAudioEnded);
        loopAudio.addEventListener("ended", handleLoopAudioEnded);

        return () => {
            initialAudio.removeEventListener("ended", handleInitialAudioEnded);
            loopAudio.removeEventListener("ended", handleLoopAudioEnded);
        };
    }, []);

    return (
        <div>
            <audio ref={initialAudioRef} src="/start.mp3" />
            <audio ref={loopAudioRef} src="/repeat.mp3" />
        </div>
    );
});

export default AudioPlayer;
