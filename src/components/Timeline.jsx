import styled from "styled-components";
import { Avatar, Button, Card, Progress, Timeline as AntdTimeline, Typography } from "antd";
import FadeDown from "../animations/FadeDown";
import FadeUp from "../animations/FadeUp";

const Container = styled.div`
    max-width: 800px;
    margin: auto;

    & .title {
        font-size: 1.5em;
        position: absolute;
        top: -0.25em;
    }

    & .timestamp {
        position: absolute;
        top: calc(-1em + -15px);
        font-style: italic;
    }

    & .content {
        padding-top: 30px;
    }
    & .content p {
        margin: 2px 0;
    }

    & .ant-timeline-item {
        padding-bottom: 60px;
    }
`;

const Item = ({ data }) => (
    <>
        <FadeUp>
            <div className="timestamp">{data.timestamp}</div>
            <div className="title">{data.title}</div>
        </FadeUp>
        <div className="content">
            <FadeUp>
                {data.content.map((p) => (
                    <p dangerouslySetInnerHTML={{ __html: p }} />
                ))}
            </FadeUp>
        </div>
    </>
);

export default function Timeline({ content }) {
    return (
        <Container>
            <AntdTimeline items={content.events.map((e) => ({ children: <Item data={e} /> }))} />
        </Container>
    );
}
