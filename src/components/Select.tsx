import Button from "./Button";

export default function Select({ children, options = [], selection, onSelect }) {
    return (
        <div className="select">
            <Button>{children}</Button>
            <div className="select-child">
                {options
                    .filter((o) => o != selection)
                    .map((o) => (
                        <Button onClick={() => onSelect(o)}>{o}</Button>
                    ))}
            </div>
        </div>
    );
}
