import { useEffect } from "react";
import styled from "styled-components";

import FadeUp from "../animations/FadeUp";
import pageType from "../assets/configs/pageType";
import BlockList from "../components/BlockList";
import CardLibrary from "../components/CardLibrary";
import ImageWiki from "../components/ImageWiki";
import Timeline from "../components/Timeline";
import Title from "../components/Title";
import useContent from "../hooks/useContent";

const Container = styled.div`
    background-color: #ffffffdd;
    width: 100%;
    min-height: 100vh;
    backdrop-filter: blur(5px);
    display: flex;

    & > .content {
        width: 90vw;
        margin: auto;
        padding: 5vh 0;
    }
`;

export default function Gallery({ page }) {
    const content = useContent();
    useEffect(() => {
        console.log(content?.pages[page]);
    }, [content]);

    return (
        <Container>
            <div className="content">
                <Title c={content?.pages[page].title} />
                <FadeUp>
                    <div
                        className="mb-[10vh] opacity-50 text-center"
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
                            return <BlockList c={c} />;
                        default:
                            return <></>;
                    }
                })}
            </div>
        </Container>
    );
}