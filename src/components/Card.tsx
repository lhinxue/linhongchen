import "./Card.css";
import Icons from "./Icons";

export default function Card({ h1, timestamp, tags, p }) {
    return (
        <section className="card">
            <h3>{h1}</h3>
            {timestamp && (
                <div className="timestamp">
                    <Icons.CalendarDots />
                    <em>{timestamp}</em>
                </div>
            )}
            <div>
                <Icons.Tag  />
                <div className="tags">
                    {tags.map((tag) => (
                        <div key={tag} className="tag">
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            <p dangerouslySetInnerHTML={{ __html: p }} />
        </section>
    );
}
