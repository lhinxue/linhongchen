import { useWindowSize } from "@uidotdev/usehooks";
import styled from "styled-components";
import { atLeast, atMost } from "../utils/system";

const Container = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    height: 90vh;
    justify-content: center;
    margin: auto;
    max-width: 600px;
    width: 90vw;
    gap: 6vh;
    margin-bottom: 10vh;

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

    & p {
        font-size: 14px;
        margin: 0;
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Paragraph = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Cover = () => {
    const { width } = useWindowSize();

    return (
        <Container size={width}>
            <Title>
                <h3>Hi, I'm</h3>
                <h1>Lin Hongchen,</h1>
                <h2>a Traiblazer</h2>
            </Title>
            <Paragraph>
                <p>English|中文|日本语</p>
                <p>24岁单身人士。生理性别男，心理性别男。喜欢吃饭睡觉玩游戏。没有梦想。</p>
            </Paragraph>
            <Paragraph>
                <p>
                    就算结局早已注定，那也无妨，人改变不了的事太多。但在此之前，在走向结局的路上，我们能做的事同样很多。
                </p>
                <p>而结局……也会因此展现截然不同的意义。</p>
            </Paragraph>
        </Container>
    );
};

export default Cover;
