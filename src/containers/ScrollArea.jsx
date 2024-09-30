import { Corner, Root, Scrollbar, Thumb, Viewport } from "@radix-ui/react-scroll-area";
import { forwardRef } from "react";
import styled from "styled-components";

const Container = styled(Root)`
    height: 100%;
`;

const Content = styled(Viewport)`
    height: 100%;
`;

const ScrollArea = forwardRef(({ children, onScroll }, ref) => {
    return (
        <Container>
            <Content onScroll={onScroll} ref={ref}>
                {children}
            </Content>
            <Scrollbar orientation="vertical">
                <Thumb />
            </Scrollbar>
            <Scrollbar orientation="horizontal">
                <Thumb />
            </Scrollbar>
            <Corner />
        </Container>
    );
});

export default ScrollArea;
