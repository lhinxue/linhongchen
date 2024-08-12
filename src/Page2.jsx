import { useScroll, useTransform, motion } from "framer-motion";
import { WORLD } from "./StyledComponent";

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
                    y: welcomeY,
                    // opacity: welcomeOpacity,
                    flex: "1 1 100%",
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                Welcome
            </motion.span>
            <motion.span
                style={{
                    x: toX,
                    // opacity: toOpacity,
                    margin: "0 .2em",
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                to
            </motion.span>
            <motion.span
                style={{
                    x: myX,
                    // opacity: myOpacity,
                    margin: "0 .2em",
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                My
            </motion.span>
            <motion.span
                style={{
                    y: worldY,
                    // opacity: worldOpacity,
                    flex: "1 1 100%",
                    fontSize: `${fontSize}px`,
                    // letterSpacing: ".1em",
                    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                }}
            >
                W.O.R.L.D
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
                    fontFamily: "DINO",
                    // fontWeight: 800,
                    maxWidth: "80vw",
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                    textShadow: "0px 0px 3px #000",
                    fontSize: `${calcCustWidth() * 1.1}px`,
                    flexWrap: "wrap",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <AnimatedText fontSize={calcCustWidth() * 1.2} sp={sp} />
            </div>
        </div>
    );
}
