import { Page } from "../App";
import Title from "../components/Title";

function About({ onReveal }) {
    return (
        <Page id="about" onReveal={onReveal}>
            <Title h1={"about"} h2={["That's the Kind of Boy I Am"]} />
        </Page>
    );
}

export default About;
