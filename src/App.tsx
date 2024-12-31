import { useDarkTheme } from "./base/DarkTheme";
import Navigator from "./base/Navigator";
import VideoBackground from "./base/VideoBackground";

import "./App.css";
import Lucide from "./icons/Lucide";

function App() {
    const { dark } = useDarkTheme();
    return (
        <main className={`${dark} `}>
            <Navigator
                title="Honkai: Star Rail"
                menu={[
                    { key: "story", title: "Stories", icon: <Lucide.BookOpen size={16} /> },
                    { key: "char", title: "Characters",icon: <Lucide.User2 size={16} />  },
                    { key: "anime", title: "Anime",icon: <Lucide.ListVideo size={16} />  },
                ]}
            />
            <VideoBackground
                src={{
                    landscape:
                        "https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/f54aaca7603e2c81de7f59f2ba27ace5_1530189916137544025.mp4",
                    portrait:
                        "https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/8150ed7bf869ad11a7c68a8646a850cb_416164607738221361.mp4",
                }}
                alt={{
                    landscape:
                        "https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/f54aaca7603e2c81de7f59f2ba27ace5_1530189916137544025.mp4?x-oss-process=video/snapshot,t_1,f_jpg,m_fast",
                    portrait:
                        "https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/8150ed7bf869ad11a7c68a8646a850cb_416164607738221361.mp4?x-oss-process=video/snapshot,t_1,f_jpg,m_fast",
                }}
            />
        </main>
    );
}

export default App;
