import React from "react";
import "./Card.css";
import Icons from "./Icons";

type CardProps = {
    h1: string;
    timestamp?: string;
    tags: string[];
    p: string;
};

const Card: React.FC<CardProps> = ({ h1, timestamp, tags, p }) => {
    return (
        <section className="card">
            <h3>{h1}</h3>
            {timestamp && (
                <div className="timestamp">
                    <Icons.CalendarDots />
                    <em>{timestamp}</em>
                </div>
            )}
            {tags.length > 0 && (
                <div className="tags-container">
                    <Icons.Tag />
                    <div className="tags">
                        {tags.map((tag) => (
                            <div key={tag} className="tag">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <p dangerouslySetInnerHTML={{ __html: p }} />
        </section>
    );
};

export default Card;
