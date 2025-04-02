import "./Bg.css";

export default function Bg() {
    return (
        <>
            <video
                id="bg"
                src="src\assets\bg.mp4"
                autoPlay
                loop
                preload="auto"
                crossOrigin="anonymous"
                playsInline
            ></video>
            {/* <img id="bg" src="src\assets\117046812_p2.jpg"/> */}
            <div id="bg-mask" className="light" />
        </>
    );
}
