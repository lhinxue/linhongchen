import styled from "styled-components";
import Text from "./Text";

const Container = styled.div`
    margin: 50px auto;
    font-size: 1.7em;
    text-align: center;
`;

export default function Subtitle({ c }) {
    return <Container dangerouslySetInnerHTML={{ __html: c }} />;
}
