import React from "react";
import Page from "../components/Page";
import useApp from "../hooks/useApp";
import P from "../components/P";

interface AboutProps {
    onReveal: () => void;
}

const About: React.FC<AboutProps> = ({ onReveal }) => {
    const { content } = useApp();

    return (
        <Page id="about" onReveal={onReveal} h1={content.aboutH1} h2={content.aboutH2}>
            <section>
                <P>{content.aboutP}</P>
            </section>
            <section>
                {content.aboutList.map((p, index) => (
                    <div className="personality" key={index}>
                        <h3>
                            <p.icon />
                            {p.title}
                        </h3>
                        <P>{p.notes}</P>
                    </div>
                ))}
            </section>
        </Page>
    );
};

export default About;
