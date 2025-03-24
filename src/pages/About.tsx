import React from "react";
import Page from "../components/Page";
import Icons from "../components/Icons";

interface AboutProps {
    onReveal: () => void;
}

export interface Personality {
    icon: React.FC;
    title: string;
    notes: string;
}

const About: React.FC<AboutProps> = ({ onReveal }) => {
    const personalities: Personality[] = [
        {
            icon: Icons.CalendarHeart,
            title: "introverted",
            notes: "Asking me to make a speech in front of a bunch of real person will be a good way to murder me.",
        },
        {
            icon: Icons.MaskSad,
            title: "empathetic?",
            notes: "You may see me crying when watching movies or even listening to music. But I may be also cold-heart facing some very worth empathy things. <br /> Which side is the real me? I don't know the answer neighter.",
        },
        {
            icon: Icons.PenNibStraight,
            title: "creative",
            notes: "I was planning to be a musician, illustrator, a writer. But sadly, I am not the kind of person who's rich enough to chase their dream.",
        },
    ];

    return (
        <Page id="about" onReveal={onReveal} h1={"about"} h2={["INFP-T", "That's the Kind of Boy I Am"]}>
            <section>
                <p>
                    The Personality Test defines me as a <em>Mediator</em>, but I prefer to define myself as a <em>Poet</em>.
                </p>
            </section>
            <section>
                {personalities.map((p, index) => (
                    <div className="personality" key={index}>
                        <h3>
                            <p.icon />
                            {p.title}
                        </h3>
                        <p dangerouslySetInnerHTML={{ __html: p.notes }} />
                    </div>
                ))}
            </section>
        </Page>
    );
};

export default About;
