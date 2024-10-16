export default {
    cover: {
        title: "封面",
    },
    pages: {
        p1: {
            key: "p1",
            title: "关于自己",
            subtitle: "我是什么东西",
            content: [
                {
                    type: "imageWiki",
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
                    type: "cardLibrary",
                    cards: [
                        {
                            img: {
                                src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                                alt: "example",
                            },
                            title: "Card title",
                            description: "This is the description",
                            progress: 50,
                        },
                        {
                            img: {
                                src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                                alt: "example",
                            },
                            title: "Card title",
                            description: "This is the description",
                        },
                        {
                            img: {
                                src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                                alt: "example",
                            },
                            title: "Card title",
                            description: "This is the description",
                            progress: 10,
                        },
                        {
                            img: {
                                src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
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
                    type: "timeline",
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
                    type: "cardList",
                    list: [
                        {
                            title: "Outlook 插件",
                            tags: ["OfficeJS", "Microsoft Office", "Microsoft Graph"],
                            progress: {
                                label: "项目贡献",
                                percent: 95,
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
            title: "兴趣爱好",
            subtitle: "作品胜于雄辩",
            content: [],
        },
    },
    footer: {
        title: "结语",
    },
};
