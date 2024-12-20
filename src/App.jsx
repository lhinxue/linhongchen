import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import pages from "./assets/configs/pages";
import Background from "./components/Background";
import Navigator from "./components/Navigator";
import Cover from "./pages/Cover";
import Footer from "./pages/Footer";
import Gallery from "./pages/Gallery";
import { wait } from "./utils/system";

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
    const [bgLoaded, _bgLoaded] = useState(false);
    const [videoScale, _videoScale] = useState(5);

    const scrollTo = () => {
        if (currentPage < 1) {
            pageManager.current.scrollTo(currentPage + 1);
        } else {
            pageManager.current.scrollTo(0);
        }
    };

    const renderPage = (p, scrollTo) => {
        switch (p.key) {
            case "cover":
                return <Cover scrollTo={scrollTo} />;
            case "footer":
                return <Footer />;
            default:
                return <Gallery page={p.key} />;
        }
    };

    const preLoad = async () => {
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
        if (bgLoaded) preLoad();
    }, [bgLoaded]);

    useEffect(() => {
        setAnimationProgress(preLoadProgress);
    }, [preLoadProgress]);

    useEffect(() => {
        _videoScale((1 - currentPage / (pages.length - 1)) * 4);
    }, [currentPage]);

    return (
        <>
            <main className="dark">
                <Navigator />
                <Background
                    input={{
                        landscape: {
                            src: "https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/f54aaca7603e2c81de7f59f2ba27ace5_1530189916137544025.mp4",
                            poster: "https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/f54aaca7603e2c81de7f59f2ba27ace5_1530189916137544025.mp4?x-oss-process=video/snapshot,t_1,f_jpg,m_fast",
                        },
                        portrait: {
                            src: "https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/8150ed7bf869ad11a7c68a8646a850cb_416164607738221361.mp4",
                            poster: "https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/8150ed7bf869ad11a7c68a8646a850cb_416164607738221361.mp4?x-oss-process=video/snapshot,t_1,f_jpg,m_fast",
                        },
                    }}
                />
            </main>
        </>
    );
}

export default App;
