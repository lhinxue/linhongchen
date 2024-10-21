import FadeUp from "../animations/FadeUp";

const Container = styled.div`
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    margin: auto;
    gap: 20px;

    & .text {
        flex: 1;
    }

    & .img {
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

        & .img {
            width: 100%;
        }
    }
`;

export default function ImageWiki({ c }) {
    return (
        <Container>
            <div className="text">
                <FadeUp>
                    {c.text.map((p) => (
                        <p dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                </FadeUp>
            </div>
            <FadeUp>
                <div className="img">{c.img.alt}</div>
            </FadeUp>
        </Container>
    );
}
