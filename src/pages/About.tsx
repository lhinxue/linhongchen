import { Page } from "../App";
import Icons from "../components/Icons";
import Title from "../components/Title";
import WordCloud from "../components/WordCloud";
import Cover from "./Entry";

function About({ onReveal }) {
    return (
        <Page id="about" onReveal={onReveal} h1={"about"} h2={["INFP-T","That's the Kind of Boy I Am"]}>
            <section>
                <p>
                    The Personality Test defines me as a <em>Mediator</em>, but I prefer to define myself as a{" "}
                    <em>Poet</em>.
                </p>
            </section>
            <section>
                <div>
                    <h3>
                        <Icons.CalendarHeart />
                        Introverted
                    </h3>
                    <p>Asking me to make a speech in front of a bunch of real person will be a good way to murder me.</p>
                </div>
                <div>
                    <h3>
                        <Icons.MaskSad />
                        Empathetic?
                    </h3>
                    <p>You may see me crying when watching movies or even listening to music. But I may be also cold-heart facing some very worth empathy things.<br/>Which side is the real me? I don't know the answer neighter.</p>
                </div>
                <div>
                    <h3>
                        <Icons.PenNibStraight />
                        Creative
                    </h3>
                    <p>I was planning to be a musician, illustrator, a writer. But sadly, I am not the kind of person who's rich enough to chase their dream.</p>
                </div>

            </section>
        </Page>
    );
}

export default About;
