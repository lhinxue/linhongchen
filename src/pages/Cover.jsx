import { Button } from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import styled from "styled-components";

import FadeDown from "../animations/FadeDown";
import FadeUp from "../animations/FadeUp";
import LocaleController from "../components/LocaleController";
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

    return (
        <Container size={width} className="dark">
            <div className="flex flex-col">
                <FadeDown>
                    <h3>Hi, I'm</h3>
                    <h1>Lin Hongchen,</h1>
                    <h2>a Traiblazer</h2>
                </FadeDown>
            </div>
            <FadeUp>
                <div className="flex flex-col gap-2">
                    <LocaleController />
                    <p>24岁单身人士。生理性别男，心理性别男。喜欢吃饭睡觉玩游戏。没有梦想。</p>
                </div>
                <Blockquote>
                    <p>
                        就算结局早已注定，那也无妨，人改变不了的事太多。但在此之前，在走向结局的路上，我们能做的事同样很多。
                    </p>
                    <p>而结局……也会因此展现截然不同的意义。</p>
                </Blockquote>
                <Button variant="light" color="default" onClick={() => scrollTo(1)}>
                    → 了解更多
                </Button>
            </FadeUp>
        </Container>
    );
};

export default Cover;
