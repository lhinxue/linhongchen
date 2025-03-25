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
    };

    useEffect(() => {
        getRandomTagline();
    }, []);

    const handleReveal = (id?: string) => {
        getRandomTagline();
        onReveal(id);
    };

    return (
        <Page id="cover" onReveal={handleReveal}>
            <motion.section initial={animation.initial} animate={animation.animate} exit={animation.exit}>
                <h1 dangerouslySetInnerHTML={{ __html: tagline1 }} />
                <h2 dangerouslySetInnerHTML={{ __html: tagline2 }} />
                <Button onClick={onNext}>Discover more</Button>
            </motion.section>
        </Page>
    );
}
