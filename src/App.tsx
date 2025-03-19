import { RiTranslate } from "@remixicon/react";
import viteLogo from "/vite.svg";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import Button from "./components/Button";
import Icons from "./components/Icons";
import Title from "./components/Title";
import Abilities from "./pages/Abilities";
import About from "./pages/About";
import Experience from "./pages/Experience";

import "./App.css";
import ScrollArea from "./components/ScrollArea";

const useNavigator = create()(
    subscribeWithSelector((set) => ({
        current: "cover",
        scrolling: false,
        setCurrent: (id) => set(() => ({ current: id })),
        scrollTo: (id) =>
            new Promise<void>((resolve) => {
                const element = document.getElementById(id);
                if (element) {
                    const observer = new IntersectionObserver((entries, observer) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                observer.disconnect();
                                set(() => ({ scrolling: false }));
                                resolve();
                            }
                        });
                    });
                    set(() => ({ scrolling: true }));
                    element.scrollIntoView({ behavior: "smooth" });
                    observer.observe(element);
                }
            }),
    }))
);
const useTheme = create((set) => ({
    dark: false,
    toggle: () => set((state) => ({ dark: !state.dark })),
}));

export function Page({ children, id, onReveal = () => {}, h1, h2, headerContent }) {
    const { inView, ref } = useInView({ threshold: 0.1 });

    useEffect(() => {
        if (inView) onReveal();
    }, [inView]);

    return (
        <>
            <div id={id} ref={ref} className="page">
                {h1 && (
                    <div className="page-header">
                        <Title h1={h1} h2={h2} />
                        {headerContent}
                    </div>
                )}
                <div className="page-content">{children}</div>
            </div>
        </>
    );
}

function App() {
    const headerA = {
        onAppear: () => {
            return {
                opacity: 1,
                transform: "translateY(0)",
                transition: { duration: 0.5, delay: 0, ease: "easeInOut" },
            };
        },
        onDisappear: () => {
            return {
                opacity: 0,
                transform: "translateY(-100%)",
                transition: { duration: 0.5, delay: 0, ease: "easeInOut" },
            };
        },
    };

    const [headerStatus, _headerStatus] = useState(true);

    const { current, setCurrent, scrollTo, scrolling } = useNavigator();

    useEffect(() => {
        scrollTo(current);
    }, [current]);
    const onAppear = () => {
        return {
            opacity: 1,
            transition: { duration: 0.5, delay: 0.3, ease: "easeInOut" },
        };
    };

    const onDisappear = () => {
        return {
            opacity: 0,
            transition: { duration: 0.5, delay: 0, ease: "easeInOut" },
        };
    };
    const { dark, toggle } = useTheme();
    return (
        <div id="app" className={`${dark ? "dark" : ""}`}>
            <video
                id="bg"
                // poster="https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/be5f1cc27a611c0e5997a63832d0f8db_1539232401522007101.mp4?x-oss-process=video/snapshot,t_1,f_jpg,m_fast"
                src="https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/be5f1cc27a611c0e5997a63832d0f8db_1539232401522007101.mp4"
                autoPlay
                loop
                preload="auto"
                crossOrigin="anonymous"
                playsInline
            ></video>
            <div id="bg-mask"/>
            <motion.div
                id="header"
                className="bg-white"
                initial={headerA.onDisappear()}
                animate={current !== "cover" ? headerA.onAppear() : headerA.onDisappear()}
                exit={headerA.onDisappear()}
            >
                <section>
                    <div>
                        <p>Hongchen Lin</p>
                        <blockquote>A real man is a real man</blockquote>
                    </div>
                    <div>
                        <button className="icon-only">
                            <Icons.Translate />
                        </button>
                        <button className="icon-only" onClick={toggle}>
                            <Icons.Sun />
                        </button>
                    </div>
                </section>
            </motion.div>
            <ScrollArea id="body">
                <Page id="cover" onReveal={() => (scrolling ? void 0 : setCurrent("cover"))}>
                    <motion.section
                        initial={onAppear()}
                        animate={current !== "cover" ? onDisappear() : onAppear()}
                        exit={onAppear()}
                    >
                        <h1>
                            {/* See you tomorrow */}
                            <p>Like fyreflies to a flame,</p>
                            <p>life begets death</p>
                        </h1>
                        <p>
                            Like an amazing cat. So fly, fly, fly.
                            <br />
                            See you tmr.
                        </p>
                        <Button onClick={() => setCurrent("experience")}>Discover more</Button>
                    </motion.section>
                </Page>
                <motion.span
                    initial={onDisappear()}
                    animate={current !== "cover" ? onAppear() : onDisappear()}
                    exit={onDisappear()}
                >
                    <About onReveal={() => (scrolling ? void 0 : setCurrent("about"))} />
                    <Experience onReveal={() => (scrolling ? void 0 : setCurrent("experience"))} />
                    <Abilities onReveal={() => (scrolling ? void 0 : setCurrent("abilities"))} />
                    <Page id="footer" onReveal={() => (scrolling ? void 0 : setCurrent("footer"))}>
                        <section>
                            <div>
                                <div>
                                    <h1>Hongchen Lin</h1>
                                    <h2>a real man</h2>
                                </div>
                                <div>
                                    <div>a b c d</div>
                                    <sub>linhongchen.com created by Honghchenlin and hosted by Github</sub>
                                </div>
                            </div>
                            <div>
                                <Button>download CV</Button>
                                <Button>Send Email</Button>
                            </div>
                        </section>
                    </Page>
                </motion.span>
            </ScrollArea>
        </div>
    );
}

export default App;
