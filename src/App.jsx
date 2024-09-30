import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LocaleController from "./components/LocaleController";
import { Page, Pages } from "./containers/PageManager";
import styled from "styled-components";
import GenshinLoader from "./components/GenshinLoader";
import { wait } from "./utils/system";
import pages from "./assets/configs/pages";

const AppContainer = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    min-height: 100vh;
    position: absolute;
`;

function App() {
    const pageManager = useRef();
    const [currentPage, _currentPage] = useState();

    const [preLoadCompleted, _preLoadCompleted] = useState(false);
    const [preLoadProgress, _preLoadProgress] = useState(0);
    const [preLoadAnimationProgress, _preLoadAnimationProgress] = useState(0);

    const onPageScroll = () => {
        if (currentPage < 1) {
            pageManager.current.scrollTo(currentPage + 1);
        } else {
            pageManager.current.scrollTo(0);
        }
    };

    const renderPage = (p) => {
        switch (p.key) {
            case "cover":
                return <div>cover</div>;
            case "footer":
                return <div>footer</div>;
            default:
                return <div>page</div>;
        }
    };

    const preLoad = async () => {
        await wait(3000);
        _preLoadProgress(0.5);
        await wait(1000);
        _preLoadProgress(1);
    };

    const setAnimationProgress = async (p) => {
        _preLoadAnimationProgress(p * 65);
        if (p >= 1) {
            await wait(1500);
            _preLoadAnimationProgress(70);
            await wait(1500);
            _preLoadCompleted(true);
        }
    };

    useEffect(() => {
        preLoad();
    }, []);

    useEffect(() => {
        setAnimationProgress(preLoadProgress);
    }, [preLoadProgress]);

    return (
        <>
            <GenshinLoader progress={preLoadAnimationProgress} completed={preLoadCompleted} />
            <AppContainer>
                <Pages ref={pageManager} steps={pages} onChange={_currentPage}>
                    {pages.map((p, i) => (
                        <Page key={i}>{renderPage(p)}</Page>
                    ))}
                </Pages>
            </AppContainer>
            <LocaleController />
        </>
    );
}

export default App;
