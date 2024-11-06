import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@nextui-org/react";
import styled from "styled-components";

import FadeUp from "../animations/FadeUp";
import Masonry from "../containers/Masonry";
import Progress from "./Progress";

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
    max-width: 1200px;

    & .Card {
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
    gap: 3px;
`;

const Crd = ({ card }) => {
    return (
        <Card isFooterBlurred className="Card px-2 py-1">
            <CardHeader className="flex flex-col items-start gap-2 font-medium text-xl shadow-[0px_0px_10px_13px_#ffffff]">
                <div className="flex-1 text-lg">{card.title}</div>
                {card.tags && (
                    <Tags>
                        {card.tags.map((t) => (
                            <Chip key={t} size="sm" variant="flat">
                                {t}
                            </Chip>
                        ))}
                    </Tags>
                )}
                {card.progress && (
                    <Progress
                        value={card.progress}
                        label={"熟练度"}
                        colored
                        style={{
                            position: "absolute",
                            right: 5,
                            top: 10,
                        }}
                    />
                )}
            </CardHeader>
            {card.img && (
                <CardBody className="overflow-hidden" style={{ minHeight: card.img ? 200 : 0 }}>
                    <Image
                        isZoomed
                        removeWrapper
                        className="z-0 w-full h-full object-cover absolute top-0 left-0"
                        alt={card.img?.alt}
                        src={card.img?.src}
                    />
                </CardBody>
            )}
            <CardFooter className="shadow-[0px_0px_10px_13px_#ffffff]">
                <div className="flex flex-grow gap-2 items-center">
                    <span className="text-sm" dangerouslySetInnerHTML={{ __html: card.description }} />
                </div>
            </CardFooter>
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
