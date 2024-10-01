import { useWindowSize } from "@uidotdev/usehooks";
import styled from "styled-components";
import { atMost } from "../utils/system";

const Container = styled.div`
    min-height: 80vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 90vw;
    max-width: 600px;
    margin: auto;

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
        font-size: ${(p) => atMost(p.size / 16, 14)}px;
        margin: 0;
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 20px;
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
                <h3>Hi, I am</h3>
                <h1>Lin Hongchen,</h1>
                <h2>a Traiblazer</h2>
            </Title>
            <Paragraph>
                <p>就算结局早已注定，那也无妨，人改变不了的事太多。但在此之前，在走向结局的路上，我们能做的事同样很多。</p>
                <p>而结局……也会因此展现截然不同的意义。</p>
            </Paragraph>
        </Container>
    );
};

export default Cover;
