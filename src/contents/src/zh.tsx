import { ContentBlockType, GalleryStyle } from "../../enums/ContentBlockType";
import { Page } from "../../enums/locale";
import Lucide from "../../icons/Lucide";
import { IAppContent } from "../../interfaces/config";

const data: IAppContent = {
    title: "Hongchen Lin",
    Cover: {},
    Footer: {},
    Catalog: [
        {
            key: Page.about,
            title: "关于自己",
            icon: <Lucide.BookOpen size={16} />,
        },
        {
            key: Page.skill,
            title: "人有所长",
            icon: <Lucide.User2 size={16} />,
        },
        {
            key: Page.history,
            title: "过往风霜",
            icon: <Lucide.User2 size={16} />,
        },
        {
            key: Page.work,
            title: "匠心之作",
            icon: <Lucide.User2 size={16} />,
        },
        {
            key: Page.dream,
            title: "诗与远方",
            icon: <Lucide.User2 size={16} />,
        },
    ],
    Pages: {
        [Page.about]: {
            type: ContentBlockType.Wiki,
            image: {
                src: "https://heroui.com/images/fruit-1.jpeg",
                alt: "This Man is too shy to show himself.",
            },
            content: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbbbbbb", "ccccccccccccccccccccc"],
        },
        [Page.skill]: {
            type: ContentBlockType.Gallery,
            style: GalleryStyle.Masonry,
            items: [
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
            ],
        },
        [Page.history]: {
            type: ContentBlockType.Wiki,
            content: [],
        },
        [Page.work]: {
            type: ContentBlockType.Gallery,
            style: GalleryStyle.List,
            items: [
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
            ],
        },
        [Page.dream]: {
            type: ContentBlockType.Gallery,
            style: GalleryStyle.Masonry,
            items: [],
        },
    },
};

export default data;
