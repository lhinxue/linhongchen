import React from "react";
import clsx from "clsx";
import "./Button.css";

type ButtonProps = {
    children: React.ReactNode;
    inactive?: boolean;
    iconOnly?: boolean;
    disabled?: boolean;
    rounded?: boolean;
    tag?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({ children, inactive, iconOnly, disabled, rounded, tag, onClick }) => {
    return (
        <button
            className={clsx("button", { inactive, "icon-only": iconOnly, disabled, rounded, tag })}
            onClick={onClick}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
