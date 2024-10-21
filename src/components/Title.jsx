import { Typography } from "antd";
import Reveal, { Fade } from "react-awesome-reveal";
import { FlipY } from "../animations/animations";
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

export default function Title({ c }) {
    return (
        <Container>
            <Typography.Title level={1}>
                <Flip>
                    {(c ?? "").split("").map((v, i) => (
                        <span key={i}>{v}</span>
                    ))}
                </Flip>
            </Typography.Title>
        </Container>
    );
}
