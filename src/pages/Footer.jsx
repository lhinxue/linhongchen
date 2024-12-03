import { RiBilibiliLine, RiGithubLine, RiLinkedinBoxLine, RiLinkedinLine, RiMailLine, RiMetaLine, RiTwitterLine, RiTwitterXLine, RiWechatLine } from "@remixicon/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { Button, ConfigProvider } from "antd";
import styled from "styled-components";

import FadeUp from "../animations/FadeUp";
import Flip from "../animations/Flip";
import Text from "../components/Text";
import useContent from "../hooks/useContent";
import { atMost } from "../utils/system";

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
        bottom: -4vh;
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
            display: flex;
            justify-content: center;
            align-items: center;
        }

        & h2 {
            font-size: ${(p) => atMost(p.size / 12, 16)}px;
            margin: 0;
        }
    }
`;

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
    const content = useContent();
    return (
        <Container size={width}>
            <div className="qa">
                <FadeUp>
                    <h1>{content?.footer?.question}</h1>
                </FadeUp>
                {(content?.footer?.answers ?? []).map((v, i) => (
                    <FadeUp delay={2000 * (i + 1)}>
                        <h2>{v}</h2>
                    </FadeUp>
                ))}
                <h1>
                    {(content?.footer?.answer ?? []).map((v, i) => (
                        <Flip delay={(i + 1) * 1000 + 2000 * (1 + (content?.footer?.answers?.length ?? 0))}>
                            {v.split("").map((c, j) => (
                                <span key={j}>{c}</span>
                            ))}
                        </Flip>
                    ))}
                </h1>
            </div>

            <div className="contacts">
                <p>{content?.footer?.comment}</p>
                <p>{content?.footer?.address}</p>
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
