import { default as ReactMasonry } from "react-masonry-css";
import styled from "styled-components";
import FadeUp from "../animations/FadeUp";

const Container = styled.div`
    width: 100%;

    & .Masonry {
        display: flex;
        width: auto;
        padding: 16px;
        gap: 16px;
    }

    & .MasonryColumn {
        background-clip: padding-box;
        box-sizing: border-box;
        gap: 16px;
        display: flex;
        flex-direction: column;
    }
`;

export default function Masonry({ children }) {
    return (
        <Container>
            <ReactMasonry
                className={"Masonry"}
                columnClassName={"MasonryColumn"}
                breakpointCols={{ default: 5, 1400: 4, 935: 3, 630: 2, 500: 1 }}
            >
                {children}
            </ReactMasonry>
        </Container>
    );
}
