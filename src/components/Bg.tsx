import "./Bg.css";

export default function Bg() {
    return (
        <>
            <video
                id="bg"
                src="https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/be5f1cc27a611c0e5997a63832d0f8db_1539232401522007101.mp4"
                autoPlay
                loop
                preload="auto"
                crossOrigin="anonymous"
                playsInline
            ></video>
            <div id="bg-mask" />
        </>
    );
}
