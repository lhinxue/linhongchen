import { useEffect } from "react";
import useContent from "../hooks/useContent";
import styled from "styled-components";

const Container = styled.div`
    background-color: #ffffffdd;
    width: 100%;
    min-height: 100vh;
    backdrop-filter: blur(5px);
    /* box-shadow: 0 0 6px 6px #ffffffdd; */
    display: flex;

    & h1 {
        margin: 0;
        font-size: 2.5em;
    }

    & .content {
        max-width: 800px;
        width: 90vw;
        margin: auto;
        padding: 5vh 0;
    }
    & .imageWiki {
        display: flex;
        justify-content: space-between;
    }

    & .imageWiki > .text {
        flex: 1;
        margin-right: 20px;
    }

    & .imageWiki > .img {
        width: 300px;
        max-width: 80vw;
        min-height: 300px;
        max-height: 80vh;
        background-color: #ddd;
        border-radius: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 500px) {
        & .imageWiki {
            flex-direction: column-reverse;
            align-items: center;
        }

        & .imageWiki > .img {
            width: 100%;
            margin-bottom: 20px; /* Space between image and text */
        }
    }
`;

const Gallery = ({ page }) => {
    const content = useContent();
    useEffect(() => {
        console.log(content?.pages[page]);
    }, [content]);

    return (
        <Container>
            <div className="content">
                <h1>{content?.pages[page].title}</h1>
                <h2 dangerouslySetInnerHTML={{ __html: content?.pages[page].subtitle }} />
                {(content?.pages[page].content ?? []).map((c) => {
                    if (c.type === "imageWiki") {
                        return (
                            <div className="imageWiki">
                                <div className="text">
                                    {c.text.map((p) => (
                                        <p dangerouslySetInnerHTML={{ __html: p }} />
                                    ))}
                                </div>
                                <div className="img">{c.img.alt}</div>
                            </div>
                        );
                    }
                })}
            </div>
        </Container>
    );
};

export default Gallery;
