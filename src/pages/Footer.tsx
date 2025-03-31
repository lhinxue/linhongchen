import Page from "../components/Page";
import Button from "../components/Button";
import Icons from "../components/Icons";
import "./Footer.css";
import useApp from "../hooks/useApp";
import P from "../components/P";
import { AnimationProps, motion } from "motion/react";

interface FooterProps {
    onReveal: () => void;
    animation: AnimationProps;
}

export default function Footer({ onReveal, animation }: FooterProps) {
    const { content } = useApp();

    return (
        <Page id="footer" onReveal={onReveal}>
            <motion.section initial={animation.initial} animate={animation.animate} exit={animation.exit}>
                <div>
                    <h1>{content.name}</h1>
                    <h2>{content.epithet}</h2>
                </div>
                <div id="contacts">
                    <Button iconOnly>
                        <Icons.LinkedinLogo />
                    </Button>
                    <Button iconOnly>
                        <Icons.GithubLogo />
                    </Button>
                    <Button iconOnly>
                        <Icons.YoutubeLogo />
                    </Button>
                    <Button iconOnly>
                        <Icons.XLogo />
                    </Button>
                    <Button iconOnly>
                        <Icons.FacebookLogo />
                    </Button>
                    <Button iconOnly>
                        <Icons.Envelope />
                    </Button>
                </div>
                <Button>{content.footerBtn1}</Button>
                <P>{content.license}</P>
            </motion.section>
        </Page>
    );
}
