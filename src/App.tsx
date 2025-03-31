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
import useApp from "./hooks/useApp";
import Button from "./components/Button";
import Bg from "./components/Bg";
import aActions from "./animations/actions";
import Select from "./components/Select";

function App() {
    const { current, setCurrent: _setCurrent, scrollTo, scrolling } = useNavigator();

    const setCurrent = (id?: string) => {
        if (!scrolling && id) _setCurrent(id);
    };

    useEffect(() => {
        scrollTo(current);
    }, [current]);

    const animations = {
        cover: {
            initial: aActions.fadeIn(),
            animate: current !== "cover" ? aActions.fadeOut() : aActions.fadeIn(),
            exit: aActions.fadeIn(),
        },
        footer: {
            initial: aActions.fadeIn(),
            animate: current !== "footer" ? aActions.fadeOut() : aActions.fadeIn(),
            exit: aActions.fadeIn(),
        },
        header: {
            initial: aActions.fadeOut({ up: "100%" }),
            animate:
                current !== "cover" && current !== "footer"
                    ? aActions.fadeIn({ delay: 0 })
                    : aActions.fadeOut({ up: "100%" }),
            exit: aActions.fadeOut({ up: "100%" }),
        },
        body: {
            initial: aActions.fadeOut(),
            animate: current !== "cover" && current !== "footer" ? aActions.fadeIn() : aActions.fadeOut(),
            exit: aActions.fadeOut(),
        },
    };

    const { content, dark, toggleDarkTheme, locale, locales, setLocale } = useApp();

    return (
        <div id="app" className={clsx({ dark })}>
            <Bg />
            <motion.div id="header" {...animations.header}>
                <section>
                    <div>
                        <p>{content.name}</p>
                        <blockquote>{content.epithet}</blockquote>
                    </div>
                    <div>
                        <Select options={locales} selection={locale} onSelect={setLocale}>
                            <Icons.Translate />
                            {locale}
                        </Select>
                        <Button iconOnly onClick={toggleDarkTheme}>
                            <Icons.Sun />
                        </Button>
                    </div>
                </section>
            </motion.div>
            <ScrollArea id="body">
                <Cover animation={animations.cover} onReveal={setCurrent} onNext={() => setCurrent("about")} />
                <motion.span {...animations.body} className="body-content">
                    <About onReveal={setCurrent} />
                    <Experience onReveal={setCurrent} />
                    <Abilities onReveal={setCurrent} />
                </motion.span>
                <Footer animation={animations.footer} onReveal={setCurrent} />
            </ScrollArea>
        </div>
    );
}

export default App;
