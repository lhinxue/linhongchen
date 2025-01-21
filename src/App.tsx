import { useDarkTheme } from "./base/DarkTheme";
import Gallery from "./base/Gallery";
import Navigator from "./base/Navigator";
import VideoBackground from "./base/VideoBackground";
import Wiki from "./base/Wiki";
import { GalleryStyle } from "./enums/ContentBlockType";
import Lucide from "./icons/Lucide";

import "./App.css";

function App() {
    const { dark } = useDarkTheme();
    return (
        <main className={`${dark} `}>
            <Navigator
                title="Honkai: Star Rail"
                menu={[
                    {
                        key: "story",
                        title: "Stories",
                        icon: <Lucide.BookOpen size={16} />,
                        content: (
                            <Wiki
                                image={{
                                    src: "https://heroui.com/images/fruit-1.jpeg",
                                    alt: "This Man is too shy to show himself.",
                                }}
                                content={[
                                    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                    "bbbbbbbbbbbbbbbbbbbbbbbbbbbb",
                                    "ccccccccccccccccccccc",
                                ]}
                            />
                        ),
                    },
                    {
                        key: "char",
                        title: "Characters",
                        icon: <Lucide.User2 size={16} />,
                        content: (
                            <Gallery
                                style={GalleryStyle.List}
                                items={[
                                    {
                                        image: {
                                            src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                            alt: "example",
                                        },
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        image: {
                                            src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                            alt: "example",
                                        },
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        image: {
                                            src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                            alt: "example",
                                        },
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        image: {
                                            src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                            alt: "example",
                                        },
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },{
                                        image: {
                                            src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                            alt: "example",
                                        },
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },{
                                        image: {
                                            src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                            alt: "example",
                                        },
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },{
                                        image: {
                                            src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                            alt: "example",
                                        },
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },{
                                        image: {
                                            src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                            alt: "example",
                                        },
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        image: {
                                            src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                            alt: "example",
                                        },
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        progress: 75,
                                        progressLabel: "熟练度",
                                        tags: ["艺术", "设计"],
                                    },
                                    {
                                        title: "Adobe Premiere Pro",
                                        content: [
                                            "一款专业的视频剪辑和后期制作工具，用于制作电影、广告、短视频等各类视频作品，能够实现高效的多轨剪辑与特效处理。",
                                            "<em>并不算什么大师，但长期进行视频剪辑的我，对于PR和类似的视频剪辑软件都有着一定的经验。</em>",
                                        ],
                                        tags: ["艺术", "设计"],
                                    },
                                ]}
                            />
                        ),
                    },
                    { key: "anime", title: "Anime", icon: <Lucide.ListVideo size={16} /> },
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
