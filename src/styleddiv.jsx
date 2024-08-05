import styled from "styled-components";

const Pinyinspan = ({ pinyin, children }) => {
    return (
        <span style={{ position: "relative" }}>
            <span
                style={{
                    position: "absolute",
                    top: ".1em",
                    left: 0,
                    width: "100%",
                    fontSize: ".2em",
                    fontWeight: "bold",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                {pinyin.split("").map((a, index) => (
                    <span key={index}>{a}</span>
                ))}
            </span>
            <span>{children}</span>
        </span>
    );
};

export { Pinyinspan };
