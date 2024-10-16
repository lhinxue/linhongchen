import { useEffect } from "react";
import useContent from "../hooks/useContent";
import styled from "styled-components";
import { Avatar, Button, Card, Progress, Tag, Typography } from "antd";
import Timeline from "../components/Timeline";

const Container = styled.div`
    background-color: #ffffffdd;
    width: 100%;
    min-height: 100vh;
    backdrop-filter: blur(5px);
    /* box-shadow: 0 0 6px 6px #ffffffdd; */
    display: flex;

    & h1 {
        margin: 10px;
        font-size: 2.5em;
        text-align: center;
    }

    & h1.subtitle {
        font-size: 1em;
        margin-bottom: 10vh;
        opacity: 0.5;
    }

    & > .content {
        width: 90vw;
        margin: auto;
        padding: 5vh 0;
    }

    & .imageWiki {
        max-width: 800px;
        display: flex;
        justify-content: space-between;
        margin: auto;
        gap: 20px;
    }

    & .imageWiki > .text {
        flex: 1;
    }

    & .imageWiki > .img {
        width: 300px;
        min-height: 300px;
        max-height: 80vh;
        background-color: #ddd;
        border-radius: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 500px) {
        & .imageWiki {
            flex-direction: column-reverse;
            align-items: center;
        }

        & .imageWiki > .img {
            width: 100%;
        }
    }

    & .ant-card-meta {
        flex-direction: row-reverse;
        align-items: center;
    }

    & .ant-card-meta-avatar {
        padding-right: 0px;
    }

    & .cardLibrary {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        gap: 20px;
    }

    & .cardLibrary .ant-card {
        width: 200px;
    }

    @media (max-width: 500px) {
        & .cardLibrary .ant-card {
            width: 90vw;
        }
    }

    & .cardList .ant-card {
        width: 100%;
        margin: 20px 0;
    }

    & .contribution {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 12px;
        white-space: nowrap;
    }

    & .header {
        display: flex;
        justify-content: space-between;
    }

    & .header h4 {
        margin-top: 0px;
    }
`;

function valueToPastelColor(value, pastelLevel = 80) {
    // Clamp value between 0 and 100
    value = Math.min(100, Math.max(0, value));

    let red, green;

    if (value < 50) {
        // From red to yellow, but cap green for a softer yellow
        red = 255;
        green = Math.round((value / 50) * 200); // Cap green at 230 to reduce brightness
    } else {
        // From yellow to green, but start red a bit lower to soften transition
        red = Math.round(255 - ((value - 50) / 50) * 230); // Reduce red more gradually
        green = 230 + Math.round(((value - 50) / 50) * 25); // Final green stays close to 255
    }

    const blue = pastelLevel; // Keep blue constant for a light, pastel effect

    // Convert RGB to hex color code
    const toHex = (component) => component.toString(16).padStart(2, "0");
    const color = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;

    return color;
}

const Gallery = ({ page }) => {
    const content = useContent();
    useEffect(() => {
        console.log(content?.pages[page]);
    }, [content]);

    return (
        <Container>
            <div className="content">
                <h1>{content?.pages[page].title}</h1>
                <h1 className="subtitle" dangerouslySetInnerHTML={{ __html: content?.pages[page].subtitle }} />
                {(content?.pages[page].content ?? []).map((c) => {
                    switch (c.type) {
                        case "imageWiki":
                            return (
                                <div className="imageWiki">
                                    <div className="text">
                                        {c.text.map((p) => (
                                            <p dangerouslySetInnerHTML={{ __html: p }} />
                                        ))}
                                    </div>
                                    <div className="img">{c.img.alt}</div>
                                </div>
                            );
                        case "cardLibrary":
                            return (
                                <div className="cardLibrary">
                                    {c.cards.map((card) => (
                                        <Card cover={<img alt={card.img?.alt} src={card.img?.src} />}>
                                            <Card.Meta
                                                title={card.title}
                                                description={card.description}
                                                avatar={
                                                    card.progress ? (
                                                        <Progress
                                                            type="circle"
                                                            percent={card.progress}
                                                            size={50}
                                                            strokeColor={valueToPastelColor(card.progress)}
                                                        />
                                                    ) : null
                                                }
                                            />
                                        </Card>
                                    ))}
                                </div>
                            );
                        case "timeline":
                            return <Timeline content={c} />;
                        case "cardList":
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
                                                    <Progress type="circle" percent={l.progress.percent} size={40} format={(percent) => `${percent}%`}/>
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
