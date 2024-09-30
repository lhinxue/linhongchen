import { Button, Tooltip } from "antd";
import { Children, cloneElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";
import ScrollArea from "./ScrollArea";
import useContent from "../hooks/useContent";

const Container = styled.div`
    height: 100vh;

    & .page {
        width: 100%;
        min-height: 50vh;
    }
`;

const Steps = styled.div`
    position: fixed;
    height: 100vh;
    right: 10px;
    top: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 5px;

    & button {
        min-width: 15px !important;
        width: 15px !important;
        min-height: 15px !important;
        height: 15px !important;
    }
`;

const Pages = forwardRef(({ children, onChange, steps, showSteps }, ref) => {
    const child = useRef([]);
    const self = useRef(undefined);

    const content = useContent();

    const [index, _index] = useState(0);
    const [step, _step] = useState(0);

    const scrollTo = (pageIndex) => {
        if (pageIndex !== undefined) {
            child.current[pageIndex].scrollIntoView({ behavior: "smooth" });
        }
    };

    const onScroll = (event) => {
        const hasScrolled = event.target.scrollTop;
        const screenHeight = window.innerHeight;
        if (hasScrolled < screenHeight / 4) {
            _index(0);
            return;
        }
        if (self.current.scrollHeight - screenHeight - hasScrolled < screenHeight / 4) {
            _index(child.current.length - 1);
            return;
        }
        let targetPageIndex = child.current.findIndex((page) => hasScrolled < page.offsetTop - screenHeight / 3);
        if (targetPageIndex > 0 && targetPageIndex - 1 !== index) {
            _index(targetPageIndex - 1);
        }
    };

    useEffect(() => {
        _step(index);
        if (typeof onChange === "function") onChange(index);
    }, [index]);


    useImperativeHandle(ref, () => ({ scrollTo }));

    return (
        <>
            <Container>
                <ScrollArea ref={self} onScroll={onScroll}>
                    {Children.map(children, (c, i) => cloneElement(c, { ref: (e) => (child.current[i] = e) }))}
                </ScrollArea>
            </Container>
            <Steps>
                {(steps ?? []).map((v, i) => (
                    <Tooltip key={i} title={content?.[v.key]?.title ?? content?.pages[v.key]?.title} placement="left">
                        <Button shape="circle" type={i === step ? "primary" : "default"} onClick={() => scrollTo(i)} />
                    </Tooltip>
                ))}
            </Steps>
        </>
    );
});

const Page = forwardRef(({ children, ...props }, ref) => {
    return (
        <div className="page" ref={ref} {...props}>
            {children}
        </div>
    );
});

export { Pages, Page };
