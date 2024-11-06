import { Button } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import styled from "styled-components";

import FadeDown from "../animations/FadeDown";
import FadeUp from "../animations/FadeUp";
import LocaleController from "../components/LocaleController";
import useContent from "../hooks/useContent";
import { atMost } from "../utils/system";

const Container = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    height: 97vh;
    justify-content: center;
    margin: auto;
    max-width: 600px;
    width: 90vw;
    gap: 6vh;
    margin-bottom: 3vh;
    text-shadow: 0 0 2px black;

    & h1 {
        font-size: ${(p) => atMost(p.size / 8, 50)}px;
        margin: 0;
    }

    & h2 {
        font-size: ${(p) => atMost(p.size / 10, 40)}px;
        margin: 0;
    }

    & h3 {
        font-size: ${(p) => atMost(p.size / 12, 30)}px;
        margin: 0;
    }

    & p,
    & * {
        font-size: 14px;
        margin: 0;
    }
`;

const Blockquote = styled.div`
    border: 1px solid;
    padding: 13px 15px 11px;
    position: relative;
    border-radius: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &::before {
        content: "“";
        font-size: 3em;
        margin-top: -0.9rem;
        position: absolute;
        top: -6px;
    }
`;

const Cover = ({ scrollTo }) => {
    const { width } = useWindowSize();
    const content = useContent();

    return (
        <Container size={width} className="dark">
            <div className="flex flex-col">
                <FadeDown>
                    <h3>{content?.cover?.greeting}</h3>
                    <h1>Lin Hongchen,</h1>
                    <h2>{content?.cover?.identity}</h2>
                </FadeDown>
            </div>
            <FadeUp>
                <div className="flex flex-col gap-2">
                    <LocaleController />
                    {(content?.cover?.intro ?? []).map((v) => (
                        <p>{v}</p>
                    ))}
                </div>
                <Blockquote>
                    <FadeUp>
                        {(content?.cover?.quote ?? []).map((v) => (
                            <p>{v}</p>
                        ))}
                    </FadeUp>
                </Blockquote>
                <Button variant="light" color="default" onClick={() => scrollTo(1)}>
                    → {content?.cover?.knowMore}
                </Button>
            </FadeUp>
        </Container>
    );
};

export default Cover;
