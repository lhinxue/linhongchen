import { default as ReactMasonry } from "react-masonry-css";
import styled from "styled-components";
import { IComponent } from "../interfaces/components";

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

export default function Masonry({ children }: IComponent.Default) {
    return (
        <Container>
            <ReactMasonry
                className={"Masonry"}
                columnClassName={"MasonryColumn"}
                breakpointCols={{ default: 4, 1400: 3, 935: 2, 630: 1 }}
            >
                {children}
            </ReactMasonry>
        </Container>
    );
}