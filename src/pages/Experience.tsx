import { Page } from "../App";
import Title from "../components/Title";

function Experience({ onReveal }) {
    const events = [
        {
            name: "Westlake Boys High school",
            tag: "Education background",
            timestamp: "2022-Now",
            notes: `I was studying music and designing on high school. But now I am writting codes - melody of data, if
                    being Romantic.
                    <br />
                    And I always belive the reason I don't have a girlfriend untill now is because I was being sent to
                    Boys High School. (Note: I am not a gay.)`,
        },
        {
            name: "University of Auckland",
            tag: "Education background",
            timestamp: "2022-Now",
            notes: ` Im not one of the best student, but I don't think I am bad. In school, there's 4 kind of student:
                    who never ask for help and just knows everything; who usually being asked for help but also need to
                    ask for help sometimes; who asked for help; and anonymas. I am the second group of people :)
               `,
        },
        {
            name: "Fields Cafe",
            tag: "work experience",
            timestamp: "2022-Now",
            notes: `My part-time job when I was in Uni. I almost do everything in the kitchen, except cooking. Although
                    I didn't lean too much of prof skills there, it is still a very valuable expericen. I get to learn
                    what is actually working and starting to pay my own bill :)`,
        },
        {
            name: "StayinFront Ltd",
            tag: "work experience",
            timestamp: "2022-Now",
            notes: `My first job, gained by my very first interview. Well it again proves I am one of the top.
                    <br />
                    In SIF I am one of the PSG which is converting Customer's requirements into actual program needs. I
                    did alot of things, including webpage, database, desktop, etc...
                `,
        },
    ];

    return (
        <Page id="experience" onReveal={onReveal}>
            <Title h1={"experience"} h2={["education background", "work experience"]} />
            {events.map((event) => (
                <section>
                    <h3>{event.name}</h3>
                    <p>
                        <em>{event.timestamp}</em>
                    </p>
                    <p>
                        <em>{event.tag}</em>
                    </p>
                    <p dangerouslySetInnerHTML={{ __html: event.notes }} />
                </section>
            ))}
        </Page>
    );
}

export default Experience;
