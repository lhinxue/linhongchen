import styled from "styled-components";

const Container = styled.div`
    height: ${(props) => props.size}px;
    font-size: ${(props) => props.size}px;
`;

function Button({ className, children, Icon, size = 20, style, ...props }) {
    return (
        <div
            className={`flex flex-row items-center gap-3 ${className} text-white`}
            style={{
                height: size,
                fontSize: 14,
                ...style,
            }}
            {...props}
        >
            <Icon />
        </div>
    );
}

export default Button;
