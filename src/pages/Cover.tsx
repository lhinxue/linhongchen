import Page from "../components/Page";
import Button from "../components/Button";
import { AnimationProps, motion } from "motion/react";
import "./Cover.css";

// Define the shape of the animation object.

interface CoverProps {
    onReveal: () => void;
    animation: AnimationProps;
    onNext: () => void;
}

export default function Cover({ onReveal, animation, onNext }: CoverProps) {
    return (
        <Page id="cover" onReveal={onReveal}>
            <motion.section initial={animation.initial} animate={animation.animate} exit={animation.exit}>
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
                <Button onClick={onNext}>Discover more</Button>
            </motion.section>
        </Page>
    );
}
