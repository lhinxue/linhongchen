import { Button, Card, CardBody, CardFooter, CardHeader, Chip, CircularProgress, Image } from "@heroui/react";
import parse from "html-react-parser";
import styled from "styled-components";

import FadeUp from "../animations/FadeUp";
import { GalleryStyle } from "../enums/ContentBlockType";
import Lucide from "../icons/Lucide";
import { IComponent } from "../interfaces/components";

export function GalleryItem({
    title,
    content,
    image,
    progress = 100,
    progressLabel,
    tags,
    galleryStyle,
}: IComponent.GalleryItem) {
    return (
        <Card className="relative bg-none" fullWidth>
            <CardHeader className="pb-2 overflow-hidden relative bg-none justify-between items-start">
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
                <CircularProgress showValueLabel value={progress} size="md" valueLabel={<Lucide.Percent size={16} />} />
                {/* <span className="flex flex-col items-end">
                    <span className="text-sm">{progressLabel}</span>
                    
                </span> */}
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
