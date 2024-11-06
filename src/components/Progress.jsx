import { CircularProgress } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => props.alignItems};
    font-size: 12px;
    white-space: nowrap;

    & > *:last-child {
        background-color: #ffffffcc;
        border-radius: 10px;
        padding: 0 5px 5px 5px;
    }
`;

export default function Progress({ label, value, colored, ...props }) {
    const [alignItems, setAlignItems] = useState("center");
    const spanRef = useRef();
    const progressRef = useRef();

    useEffect(() => {
        if (spanRef.current && progressRef.current) {
            const spanWidth = spanRef.current.offsetWidth;
            const progressWidth = progressRef.current.offsetWidth;

            setAlignItems(spanWidth > progressWidth ? "flex-end" : "center");
        }
    }, [label, value]);

    return (
        <Container alignItems={alignItems} {...props}>
            <span ref={spanRef}>{label}</span>
            <CircularProgress
                ref={progressRef}
                size="lg"
                value={value}
                showValueLabel={true}
                color={colored ? (value > 75 ? "success" : value > 25 ? "warning" : "danger") : "primary"}
            />
        </Container>
    );
}
