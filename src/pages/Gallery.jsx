import { useEffect } from "react";
import useContent from "../hooks/useContent";
import styled from "styled-components";
import { Avatar, Button, Card, Progress, Tag, Typography } from "antd";
import Timeline from "../components/Timeline";
import Subtitle from "../components/Subtitle";
import CardLibrary from "../components/CardLibrary";
import Reveal, { Fade, Flip, Slide, Zoom } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import Title from "../components/Title";
import FadeUp from "../animations/FadeUp";
import FadeDown from "../animations/FadeDown";
import pageType from "../assets/configs/pageType";
import ImageWiki from "../components/ImageWiki";

const Container = styled.div`
    background-color: #ffffffdd;
    width: 100%;
    min-height: 100vh;
    backdrop-filter: blur(5px);
    display: flex;

    & .TitleDescription {
        font-size: 1em;
        margin-bottom: 10vh;
        opacity: 0.5;
        text-align: center;
    }

    & > .content {
        width: 90vw;
        margin: auto;
        padding: 5vh 0;
    }

    & .cardList .ant-card {
        width: 100%;
        max-width: 1000px;
        margin: 20px auto;
    }

    & .contribution {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 12px;
        white-space: nowrap;
        gap: 5px;
    }

    & .header {
        display: flex;
        justify-content: space-between;
    }

    & .header h4 {
        margin-top: 0px;
    }
`;

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(1.5)
  }

  to {
    opacity: 1;
    transform: scale(1)
  }
`;

const Gallery = ({ page }) => {
    const content = useContent();
    useEffect(() => {
        console.log(content?.pages[page]);
    }, [content]);

    return (
        <Container>
            <div className="content">
                <Title c={content?.pages[page].title} />
                <FadeUp>
                    <h1
                        className="TitleDescription"
                        dangerouslySetInnerHTML={{ __html: content?.pages[page].subtitle }}
                    />
                </FadeUp>
                {(content?.pages[page].content ?? []).map((c) => {
                    switch (c.type) {
                        case pageType.ImageWiki:
                            return <ImageWiki c={c} />;
                        case pageType.CardLibrary:
                            return <CardLibrary cards={c.cards} itemWidth={c.itemWidth} />;
                        case pageType.Timeline:
                            return <Timeline content={c} />;
                        case pageType.BlockList:
                            return (
                                <div className="cardList">
                                    {c.list.map((l) => (
                                        <Card hoverable>
                                            <div className="header">
                                                <div>
                                                    <Typography.Title level={4}>{l.title}</Typography.Title>
                                                    <div>
                                                        {l.tags.map((t) => (
                                                            <Tag>{t}</Tag>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="contribution">
                                                    <span>{l.progress.label}</span>
                                                    <Progress
                                                        type="circle"
                                                        percent={l.progress.percent}
                                                        size={40}
                                                        format={(percent) => `${percent}%`}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                {l.content.map((p) => (
                                                    <p dangerouslySetInnerHTML={{ __html: p }} />
                                                ))}
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            );
                        default:
                            return <></>;
                    }
                })}
            </div>
        </Container>
    );
};

export default Gallery;
