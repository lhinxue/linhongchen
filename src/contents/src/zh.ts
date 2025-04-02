import { Content } from "..";
import Icons from "../../components/Icons";

const zh: Content = {
    name: "Hongchen Lin",
    epithet: "Wake up, then move forward",
    license: "2023 by Hongchen Lin",
    links: { linkedin: "", github: "", youtube: "", x: "", facebook: "" },
    tagline: [
        { _1: "Like Fireflies to a Flame", _1p: "飞萤扑火", _2: "Life Begets Death", _2p: "向死而生" },
        {
            _1: "why does life slumber",
            _1p: "生命因何而沉睡",
            _2: "Because someday, we will all wake from our dreams",
            _2p: "因为总有一天，我们都会从梦中醒来",
        },
    ],
    coverBtn: "discover more",
    aboutH1: "about",
    aboutH2: ["INFP-T", "That's the Kind of Boy I Am"],
    aboutP: `The Personality Test defines me as a <em>Mediator</em>, but I prefer to define myself as a <em>Poet</em>.`,
    aboutList: [
        {
            icon: Icons.CalendarHeart,
            title: "introverted",
            notes: "Asking me to make a speech in front of a bunch of real person will be a good way to murder me.",
        },
        {
            icon: Icons.MaskSad,
            title: "empathetic?",
            notes: "You may see me crying when watching movies or even listening to music. But I may be also cold-heart facing some very worth empathy things. <br /> Which side is the real me? I don't know the answer neighter.",
        },
        {
            icon: Icons.PenNibStraight,
            title: "creative",
            notes: "I was planning to be a musician, illustrator, a writer. But sadly, I am not the kind of person who's rich enough to chase their dream.",
        },
    ],
    expH1: "experience",
    expH2: ["education background", "work experience"],
    expList: [
        {
            name: "Westlake Boys High school",
            tag: "Education background",
            timestamp: "2022-Now",
            notes: `I was studying music and designing on high school. But now I am writting codes - melody of data, if
                        being Romantic.
                        <br />
                        And I always belive the reason I don't have a girlfriend untill now is because I was being sent to
                        Boys High School. (Note: I am not a gay.)`,
        },
        {
            name: "University of Auckland",
            tag: "Education background",
            timestamp: "2022-Now",
            notes: `Im not one of the best student, but I don't think I am bad. In school, there's 4 kind of student:
                        who never ask for help and just knows everything; who usually being asked for help but also need to
                        ask for help sometimes; who asked for help; and anonymas. I am the second group of people :)`,
        },
        {
            name: "Fields Cafe",
            tag: "work experience",
            timestamp: "2022-Now",
            notes: `My part-time job when I was in Uni. I almost do everything in the kitchen, except cooking. Although
                        I didn't lean too much of prof skills there, it is still a very valuable expericen. I get to learn
                        what is actually working and starting to pay my own bill :)`,
        },
        {
            name: "StayinFront Ltd",
            tag: "work experience",
            timestamp: "2022-Now",
            notes: `My first job, gained by my very first interview. Well it again proves I am one of the top.
                        <br />
                        In SIF I am one of the PSG which is converting Customer's requirements into actual program needs. I
                        did alot of things, including webpage, database, desktop, etc...`,
        },
    ],
    abilityH1: "abilities",
    abilityH2: ["Areas of Expertise", "contributed Projects"],
    abilityList1: [
        { name: "React" },
        { name: "OfficeJs" },
        { name: "Python" },
        { name: "C#" },
        { name: "VB(.NET)" },
        { name: "HTML" },
        { name: "CSS" },
        { name: "Javascript" },
        { name: "Typescript" },
        { name: "Adobe Photoshop" },
        { name: "Adobe Premiuem Pro" },
    ],
    abilityList2: [
        {
            name: "Outlook Integration",
            tags: ["React", "OfficeJs", "HTML", "CSS", "Javascript"],
            timestamp: "2022-Now",
            notes: `My first job, gained by my very first interview. Well it again proves I am one of the top.
                  <br />
                  In SIF I am one of the PSG which is converting Customer's requirements into actual program needs. I
                  did a lot of things, including webpage, database, desktop, etc...`,
        },
        {
            name: "Turandot",
            tags: ["Python"],
            timestamp: "2021 - 2024",
            notes: `Turandot is a pure Python application that allows you to create and open encrypted files. <br />
                  The encryption method employed involves XOR-ing the file content with an input password. The
                  password can consist of any characters, not limited to just letters and numbers. The longer the
                  password, the more robust the encryption becomes. Github`,
        },
        {
            name: "Display Manager",
            tags: ["C#"],
            timestamp: "2021 - 2024",
            notes: `Display Manager is an application built using C#. It demonstrates advanced UI/UX and system integration techniques. Github`,
        },
    ],
    footerBtn1: "Download CV",
};

export default zh;
