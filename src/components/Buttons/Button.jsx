import { animated } from "@react-spring/web";
import styled from "styled-components";

const Container = styled(animated.button)`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.themeColor};
  color: white;
  transition: background-color 0.3s ease;


`;

function Button({ className, children, Icon, size = 20, style, ...props }) {
    return (
        <Container
            
        >
            <Icon />
        </Container>
    );
}

export default Button;
