import React from "react";
import Page from "../components/Page";
import Card from "../components/Card";
import useApp from "../hooks/useApp";

interface ExperienceProps {
    onReveal: () => void;
}

const Experience: React.FC<ExperienceProps> = ({ onReveal }) => {
    const { content } = useApp();
    return (
        <Page id="experience" onReveal={onReveal} h1={content.expH1} h2={content.expH2}>
            {content.expList.map((event, index) => (
                <Card key={index} h1={event.name} timestamp={event.timestamp} tags={[event.tag]} p={event.notes} />
            ))}
        </Page>
    );
};

export default Experience;
