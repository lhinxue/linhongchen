import { motion } from "motion/react";
import { useEffect } from "react";

import Icons from "./components/Icons";
import Abilities from "./pages/Abilities";
import About from "./pages/About";
import Experience from "./pages/Experience";

import "./App.css";
import ScrollArea from "./components/ScrollArea";
import Cover from "./pages/Cover";
import Footer from "./pages/Footer";
import useNavigator from "./hooks/useNavigator";
import useTheme from "./hooks/useTheme";
import clsx from "clsx";

function App() {
    const { current, setCurrent: _setCurrent, scrollTo, scrolling } = useNavigator();

    const setCurrent = (id: string) => {
        if (!scrolling) _setCurrent(id);
    };

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

    const coverAnimation = {
        disappear: {
            initial: onAppear(),
            animate: current !== "cover" ? onDisappear() : onAppear(),
            exit: onAppear(),
        },
        appear: {
            initial: onDisappear(),
            animate: current !== "cover" ? onAppear() : onDisappear(),
            exit: onDisappear(),
        },
    };

    const { dark, toggle } = useTheme();

    return (
        <div id="app" className={clsx({ dark })}>
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
            <div id="bg-mask" />
            <motion.div id="header" {...coverAnimation.appear}>
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
                <Cover
                    animation={coverAnimation.disappear}
                    onReveal={() => (scrolling ? void 0 : setCurrent("cover"))}
                    onNext={() => setCurrent("about")}
                />

                <motion.span {...coverAnimation.appear}>
                    <About onReveal={() => (scrolling ? void 0 : setCurrent("about"))} />
                    <Experience onReveal={() => (scrolling ? void 0 : setCurrent("experience"))} />
                    <Abilities onReveal={() => (scrolling ? void 0 : setCurrent("abilities"))} />
                    <Footer onReveal={() => (scrolling ? void 0 : setCurrent("footer"))} />
                </motion.span>
            </ScrollArea>
        </div>
    );
}

export default App;
