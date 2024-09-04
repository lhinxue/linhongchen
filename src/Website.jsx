import { createGlobalStyle } from "styled-components";
import { Pinyinspan } from "./styleddiv";
import T from "./T";
import Bg from "./Bg";
import { useScroll } from "framer-motion";
import GenshinLoader from "./GenshinLoader";
import { useEffect, useState } from "react";
import OpController from "./OpController";

const RootStyle = createGlobalStyle`
html{
    background-color: #333;
}
`;

export default function Website() {
    const [v, _v] = useState(0);
    const [elementLoaderVisible, setELV] = useState(true);
    const [preLoadTaskCompleted, setPreLoadTaskCompleted] = useState(false);
    const [bgLoadCompleted, setBgLoadCompleted] = useState(false);
    const [showBg, setsbg] = useState(false);
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
    const calcCustWidth = (scale = 1) => {
        return (window.innerWidth / 9 > 50 ? 50 : window.innerWidth / 9) * scale;
    };
    useEffect(() => {
        if (preLoadTaskCompleted) {
            setTimeout(() => {
                setELV(false);
                setsbg(true);
            }, 1000);
        }
    }, [preLoadTaskCompleted]);
    const Page1 = () => (
        <div
            className="flex justify-evenly items-center flex-col"
            style={{
                transition: "opacity 1s ease-in-out",
            }}
        >
            <div className="flex flex-row items-center">
                {/* <AnimatedRectangles value={v} reverse /> */}
                <div
                    style={{
                        fontFamily: "DINO, Genshin, emoji",
                        maxWidth: "80vw",
                        display: "flex",
                        flexDirection: "column",
                        gap: "3em",
                        color: "white",
                        textShadow: "0px 0px 3px #000",
                    }}
                >
                    <span>
                        <p
                            style={{
                                fontSize: `${calcCustWidth() * 0.7}px`,
                                // marginBottom: "-.5em",
                            }}
                        >
                            <T
                                c={{
                                    jp: "こんにちは、私は",
                                    zh: "你好，我是",
                                    en: "Hello, I am",
                                }}
                            />
                        </p>
                        <p
                            style={{
                                display: "flex",
                                flexDirection: "wrap",
                                flexWrap: "wrap",
                                // gap: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: `${calcCustWidth()}px`,
                                    marginRight: ".3em",
                                }}
                            >
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
                                    <p>だが、その前に…結末に向かうまでにできることも、たくさんあるんだ。</p>
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
                                        Even if the ending has been predetermined, that's fine. There are countless
                                        things that humans cannot change.
                                    </p>
                                    <p>
                                        But before that, on the road towards the end, there are still many things that
                                        we can do.
                                    </p>
                                    <p>
                                        And because of this, the "end" will thus reveal a completely different meaning.
                                    </p>
                                </>
                            ),
                        })}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <RootStyle />
            <GenshinLoader value={v} completed={!elementLoaderVisible} />
            <div className="app">
                <Bg src={"bg (1).mp4"} sp={[0, 1]} maxScale={5} onLoadComplete={() => setBgLoadCompleted(true)} />

                <Page1 />
                <Page1 />
                <Page1 />
                <Page1 />
                <Page1 />
                <Page1 />
                <Page1 />
                <Page1 />
                <Page1 />
                <Page1 />
            </div>
        </>
    );
}
