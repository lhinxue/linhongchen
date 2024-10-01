import { Children, cloneElement } from "react";
import styled from "styled-components";

const Container = styled.span`
    /* font-style: italic;
    font-weight: bold;
    text-decoration: underline;
    text-decoration: line-through; */
    ${(p) => p.active && "color: #63ae56;"}
    ${(p) => p.link && "text-decoration: underline; cursor: pointer;"}
    transition: all .3s ease-in-out;

    &:hover {
        ${(p) => p.link && "opacity: .8;"}
    }
`;

const Text = ({ children, active, link, italic, strong, mark, underline, strikethrough, ...props }) => {
    return (
        <Container {...{ active, link, italic, strong, mark, underline, strikethrough }} {...props}>
            {children}
        </Container>
    );
};

export default Text;
