import pageType from "../configs/pageType";

export default {
    cover: {
        title: "封面",
        greeting: "Hi, I'm",
        identity: "a Traiblazer",
        intro: ["24岁单身人士。生理性别男，心理性别男。喜欢吃饭睡觉玩游戏。没有梦想。"],
        quote: ["就算结局早已注定，那也无妨，人改变不了的事太多。但在此之前，在走向结局的路上，我们能做的事同样很多。",
            "而结局……也会因此展现截然不同的意义"
        ],
        knowMore: "了解更多"
    },
    pages: {
        p1: {
            key: "p1",
            title: "关于自己",
            subtitle: "我是什么东西",
            content: [
                {
                    type: pageType.ImageWiki,
                    img: {
                        src: "",
                        alt: "这个人因为害羞而不愿意展示自己。",
                    },
                    text: [
                        "一个生活在地球上的人类。",
                        "21世纪初，我出生在中国大陆。十五岁时，我离开了中国，前往新西兰留学。在中国、新西兰来回的途中，我见识到了仅仅待在西方世界或者仅仅待在东方世界的人所没有的感悟。",
                        "或许在这个环节，其他人总会赞誉自己，自称自己有多么的博学多识，负责任……但我并不一样。",
                        "和大多数平凡的人一样，我的爱好是吃喝玩乐，因为现实世界苦痛；我没有拼搏精神，因为我知晓没有高人一等的能力，注定不会做出成绩；我不会主动加班，因为我奉行平等交易。",
                        "优点的话……不抽烟，不喝酒，不吸毒，不曾犯罪。这应该算优点吧？",
                    ],
                },
            ],
        },
        p2: {
            key: "p2",
            title: "技能库",
            subtitle: "<strike>知识</strike>钱不是万能的；没有<strike>知识</strike>钱是万万不能的。",
            content: [
                {
                    type: pageType.CardLibrary,
                    cards: [
                        {
                            img: {
                                src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                alt: "example",
                            },
                            title: "Card title",
                            description: "This is the description",
                            progress: 50,
                            tags: ["梦想", "已放弃"],
                        },
                        {
                            img: {
                                src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                alt: "example",
                            },
                            title: "Card title",
                            description: "This is the description",
                        },
                        {
                            img: {
                                src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                alt: "example",
                            },
                            title: "Card title",
                            description: "This is the description",
                            progress: 10,
                        },
                        {
                            img: {
                                src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                                alt: "example",
                            },
                            title: "Card title",
                            description: "This is the description",
                            progress: 90,
                        },
                    ],
                },
            ],
        },
        p3: {
            key: "p3",
            title: "时间线",
            subtitle: "今天是昨天的明天",
            content: [
                {
                    type: pageType.Timeline,
                    events: [
                        {
                            timestamp: "二〇〇〇年，十一月",
                            title: "诞生",
                            content: ["一个男童在中国南方的某个医院出生了。"],
                        },
                        {
                            timestamp: "二〇一五年，八月",
                            title: "出国留学",
                            content: [
                                "在中国，对于普通家庭而言，中考是很重要的。这是人一辈子竟有一次的考试。输了，抱憾终生；赢了，避免抱憾终生。",
                                "在他父亲朋友的煽动下，他的父亲带着他离开了他的故乡，远赴重洋，留学读书。",
                                "这个决定是对是错？他至今无法给出答案。",
                            ],
                        },
                        {
                            timestamp: "二〇一八年，七月七日",
                            title: "父亲辞世",
                            content: [
                                "他的父亲离开了他。他甚至没来得及见他最后一面。",
                                "他只记得他在亲戚的逼迫下抱着父亲的遗照游街示众，仿佛公开处刑——他只想安安静静地坐在无人的角落，沉默。",
                                "“有的人活着，但他已经死了；有的人死了，但他依然活着。”只要记忆尚存，他的父亲就会一直陪伴着他。",
                            ],
                        },
                    ],
                },
            ],
        },
        p4: {
            key: "p4",
            title: "杰出之作",
            subtitle: "作品胜于雄辩",
            content: [
                {
                    type: pageType.BlockList,
                    list: [
                        {
                            title: "Outlook 插件",
                            tags: ["OfficeJS", "Microsoft Office", "Microsoft Graph"],
                            progress: {
                                label: "项目贡献",
                                percent: 90,
                            },
                            content: [
                                "一款基本由我独立完成的Outlook插件。其使用了基础的OfficeJS技术，同时使用了微软的Graph API以达成了“实时发送，并保存邮件”的能力。",
                            ],
                        },
                        {
                            title: "DisplayManager 显示管理",
                            tags: ["C#"],
                            progress: {
                                label: "项目贡献",
                                percent: 100,
                            },
                            content: ["A Windows Taskbar Icon that controls screen display / resolution."],
                        },
                    ],
                },
            ],
        },
        p5: {
            key: "p5",
            title: "心之所向", //Ambitions
            subtitle: "我也曾幻想成为万众瞩目的英雄",
            content: [
                {
                    type: pageType.CardLibrary,
                    itemWidth: 300,
                    cards: [
                        {
                            title: "钢琴家",
                            description:
                                "<p>我小的时候曾被父母送去学钢琴。要说我爱死了弹钢琴那是绝对不可能的，但若是说讨厌钢琴，那不如说我是讨厌枯燥的练习生涯。</p><p>我曾去参观音乐会，看着那些钢琴天才在舞台上手指飞舞，敲打黑白键，美妙的乐声传出，余音绕梁，令人赞叹。</p><p> 可惜啊，时过境迁，我终究是选择更加现实更容易找到工作的专业。</p>",
                            tags: ["梦想", "已放弃"],
                        },
                        {
                            title: "钢琴家",
                            description:
                                "<p>我也曾学习画画。我喜欢那种将眼中所见，心中所想的事情画出来的感觉——或者说，有些自己的奇思妙想，用语言难以描述，但是用画就可以。</p><p> 可惜啊，大多数时候我学习都是为了考试而生的素描，来来去去就是画盘子画水果，甚至人像都画的很少，让我怀疑是不是被那兴趣班骗了钱了。</p>",
                            tags: ["梦想", "已放弃"],
                        },
                        {
                            title: "Card title",
                            description: "This is the description",
                        },

                        // {
                        //     img: {
                        //         src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                        //         alt: "example",
                        //     },
                        //     title: "Card title",
                        //     description: "This is the description",
                        //     progress: 10,
                        // },
                        // {
                        //     img: {
                        //         src: "https://starrail.honeyhunterworld.com/img/eidolon/raindrop-key-eidolon_icon.webp",
                        //         alt: "example",
                        //     },
                        //     title: "Card title",
                        //     description: "This is the description",
                        //     progress: 90,
                        // },
                    ],
                },
            ],
        },
    },
    footer: {
        title: "结语",
        question: "……生命因何而沉睡？",
        answers: ["因为我们害怕从「梦」中醒来？", "因为睡眠是死亡的预演，我们尚未准备好迎接死亡？"],
        answer: ["因为总有一天，", "我们会从梦中醒来"],
        comment: "远离故土的笼中鸟",
        address: "地球，太阳系，猎户臂，银河系，本地群，室女超星团，可观测宇宙"
    },
};
