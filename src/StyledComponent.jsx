import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";

export const AppContainer = styled.div``;

export const Page = motion(styled.div`
    height: 100vh;
    width: 100vw;
`);

const Ctn = styled.span`
    /* background-color: #ffffff;
    color: #666; */
    cursor: pointer;

    & > span {
        padding: 0px 5px 10px 5px;
        /* border-radius: .5em; */
        margin: 5px;
        /* background-color: white; */
        position: relative;
        border-bottom: 5px solid;
        border-color: #ffffff00;
        transition: border-color 1s ease-in-out;
    }

    & > span::after {
        content: " ";
        position: absolute;
        background-color: #ffffff;
        border-radius: 1em;
        width: 0%;
        height: 5px;
        bottom: 0;
        left: 0;
        box-shadow: 0px 0px 5px 0 #00000077;

        transition: width 0.6s ease-in-out;
    }
    & > span > span {
        display: inline-flex;
        overflow: hidden;
        max-width: 0;
        transition: max-width 1s ease-in-out;
    }

    & > span:hover::after {
        width: 100%;
        /* border-color: #ffffff; */
    }

    & > span:hover > span {
        max-width: 50vw;
    }
`;

export const WORLD = () => {
    return (
        <Ctn>
            <span>
                W<span>isdom</span>
            </span>
            .
            <span>
                O<span>dyssey</span>
            </span>
            .
            <span>
                R<span>epository</span>
            </span>
            .
            <span>
                L<span>ife</span>
            </span>
            .
            <span>
                D<span>ream</span>
            </span>
        </Ctn>
    );
};
