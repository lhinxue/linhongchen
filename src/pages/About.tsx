import { Page } from "../App";
import Icons from "../components/Icons";
import "./About.css";

function About({ onReveal }) {
    return (
        <Page id="about" onReveal={onReveal} h1={"about"} h2={["INFP-T", "That's the Kind of Boy I Am"]}>
            <section>
                <p>
                    The Personality Test defines me as a <em>Mediator</em>, but I prefer to define myself as a{" "}
                    <em>Poet</em>.
                </p>
            </section>
            <section>
                {[
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
                ].map((p) => (
                    <div className="personality">
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
}

export default About;
