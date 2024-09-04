import { motion, useScroll, useTransform } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import Bg from "./Bg";

const RootStyle = createGlobalStyle`
#root {
    width: 100%;
    height: ${(props) => props.pageCount * 100}vh;
    background-color: #333;
}

#app {
    position: fixed;
    height: 100vh;
    width: 100vw;
}
`;

function AppPage({ index, totalSections, scrollYProgress, Page }) {
    const p1 = (index * 2 - 1) / totalSections;
    const p2 = (index * 2) / totalSections;
    const p3 = (index * 2 + 1) / totalSections;
    const p4 = (index * 2 + 2) / totalSections;
    const opacity = useTransform(scrollYProgress, [p1, p2, p3, p4], [0, 1, 1, 0]);
    const pointerEvents = useTransform(scrollYProgress, [p1, p2, p3, p4], ["none", "auto", "auto", "none"]);

    return (
        <motion.div
            className="absolute h-screen w-screen flex justify-center items-center"
            style={{
                opacity,
                pointerEvents,
                transition: "opacity 1s ease-in-out",
            }}
        >
            <Page sp={[p1, p2, p3, p4]} />
        </motion.div>
    );
}

export default function AppContainer({ children, pages = [], onBgLoadCompleted }) {
    const { scrollYProgress } = useScroll();

    const totalSections = (pages.length - 1) * 2;

    return (
        <div id="app">
            <RootStyle pageCount={pages.length} />
            {children}
            {/* <Bg
                src={"bg (1).mp4"}
                sp={[0, 1]}
                maxScale={5}
                onLoadComplete={() => onBgLoadCompleted(true)}
            /> */}

            {pages.map((page, index) => (
                <AppPage
                    key={index}
                    index={index}
                    scrollYProgress={scrollYProgress}
                    totalSections={totalSections}
                    Page={page}
                />
            ))}
        </div>
    );
}
