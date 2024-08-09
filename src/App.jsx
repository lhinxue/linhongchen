import { Button, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Slider } from "@nextui-org/react";
import * as Icons from "@phosphor-icons/react";
import { AnimatePresence, animate, motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import BlurredBackground from "./components/BlurredBackground";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import useImageTheme from "./hooks/useImageTheme";
import usePortraitScreen from "./hooks/usePortraitScreen";
import SquareImagePuzzle from "./components/SquareImagePuzzle";
import Elements from "./assets/svg/Elements";
import Bg from "./Bg";
import GenshinLoader from "./GenshinLoader";
import VisibilityControl from "./VisibilityControl";
import OpController from "./OpController";
import AudioPlayer from "./AudioPlayer";
import { Pinyinspan } from "./styleddiv";
import { useCustomWidth } from "./useFitSize";
import { useLang } from "./Context";
import T from "./T";
import "./assets/font/font.css";
import { Page, WORLD } from "./StyledComponent";

const bounce = keyframes`
0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  0.4175%, 0.8325% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }
  1.25%, 2.0825%, 2.9175%, 3.75%, 4.5825% {
    -webkit-transform: scale3d(1.15, 1.15, 1.15) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.15, 1.15, 1.15) rotate3d(0, 0, 1, 3deg);
  }
  1.6675%, 2.5%, 3.3325%, 4.1675% {
    -webkit-transform: scale3d(1.15, 1.15, 1.15) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.15, 1.15, 1.15) rotate3d(0, 0, 1, -3deg);
  }
  7.5% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-transform: none;
    transform: none;
  }
  50.625% {
    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }
  51.25% {
    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }
  51.875% {
    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }
  52.5% {
    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }
  53.125% {
    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }
  54.1675% {
    -webkit-transform: none;
    transform: none;
  }
`;

const OnHoverAppear = styled.div`
    opacity: 0.1;
    &:hover {
        opacity: 1;
    }
`;
function AnimatedText() {
    const { scrollYProgress } = useScroll();

    // Define progress range for animation start and end
    const start = 0.02;
    const end = 0.1;

    // Define transformations for each element
    const welcomeY = useTransform(scrollYProgress, [start, end], [-100, 0]);
    const welcomeOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    const toX = useTransform(scrollYProgress, [start, end], [-100, 0]);
    const toOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    const myX = useTransform(scrollYProgress, [start, end], [100, 0]);
    const myOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    const worldY = useTransform(scrollYProgress, [start, end], [100, 0]);
    const worldOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    return (
        <>
            <motion.span
                style={{
                    y: welcomeY,
                    opacity: welcomeOpacity,
                    flex: "1 1 100%",
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                Welcome
            </motion.span>
            <motion.span
                style={{
                    x: toX,
                    opacity: toOpacity,
                    margin: "0 .2em",
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                To
            </motion.span>
            <motion.span
                style={{
                    x: myX,
                    opacity: myOpacity,
                    margin: "0 .2em",
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                My
            </motion.span>
            <motion.span
                style={{
                    y: worldY,
                    opacity: worldOpacity,
                    flex: "1 1 100%",
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                <WORLD />
            </motion.span>
        </>
    );
}
const BouncingSpan = styled.span`
    cursor: pointer;
    display: inline-block;
    animation: ${bounce} 20s infinite 5s;
`;

const imageList = ["./Firefly.jpg", "./March7th.jpg"];
function hexToHSL(hex) {
    // Convert hex to RGB first
    try {
        let r = 0,
            g = 0,
            b = 0;
        if (hex.length == 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length == 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(2);
        l = +(l * 100).toFixed(2);
        return [h, s + "%", l + "%"];
    } catch (error) {
        return [];
    }
}
const HideAfter = styled.span`
    &:after {
        display: none;
    }
`;
const Tryshi = styled.div`
    ${
        "" /* & div,
    & svg,
    & button,
    & span {
        transition: color 0.8s ease-in-out, background-color 0.8s ease-in-out, border-color 0.8s ease-in-out,
            border-inline-start-color 0.8s ease-in-out, fill 0.8s ease-in-out, background-image 0.8s ease-in-out;
    } */
    }
`;

function App() {
    const [grayscale, setGrayscale] = useState(1);
    const [bgProgress, setBgProgress] = useState(5);
    const ref = createRef();
    const [themeColor, imageSrc, nextImage, previousImage] = useImageTheme(imageList);
    const { width, height } = usePortraitScreen();
    const { custWidth } = useCustomWidth();
    const calcCustWidth = (scale = 1) => {
        return (window.innerWidth / 9 > 50 ? 50 : window.innerWidth / 9) * scale;
    };
    const { scrollYProgress } = useScroll();
    scrollYProgress.on("change", (latest) => {
        const clampedProgress = Math.min(Math.max(latest, 0), 0.1);

        // Calculate the new bgProgress
        const newBgProgress = 5 - ((clampedProgress - 0) / 0.1) * (5 - 0);

        // Update the state
        setBgProgress(newBgProgress);
    });

    const start = 0.02;
    const end = 0.1;

    // Define transformations for each element
    const welcomeY = useTransform(scrollYProgress, [start, end], [-100, 0]);
    const page1Opacity = useTransform(scrollYProgress, [0.02, 0.1], [1, 0]);

    const toX = useTransform(scrollYProgress, [start, end], [-100, 0]);
    const toOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    const myX = useTransform(scrollYProgress, [start, end], [100, 0]);
    const myOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    const worldY = useTransform(scrollYProgress, [start, end], [100, 0]);
    const worldOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    useEffect(() => {
        // setImageSrc(imageList[0]);
    }, []);
    const controls = useAnimation();

    const startAnimation = () => {
        controls.start({
            color: "#fff",
            transition: { duration: 0.5, easings: ["easeIn", "easeOut"] },
        });
    };
    const [v, _v] = useState(0);

    const [taskCompletingProgress, setTaskCompletingProgress] = useState(0);

    const [locale, setLocale, locales] = useLang();

    const [preLoadTaskCompleted, setPreLoadTaskCompleted] = useState(false);
    const [bgLoadCompleted, setBgLoadCompleted] = useState(false);

    useEffect(() => {
        const taskList = [bgLoadCompleted];
        const totalItems = taskList.length;
        const trueCount = taskList.filter((value) => value === true).length;
        const completionPercentage = trueCount / totalItems;

        _v(completionPercentage * 65);
        if (completionPercentage >= 1) {
            setTimeout(() => {
                _v(70);
                setPreLoadTaskCompleted(true);
            }, 1500);
        }
    }, [bgLoadCompleted]);

    const [elementLoaderVisible, setELV] = useState(true);
    const [showBg, setsbg] = useState(false);

    useEffect(() => {
        if (preLoadTaskCompleted) {
            setTimeout(() => {
                setELV(false);
                setsbg(true);
            }, 1000);
        }
    }, [preLoadTaskCompleted]);

    const adplayer = useRef(null);

    return (
        <div id="app">
            <GrayscaleWrapper level={0}>
                {/* Control */}
                <AudioPlayer ref={adplayer} />

                {/* Controller */}
                <OnHoverAppear
                    style={{
                        position: "fixed",
                        zIndex: 999,
                        background: "white",
                        padding: 20,
                    }}
                >
                    <Slider
                        label="Element Loader"
                        size="sm"
                        minValue={0}
                        maxValue={70}
                        renderThumb={(props) => <HideAfter {...props} />}
                        style={{
                            transition: "all 1s",
                        }}
                        value={v}
                        onChange={_v}
                    />
                    <Slider
                        label="Background Size"
                        size="sm"
                        minValue={0}
                        maxValue={5}
                        renderThumb={(props) => <HideAfter {...props} />}
                        style={{
                            transition: "all 1s",
                        }}
                        value={bgProgress}
                        onChange={setBgProgress}
                    />
                    <Select
                        label="Language"
                        selectedKeys={new Set([locale])}
                        onSelectionChange={(v) => setLocale(Array.from(v)[0])}
                    >
                        {locales.map((l) => (
                            <SelectItem key={l}>{l}</SelectItem>
                        ))}
                    </Select>
                    <Select label="Scroll To">
                        {[0, 0.1].map((l) => (
                            <SelectItem
                                key={l}
                                onClick={() => {
                                    const targetScrollPosition = document.documentElement.scrollHeight * l;
                                    window.scrollTo({ top: targetScrollPosition, behavior: "smooth" });
                                }}
                            >
                                {l}
                            </SelectItem>
                        ))}
                    </Select>
                </OnHoverAppear>

                {/* Content */}
                <OpController on={!showBg}>
                    <div
                        style={{
                            position: "fixed",
                            height: "100vh",
                            width: "100vw",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <GenshinLoader value={v} active={elementLoaderVisible} />
                    </div>
                </OpController>

                <OpController on={showBg}>
                    <Bg src={"bg (1).mp4"} level={bgProgress} onLoadComplete={() => setBgLoadCompleted(true)} />

                    <div className="h-screen w-screen flex justify-center items-center">
                        {/*  */}
                        <motion.div
                            className="absolute flex justify-evenly items-center flex-col"
                            style={{
                                // width: width,
                                // height: height,
                                "--nextui-primary": hexToHSL(themeColor).join(" "),
                                opacity: page1Opacity,
                                transition: "opacity 1s ease-in-out",
                            }}
                        >
                            {/* <GenshinLoader value={v} active={elementLoaderVisible} /> */}
                            {/* <BlurredBackground src={imageSrc} /> */}

                            <div className="flex flex-row items-center">
                                {/* <AnimatedRectangles value={v} reverse /> */}
                                <div
                                    style={{
                                        fontFamily: "DINO, Genshin, emoji",
                                        // fontWeight: 400,
                                        maxWidth: "80vw",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "3em",
                                        color: "white",
                                        textShadow: "0px 0px 3px #000",
                                        // lineHeight: "1em",
                                        // textAlign: "center",
                                        // letterSpacing: "-.05em",
                                        // fontVariantCaps: "small-caps",
                                    }}
                                >
                                    <span>
                                        <p
                                            style={{
                                                fontSize: `${calcCustWidth() * 0.7}px`,
                                                // marginBottom: "-.5em",
                                            }}
                                        >
                                            <T c={{ jp: "こんにちは、私は", zh: "你好，我是", en: "Hello, I am" }} />
                                        </p>
                                        <p
                                            style={{
                                                display: "flex",
                                                flexDirection: "wrap",
                                                flexWrap: "wrap",
                                                // gap: "2rem",
                                            }}
                                        >
                                            <span style={{ fontSize: `${calcCustWidth()}px`, marginRight: ".3em" }}>
                                                <T
                                                    c={{
                                                        jp: (
                                                            <>
                                                                <Pinyinspan pinyin={"リン"}>林</Pinyinspan>
                                                                <Pinyinspan pinyin={"ホン"}>洪</Pinyinspan>
                                                                <Pinyinspan pinyin={"チェン"}>琛</Pinyinspan>、
                                                            </>
                                                        ),
                                                        zh: "林洪琛，",
                                                        en: "Hongchen Lin,",
                                                    }}
                                                />
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: `${calcCustWidth()}px`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    // justifyContent: "space-between",
                                                    // gap: "1rem",
                                                    // marginLeft: ".3em",
                                                }}
                                            >
                                                <span style={{}}>
                                                    <span>
                                                        <T c={{ zh: "一位", en: "a ", jp: "" }} />
                                                    </span>
                                                    {T({ zh: " ", jp: " ", en: "" })}
                                                    <Pinyinspan
                                                        pinyin={T({
                                                            jp: "仮面の愚者",
                                                            zh: "假面愚者",
                                                            en: "Masked   Fools",
                                                        })}
                                                    >
                                                        {T({ jp: "開拓者", zh: "开拓者", en: "Trailblazer" })}
                                                    </Pinyinspan>
                                                    {T({ zh: "。", jp: " です。", en: "." })}
                                                </span>
                                            </span>
                                        </p>
                                    </span>

                                    <div
                                        className="flex flex-col gap-2"
                                        style={{
                                            fontFamily: "StarRail-EN, SourceHanSansSC, StarRail-ZH",
                                            fontSize: `${calcCustWidth() * 0.3}px`,
                                        }}
                                    >
                                        {T({
                                            jp: (
                                                <>
                                                    <p>
                                                        すでに結末が決まっていたとしても、構うことはない。人には変えられないことがたくさんある……
                                                    </p>
                                                    <p>
                                                        だが、その前に…結末に向かうまでにできることも、たくさんあるんだ。
                                                    </p>
                                                    <p>そして「結末」は…それによってまったく異なる意味合いを見せる。</p>
                                                </>
                                            ),
                                            zh: (
                                                <>
                                                    <p>就算结局早已注定，那也无妨，人改变不了的事太多。</p>
                                                    <p>但在此之前，在走向结局的路上，我们能做的事同样很多。</p>
                                                    <p>而结局……也会因此展现截然不同的意义。</p>
                                                </>
                                            ),
                                            en: (
                                                <>
                                                    <p>
                                                        Even if the ending has been predetermined, that's fine. There
                                                        are countless things that humans cannot change.
                                                    </p>
                                                    <p>
                                                        But before that, on the road towards the end, there are still
                                                        many things that we can do.
                                                    </p>
                                                    <p>
                                                        And because of this, the "end" will thus reveal a completely
                                                        different meaning.
                                                    </p>
                                                </>
                                            ),
                                        })}
                                    </div>
                                    <div style={{ width: "fit-content" }}>
                                        <span
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 5,
                                                padding: "0 10px 3px 5px",
                                            }}
                                        >
                                            <BouncingSpan>
                                                <span
                                                    style={{
                                                        fontSize: `${calcCustWidth() * 0.8}px`,
                                                    }}
                                                >
                                                    <Icons.HandTap />
                                                </span>
                                            </BouncingSpan>
                                            <span
                                                style={{
                                                    fontSize: `${calcCustWidth() * 0.8}px`,
                                                }}
                                            >
                                                {/* Welcome to My World */}
                                            </span>
                                        </span>

                                        {/* <div
                                        style={{
                                            background: "white",
                                            height: (custWidth) * 0.025,
                                            borderRadius: "1em",
                                            width: "100%",
                                        }}
                                    ></div> */}
                                    </div>

                                    {/* <Button
                                    radius="full"
                                    // size="lg"
                                    variant="solid"
                                    // style={{
                                    //     // color: "white",
                                    //     width: `${window.innerWidth / 6 > 100 ? 100 : window.innerWidth / 6}px`,
                                    //     height: `${window.innerWidth / 6 > 100 ? 100 : window.innerWidth / 6}px`,
                                    // }}
                                    isIconOnly
                                    onClick={() => {
                                        adplayer.current.play();
                                    }}
                                    // size={window.innerWidth / 8 > 80 ? 80 : window.innerWidth / 8}
                                >
                                    <span></span>
                                    <Icons.MagnifyingGlass />
                                </Button> */}
                                    {/* <p>生命因何而沉睡？</p> */}

                                    {/* <p >WELCOME</p>
                            <p>TO MY</p>
                            <p>W·O·R·L·D</p> */}
                                </div>

                                {/* <AnimatedRectangles value={v} /> */}
                            </div>
                            {/* <Wave /> */}

                            {/* <SquareImagePuzzle ref={ref} size={width} src={imageSrc} />
                    <div className="flex flex-col w-full items-center gap-5">
                        <Slider
                            size="sm"
                            classNames={{
                                base: "max-w-md gap-3 opacity-50",
                                thumb: "h-3",
                            }}
                            minValue={0}
                            maxValue={100}
                            defaultValue={100}
                            renderThumb={(props) => <HideAfter {...props} />}
                            style={{
                                transition: "all 1s",
                            }}
                        />
                        <div className="flex items-center gap-5">
                            <Button
                                isIconOnly
                                radius="full"
                                variant="bordered"
                                size="sm"
                                style={{ color: themeColor, borderColor: `${themeColor}AA` }}
                                onClick={previousImage}
                            >
                                <Icons.SkipBack weight="bold" fill={themeColor} />
                            </Button>
                            <Button
                                isIconOnly
                                radius="full"
                                variant="bordered"
                                size="lg"
                                style={{ color: themeColor, borderColor: `${themeColor}AA` }}
                                onClick={() => {
                                    setTimeout(() => setGrayscale(0), 500);
                                    ref.current.reset();
                                }}
                            >
                                <Icons.Play weight="bold" fill={themeColor} />
                            </Button>
                            <Button
                                isIconOnly
                                radius="full"
                                variant="bordered"
                                size="sm"
                                onClick={() => nextImage()}
                                style={{ color: themeColor, borderColor: `${themeColor}AA` }}
                            >
                                <Icons.SkipForward weight="bold" fill={themeColor} />
                            </Button>
                        </div>
                    </div> */}
                        </motion.div>
                        <Page className="absolute flex justify-evenly items-center flex-col">
                            <div
                                style={{
                                    paddingBottom: "10vh",
                                    fontFamily: "DINO, Genshin, emoji",
                                    // fontWeight: 400,
                                    maxWidth: "80vw",
                                    display: "flex",
                                    flexDirection: "row",
                                    color: "white",
                                    textShadow: "0px 0px 3px #000",
                                    fontSize: `${calcCustWidth() * 1.3}px`,
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    textAlign: "center",
                                }}
                            >
                                {/* <span>Welcome</span>
                                <span>
                                    <span>To</span>
                                    <span>My</span>
                                </span>
                                <span>W·O·R·L·D</span> */}
                                <AnimatedText />
                            </div>
                        </Page>

                        <Page>opacity?</Page>
                    </div>
                </OpController>
            </GrayscaleWrapper>
        </div>
    );
}

export default App;
