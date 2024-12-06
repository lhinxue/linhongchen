import { Typography } from "antd";
import styled from "styled-components";

import Flip from "../animations/Flip";

const Container = styled.span`
    h1 {
        display: flex;
        justify-content: center;
        gap: 5px;
        margin: 10px;
        font-size: 2.5em;
        text-align: center;
    }
`;

export default function Title({ c, level = 1 }) {
    return (
        <Container>
            <Typography.Title level={level}>
                <Flip>
                    {(c ?? "").split("").map((v, i) => (
                        <span key={i}>{v}</span>
                    ))}
                </Flip>
            </Typography.Title>
        </Container>
    );
}
