import { useWindowSize } from "@uidotdev/usehooks";
import styled from "styled-components";
import { atMost } from "../utils/system";
import { Button, ConfigProvider } from "antd";
import Text from "../components/Text";
import FadeUp from "../animations/FadeUp";
import {
    RiBilibiliLine,
    RiGithubLine,
    RiLinkedinBoxLine,
    RiLinkedinLine,
    RiMailLine,
    RiMetaLine,
    RiTwitterLine,
    RiTwitterXLine,
    RiWechatLine,
} from "@remixicon/react";

const Container = styled.div`
    color: white;
    height: 95vh;
    margin: auto;
    max-width: 800px;
    width: 90vw;
    margin-bottom: 5vh;
    display: flex;
    text-shadow: 0 0 2px black;
    flex-direction: column;
    justify-content: center;
    position: relative;
    align-items: center;

    & > .contacts {
        position: absolute;
        bottom: 0;
        text-align: center;
    }

    & > .qa {
        margin-bottom: 10vh;
        display: flex;
        flex-direction: column;
        gap: 15px;
        text-align: center;

        & h1 {
            font-size: ${(p) => atMost(p.size / 10, 30)}px;
            margin: 0;

            &.hidden {
                position: relative;
            }

            &.hidden::before {
                transition: opacity 1s ease-in-out;
                content: " ";
                background-color: white;
                position: absolute;
                display: block;
                height: 100%;
                padding: 5px 10px;
                left: -10px;
                top: -5px;
                width: 100%;
                border-radius: 10px;
                z-index: 10;
            }

            &.hidden:hover::before {
                opacity: 0;
            }
        }

        & h2 {
            font-size: ${(p) => atMost(p.size / 12, 16)}px;
            margin: 0;
        }
    }
`;

const Centered = styled.span`
    text-align: center;
    &::after {
        content: "${(p) => p.after}";
        position: absolute;
    }
`;

const CenteredText = ({ c }) => {
    return <Centered after={c.charAt(c.length - 1)}>{c.slice(0, -1)}</Centered>;
};

const LinkButtons = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    & > div {
        height: 30px;
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        & > svg {
            overflow: visible;
            width: 20px;
            height: 20px;
            & path {
                filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.8));
            }
        }
    }
`;

export default function Footer() {
    const { width } = useWindowSize();
    return (
        <Container size={width}>
            <div className="qa">
                <FadeUp>
                    <h1>……生命因何而沉睡？</h1>
                    <h2>因为我们害怕从「梦」中醒来？</h2>
                    <h2>因为睡眠是死亡的预演，我们尚未准备好迎接死亡？</h2>
                    <h1 className="hidden">因为总有一天，我们会从梦中醒来</h1>
                </FadeUp>
            </div>

            <div className="contacts">
                
                <p>远离故土的笼中鸟</p>
                <p>地球，太阳系，猎户臂，银河系，本地群，室女超星团，可观测宇宙</p>
                <LinkButtons>
                    {[
                        { name: "Bilibili", icon: <RiBilibiliLine />, link: "" },
                        { name: "Email", icon: <RiMailLine />, link: "" },
                        { name: "Github", icon: <RiGithubLine />, link: "" },
                        { name: "Linkedin", icon: <RiLinkedinBoxLine />, link: "" },
                        { name: "Meta", icon: <RiMetaLine />, link: "" },
                        { name: "Twitter", icon: <RiTwitterXLine />, link: "" },
                        { name: "Wechat", icon: <RiWechatLine />, link: "" },
                    ].map((v, i) => (
                        <div>{v.icon}</div>
                    ))}
                </LinkButtons>
            </div>
        </Container>
    );
}
