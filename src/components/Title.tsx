import React from "react";
import Icons from "./Icons";
import "./Title.css";

interface TitleProps {
    h1: string;
    h2?: string[];
}

const Title: React.FC<TitleProps> = ({ h1, h2 = [] }) => {
    return (
        <section className="title">
            <h1>{h1}</h1>
            {h2.map((h, index) => (
                <h2 key={index}>
                    <Icons.ArrowRight />
                    {h}
                </h2>
            ))}
        </section>
    );
};

export default Title;
