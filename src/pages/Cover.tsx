import Page from "../components/Page";
import Button from "../components/Button";
import { AnimationProps, motion } from "motion/react";
import "./Cover.css";
import useApp from "../hooks/useApp";
import { useState, useEffect } from "react";

interface CoverProps {
    onReveal: (id?: string) => void;
    animation: AnimationProps;
    onNext: () => void;
}

export default function Cover({ onReveal, animation, onNext }: CoverProps) {
    const { content } = useApp();
    const [tagline1, setTagline1] = useState("");
    const [tagline2, setTagline2] = useState("");
    const [tagline1p, setTagline1p] = useState("");
    const [tagline2p, setTagline2p] = useState("");
    const [lastIndex, setLastIndex] = useState<number | null>(null);

    const getRandomTagline = () => {
        if (!content.tagline || content.tagline.length === 0) return;
        let index;

        if (content.tagline.length > 1) {
            do {
                index = Math.floor(Math.random() * content.tagline.length);
            } while (index === lastIndex);
        } else {
            index = 0;
        }

        setLastIndex(index);
        setTagline1(content.tagline[index]._1);
        setTagline2(content.tagline[index]._2);
        setTagline1p(content.tagline[index]._1p);
        setTagline2p(content.tagline[index]._2p);
    };

    useEffect(() => {
        getRandomTagline();
    }, []);

    const handleReveal = (id?: string) => {
        getRandomTagline();
        onReveal(id);
    };

    return (
        <Page id="cover" className="dark" onReveal={handleReveal}>
            <motion.section initial={animation.initial} animate={animation.animate} exit={animation.exit}>
                <h1>
                    <span dangerouslySetInnerHTML={{ __html: tagline1 }} />
                    <span>
                        {tagline1p.split("").map((l) => (
                            <span>{l}</span>
                        ))}
                    </span>
                </h1>
                <h2>
                    <span>
                        {tagline2p.split("").map((l) => (
                            <span>{l}</span>
                        ))}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: tagline2 }} />
                </h2>
                <Button onClick={onNext}>Discover more</Button>
            </motion.section>
        </Page>
    );
}
