// src/components/BlurBackground.js
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BackgroundWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
`;

const BackgroundImage = styled.div`
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
    filter: blur(${(props) => props.level}px);
`;

const BlackOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, ${(props) => props.blackLevel});
`;

const BlurBackground = ({ src, level, blackLevel, children }) => {
    return (
        <BackgroundWrapper>
            {src&&<BackgroundImage src={src} level={level} />}
            {children}
            <BlackOverlay blackLevel={blackLevel} />
        </BackgroundWrapper>
    );
};

BlurBackground.propTypes = {
    src: PropTypes.string.isRequired,
    level: PropTypes.number,
    blackLevel: PropTypes.number,
};

BlurBackground.defaultProps = {
    level: 10,
    blackLevel: 0.8,
};

export default BlurBackground;
