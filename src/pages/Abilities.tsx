import React, { useState } from "react";

import Page from "../components/Page";
import Button from "../components/Button";
import Card from "../components/Card";
import useApp from "../hooks/useApp";

interface AbilitiesProps {
    onReveal: () => void;
}

const Abilities: React.FC<AbilitiesProps> = ({ onReveal }) => {
    const { content } = useApp();

    // Initialize activeTags with all available skills.
    const [activeTags, setActiveTags] = useState<string[]>(content.abilityList1.map((s) => s.name));

    // Toggle the active state of a tag.
    const toggleTag = (tagName: string) => {
        setActiveTags((prev) => (prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]));
    };

    // Filter works: only include those that have at least one tag that is active.
    const filtered = content.abilityList2.filter((p) => p.tags.some((tag) => activeTags.includes(tag)));

    return (
        <Page
            id="abilities"
            onReveal={onReveal}
            h1={content.abilityH1}
            h2={content.abilityH2}
            headerContent={
                <section className="tags">
                    {content.abilityList1.map((skill) => (
                        <Button
                            tag
                            key={skill.name}
                            rounded
                            inactive={!activeTags.includes(skill.name)}
                            onClick={() => toggleTag(skill.name)}
                        >
                            {skill.name}
                        </Button>
                    ))}
                </section>
            }
        >
            <section className="gallery">
                {filtered.map((work, index) => (
                    <Card key={index} h1={work.name} timestamp={work.timestamp} tags={work.tags} p={work.notes} />
                ))}
            </section>
        </Page>
    );
};

export default Abilities;
