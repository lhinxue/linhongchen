import { Button, Card, CardFooter, CardHeader, CircularProgress, Image } from "@nextui-org/react";
import { Card as AntdCard, Progress, Tag } from "antd";
import { useState } from "react";
import styled from "styled-components";

import FadeUp from "../animations/FadeUp";
import Masonry from "../containers/Masonry";

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

const Container = styled.div`
    /* display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    gap: 20px;

    max-width: ; */
    max-width: 1200px;

    & .Card {
        /* width: ${(props) => props.itemWidth}px; */
        width: 100%;
    }

    & .ant-card-meta {
        flex-direction: row-reverse;
        align-items: center;
    }
    & .ant-card-body {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    & .ant-card-body::after,
    & .ant-card-body::before {
        display: none;
    }

    & .ant-card-meta-avatar {
        padding-right: 0px;
    }

    @media (max-width: 500px) {
        & .ant-card {
            width: 90vw;
        }
    }
`;

const Item = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Tags = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Crd = ({ card }) => {
    return (
        <Card isFooterBlurred className="Card px-2 py-1">
            <CardHeader className="font-medium text-xl" style={{ marginBottom: card.img ? 120 : 0 }}>
                {card.title}
            </CardHeader>
            <Image
                isZoomed
                removeWrapper
                className="z-0 w-full h-full object-cover absolute top-0 left-0"
                alt={card.img?.alt}
                src={card.img?.src}
            />
            <CardFooter className="">
                <div className="flex flex-grow gap-2 items-center">
                    <span className="text-sm" dangerouslySetInnerHTML={{ __html: card.description }} />
                </div>
                {card.progress && (
                    <CircularProgress
                        size="lg"
                        value={card.progress}
                        strokeColor={valueToPastelColor(card.progress)}
                        showValueLabel
                    />
                )}
            </CardFooter>
            {/* <Card cover={<img alt={card.img?.alt} src={card.img?.src} />}>
                {card.tags && (
                    <Tags>
                        {card.tags.map((tag) => (
                            <Tag>{tag}</Tag>
                        ))}
                    </Tags>
                )}
                <AntdCard.Meta
                    title={card.title}
                    description={<span dangerouslySetInnerHTML={{ __html: card.description }} />}
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
            </Card> */}
        </Card>
    );
};

export default function CardLibrary({ cards, itemWidth }) {
    return (
        <Container itemWidth={itemWidth ?? 200}>
            <Masonry>
                {cards.map((card) => (
                    <FadeUp>
                        <Item>
                            <Crd card={card} />
                        </Item>
                    </FadeUp>
                ))}
            </Masonry>
        </Container>
    );
}
