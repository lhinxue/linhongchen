import { useScroll, useTransform, motion } from "framer-motion";
import { WORLD } from "./StyledComponent";
import T from "./T";

function AnimatedText({ fontSize, sp }) {
    const { scrollYProgress } = useScroll();
    const [sp1, sp2, sp3, sp4] = sp;
    console.log(sp1, sp2, sp3, sp4);
    // Define progress range for animation start and end
    const start = 0.02;
    const end = 0.1;

    // Define transformations for each element
    const welcomeY = useTransform(scrollYProgress, [sp1, sp2, sp3, sp4], [-100, 0, 0, -100]);
    // const welcomeOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    const toX = useTransform(scrollYProgress, [sp1, sp2, sp3, sp4], [-100, 0, 0, -100]);
    // const toOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    const myX = useTransform(scrollYProgress, [sp1, sp2, sp3, sp4], [100, 0, 0, 100]);
    // const myOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    const worldY = useTransform(scrollYProgress, [sp1, sp2, sp3, sp4], [100, 0, 0, 100]);

    // const worldOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

    return (
        <>
            <motion.span
                style={{
                    x: toX,
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                <pre style={{ fontFamily: "inherit" }}>{T({ jp: "……人々", zh: "……人们", en: "... Why do " })}</pre>
            </motion.span>
            <motion.span
                style={{
                    y: welcomeY,
                    // opacity: welcomeOpacity,
                    // flex: "1 1 100%",
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                <pre style={{ fontFamily: "inherit" }}>{T({ jp: "はなぜ眠る", zh: "为何会", en: "people " })}</pre>
            </motion.span>

            <motion.span
                style={{
                    y: worldY,
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                <pre style={{ fontFamily: "inherit" }}>{T({ jp: "ことを選ぶ", zh: "选择", en: "choose " })}</pre>
            </motion.span>
            <motion.span
                style={{
                    x: myX,
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                <pre style={{ fontFamily: "inherit" }}>{T({ jp: "のか？", zh: "沉睡？", en: "to slumber?" })}</pre>
            </motion.span>
        </>
    );
}

export default function Page2({ sp }) {
    const calcCustWidth = (scale = 1) => {
        return (window.innerWidth / 9 > 50 ? 50 : window.innerWidth / 9) * scale;
    };
    return (
        <div className="absolute flex justify-evenly items-center flex-col">
            <div
                style={{
                    paddingBottom: "10vh",
                    fontFamily: "DINO, Genshin",
                    // fontWeight: 800,
                    maxWidth: "80vw",
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                    textShadow: "0px 0px 3px #000",
                    fontSize: `${calcCustWidth() * 0.8}px`,
                    flexWrap: "wrap",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <AnimatedText fontSize={calcCustWidth() * 0.8} sp={sp} />
            </div>
        </div>
    );
}
