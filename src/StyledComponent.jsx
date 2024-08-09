import { motion } from "framer-motion";
import { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useLang } from "./Context";

export const AppContainer = styled.div``;

export const Page = motion(styled.div`
    height: 100vh;
    width: 100vw;
`);

const Ctn = styled.span`
    /* background-color: #ffffff;
    color: #666; */
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1vw;
    /* font-family: monospace; */
    font-size: ${(props) => props.fontSize}px;
    text-align: center;

    & > span {
        /* padding: 0px 5px 10px 5px; */
        /* border-radius: .5em; */
        /* margin: 1vw; */
        /* background-color: white; */
        position: relative;
        transition: border-color 1s ease-in-out;
        width: ${(props) => props.fontSize * 1}px;
    }

    & > span::after {
        content: " ";
        position: absolute;
        background-color: #ffffff;
        border-radius: 1em;
        width: 0%;
        height: ${(props) => props.fontSize / 15}px;
        bottom: 0px;
        left: 0;
        box-shadow: 0px 0px 5px 0 #00000077;
        transition: width 0.6s ease-in-out;
    }
    & > span > span {
        display: inline-flex;
        overflow: hidden;
        width: 0;
        transition: width 1s ease-in-out;
    }

    & > span.selected::after {
        width: 100%;
        /* border-color: #ffffff; */
    }

    & > span.selected > span {
        /* width: 20vw; */
    }
`;

export const WORLD = ({ fontSize }) => {
    const ctnRef = useRef(null);
    const [offset, setOffset] = useState(0);
    const handleHover = (e) => {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const containerRect = ctnRef.current.getBoundingClientRect();

        if (rect.right > window.innerWidth) {
            setOffset(window.innerWidth - rect.right - 20); // 向左移动
        } else if (rect.left < 0) {
            setOffset(-rect.left + 20); // 向右移动
        } else {
            setOffset(0); // 复位
        }
    };
    const [selectedItem, _selectedItem] = useState();
    return (
        <Ctn ref={ctnRef} style={{ transform: `translateX(${offset}px)` }} fontSize={fontSize}>
            {[{ key: "Wisdom" }, { key: "Odyssey" }, { key: "Repository" }, { key: "Life" }, { key: "Dream" }].map(
                (m) => (
                    <span
                        key={m.key}
                        onClick={() => {
                            _selectedItem(m.key);
                        }}
                        className={`${selectedItem === m.key && "selected"}`}
                    >
                        {m.key[0]}
                        <span>{m.key.slice(1)}</span>
                    </span>
                )
            )}
        </Ctn>
    );
};
