import Page from "../components/Page";
import Button from "../components/Button";
import Icons from "../components/Icons";
import "./Footer.css";

interface FooterProps {
    onReveal: () => void;
}

export default function Footer({ onReveal }: FooterProps) {
    return (
        <Page id="footer" onReveal={onReveal}>
            <section>
                <div>
                    <div>
                        <h1>Hongchen Lin</h1>
                        <h2>a real man</h2>
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
                    <Button>download CV</Button>
                    <Button>Send Email</Button>
                </div>
            </section>
            <section>
                <p>linhongchen.com created by Honghchenlin and hosted by Github</p>
            </section>
        </Page>
    );
}
