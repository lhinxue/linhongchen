import Page from "../components/Page";
import Button from "../components/Button";
import Icons from "../components/Icons";
import "./Footer.css";
import useApp from "../hooks/useApp";
import P from "../components/P";

interface FooterProps {
    onReveal: () => void;
}

export default function Footer({ onReveal }: FooterProps) {
    const { content } = useApp();

    return (
        <Page id="footer" onReveal={onReveal}>
            <section>
                <div>
                    <div>
                        <h1>{content.name}</h1>
                        <h2>{content.epithet}</h2>
                    </div>
                    <div id="contacts">
                        <Icons.LinkedinLogo />
                        <Icons.GithubLogo />
                        <Icons.YoutubeLogo />
                        <Icons.XLogo />
                        <Icons.FacebookLogo />
                    </div>
                </div>
                <div>
                    <Button>{content.footerBtn1}</Button>
                </div>
            </section>
            <section>
                <P>{content.license}</P>
            </section>
        </Page>
    );
}
