import "./Button.css";
function Button({ children, inactive, iconOnly, disabled, rounded, onClick, tag }) {
    return (
        <button
            className={`${inactive ? "inactive " : ""}${iconOnly ? "icon-only " : ""}${disabled ? "disabled " : ""}${
                rounded ? "rounded " : ""
            }${tag ? "tag " : ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
