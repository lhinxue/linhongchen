import React, { useState } from "react";

import Page from "../components/Page";
import Button from "../components/Button";
import Card from "../components/Card";

export interface Skill {
    name: string;
}

export interface Work {
    name: string;
    tags: string[];
    timestamp: string;
    notes: string;
}

interface AbilitiesProps {
    onReveal: () => void;
}

const Abilities: React.FC<AbilitiesProps> = ({ onReveal }) => {
    const skills: Skill[] = [
        { name: "React" },
        { name: "OfficeJs" },
        { name: "Python" },
        { name: "C#" },
        { name: "VB(.NET)" },
        { name: "HTML" },
        { name: "CSS" },
        { name: "Javascript" },
        { name: "Typescript" },
        { name: "Adobe Photoshop" },
        { name: "Adobe Premiuem Pro" },
    ];

    const works: Work[] = [
        {
            name: "Outlook Integration",
            tags: ["React", "OfficeJs", "HTML", "CSS", "Javascript"],
            timestamp: "2022-Now",
            notes: `My first job, gained by my very first interview. Well it again proves I am one of the top.
              <br />
              In SIF I am one of the PSG which is converting Customer's requirements into actual program needs. I
              did a lot of things, including webpage, database, desktop, etc...`,
        },
        {
            name: "Turandot",
            tags: ["Python"],
            timestamp: "2021 - 2024",
            notes: `Turandot is a pure Python application that allows you to create and open encrypted files. <br />
              The encryption method employed involves XOR-ing the file content with an input password. The
              password can consist of any characters, not limited to just letters and numbers. The longer the
              password, the more robust the encryption becomes. Github`,
        },
        {
            name: "Display Manager",
            tags: ["C#"],
            timestamp: "2021 - 2024",
            notes: `Display Manager is an application built using C#. It demonstrates advanced UI/UX and system integration techniques. Github`,
        },
    ];

    // Initialize activeTags with all available skills.
    const [activeTags, setActiveTags] = useState<string[]>(skills.map((skill) => skill.name));

    // Toggle the active state of a tag.
    const toggleTag = (tagName: string) => {
        setActiveTags((prev) => (prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]));
    };

    // Filter works: only include those that have at least one tag that is active.
    const filteredWorks = works.filter((work) => work.tags.some((tag) => activeTags.includes(tag)));

    return (
        <Page
            id="abilities"
            onReveal={onReveal}
            h1={"abilities"}
            h2={["Areas of Expertise", "contributed Projects"]}
            headerContent={
                <section className="tags">
                    {skills.map((skill) => (
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
                {filteredWorks.map((work, index) => (
                    <Card key={index} h1={work.name} timestamp={work.timestamp} tags={work.tags} p={work.notes} />
                ))}
            </section>
        </Page>
    );
};

export default Abilities;
