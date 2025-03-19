import Icons from "./Icons";

import "./Title.css";

export default function Title({ h1, h2 }) {
    return (
        <section className="title">
            <h1>{h1}</h1>
            {(h2 ?? []).map((h) => (
                <h2>
                    <Icons.ArrowRight />
                    {h}
                </h2>
            ))}
        </section>
    );
}
