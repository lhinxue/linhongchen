import styled from "styled-components";
import FadeUp from "../animations/FadeUp";

const Container = styled.div`
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    margin: auto;
    gap: 20px;
    align-items: center;

    & > div:first-child {
        flex: 1;
    }

    & > div:last-child {
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
        flex-direction: column-reverse;
        align-items: center;

        & > div:last-child {
            width: 100%;
        }
    }
`;

export default function ImageWiki({ c }) {
    return (
        <Container>
            <div>
                <FadeUp>
                    {c.text.map((p) => (
                        <p dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                </FadeUp>
            </div>
            <FadeUp>
                <div>{c.img.alt}</div>
            </FadeUp>
        </Container>
    );
}
