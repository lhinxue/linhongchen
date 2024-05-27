import { useWindowSize } from "@uidotdev/usehooks";
import styled from "styled-components";

const Container = styled.div`
    width: ${(props) => (props.width < props.height ? props.width : props.height * 0.8)}px;
    height: ${(props) => props.height}px;
`;

function MusicPlayer({ children }) {
    // const [ref, { width, height }] = useMeasure();
    const { width, height } = useWindowSize();

    return (
        <Container height={height} width={width}>
            {children}
        </Container>
    );
}

export default MusicPlayer;
