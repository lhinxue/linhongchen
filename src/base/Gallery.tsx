import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@heroui/react";
import parse from "html-react-parser";
import styled from "styled-components";

import FadeUp from "../animations/FadeUp";
import { GalleryStyle } from "../enums/ContentBlockType";
import { IComponent } from "../interfaces/components";

const Wave = styled.div<{level:number}>`
    position: absolute;
    top: 0%;
    transform: scaleX(4);
    left: 0%;
    width: 100%;
    height:100%;
    overflow: hidden;
    &>span {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: calc(100% - 250px);
        background: hsl(var(--heroui-primary) / 0.1);
    }
    /* z-index: -10; */
    & > div {
        position: relative;
        top: 0;
        width: 100%;
        height: 250px;
        background: hsl(var(--heroui-primary) / 0.1);
    }
    & > div:before,
    & > div:after {
        content: "";
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, -75%);
    }
    & > div:before {
        border-radius: 55%;
        width: 100%;
        height: 120%;
        background: rgba(255, 255, 255, 1);
        animation: animate ${Math.random() * 5 + 10}s linear infinite;
    }
    & > div:after {
        border-radius: 30%;
        width: 100%;
        height: 80%;
        background: rgba(255, 255, 255, 0.5);
        animation: animate ${Math.random() * 5 + 18}s linear infinite;
    }

    @keyframes animate {
        0% {
            transform: translate(-50%, -75%) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -75%) rotate(360deg);
        }
    }
`;

export function GalleryItem({
    title,
    content,
    image,
    progress=100,
    progressLabel,
    tags,
    galleryStyle,
}: IComponent.GalleryItem) {
    return (
        <Card className="relative bg-none" fullWidth>
            <CardHeader className="pb-2 overflow-hidden relative bg-none">
                <div className="flex flex-col gap-3">
                    <p className="text-xl font-bold">{title}</p>
                    {tags && (
                        <div className="flex flex-row gap-2">
                            {/* <FadeUp> */}
                            {tags.map((t) => (
                                <Chip key={t} size="sm" variant="flat">
                                    {t}
                                </Chip>
                            ))}
                            {/* </FadeUp> */}
                        </div>
                    )}
                </div>
                {/* {image && galleryStyle === GalleryStyle.List && (
                    <div className="absolute -z-10">
                        <Image isZoomed removeWrapper src={image.src} alt={image.alt} />
                    </div>
                )} */}
            </CardHeader>
            {image && galleryStyle === GalleryStyle.Masonry && (
                <CardBody className="overflow-hidden">
                    <Image isZoomed removeWrapper src={image.src} alt={image.alt} />
                </CardBody>
            )}
            <CardFooter className="bg-none flex flex-grow flex-col gap-2 text-sm items-start pt-2 z-10">
                {/* <FadeUp distance={5}> */}
                {content.map((p) => (
                    <p>{parse(p)}</p>
                ))}
                {/* </FadeUp> */}
            </CardFooter>
            <Wave level={progress}>
                <div />
                <span />
            </Wave>
        </Card>
    );
}

const Masonry = styled.div`
    &.${GalleryStyle.Masonry} {
        column-count: 4;
        @media (max-width: 1280px) {
            column-count: 3;
        }
        @media (max-width: 768px) {
            column-count: 2;
        }

        @media (max-width: 480px) {
            column-count: 1;
        }

        & > div {
            break-inside: avoid;
            padding: 8px 0;
        }
    }
    &.${GalleryStyle.List} {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 90vw;
        max-width: 800px;
        & > div > div {
            padding: 8px;
        }
    }
`;

export default function Gallery({ items, style }: IComponent.Gallery) {
    return (
        <Masonry className={`m-auto w-[90vw] ${style}`}>
            <FadeUp damping={0.02}>
                {items.map((item) => (
                    <GalleryItem {...item} galleryStyle={style} />
                ))}
            </FadeUp>
        </Masonry>
    );
}
