/* eslint-disable react/jsx-key */
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Image,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectItem,
    Slider,
} from "@nextui-org/react";
import * as Icons from "@phosphor-icons/react";
import { AnimatePresence, animate, motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { createRef, useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import BlurredBackground from "./components/BlurredBackground";
import GrayscaleWrapper from "./components/GrayscaleWrapper";
import useImageTheme from "./hooks/useImageTheme";
import usePortraitScreen from "./hooks/usePortraitScreen";
import SquareImagePuzzle from "./components/SquareImagePuzzle";
import Elements from "./assets/svg/Elements";
import Bg from "./Bg";
import GenshinLoader from "./GenshinLoader";
import VisibilityControl from "./VisibilityControl";
import OpController from "./OpController";
import AudioPlayer from "./AudioPlayer";
import { Pinyinspan } from "./styleddiv";
import { useCustomWidth } from "./useFitSize";
import { useLang } from "./Context";
import T from "./T";
import "./assets/font/font.css";
import { Page, WORLD } from "./StyledComponent";
import AppContainer from "./AppContainer";
import Page2 from "./Page2";

const bounce = keyframes`
0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  0.4175%, 0.8325% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }
  1.25%, 2.0825%, 2.9175%, 3.75%, 4.5825% {
    -webkit-transform: scale3d(1.15, 1.15, 1.15) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.15, 1.15, 1.15) rotate3d(0, 0, 1, 3deg);
  }
  1.6675%, 2.5%, 3.3325%, 4.1675% {
    -webkit-transform: scale3d(1.15, 1.15, 1.15) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.15, 1.15, 1.15) rotate3d(0, 0, 1, -3deg);
  }
  7.5% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-transform: none;
    transform: none;
  }
  50.625% {
    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }
  51.25% {
    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }
  51.875% {
    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }
  52.5% {
    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }
  53.125% {
    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }
  54.1675% {
    -webkit-transform: none;
    transform: none;
  }
`;

const OnHoverAppear = styled.div`
    opacity: 0.1;
    &:hover {
        opacity: 1;
    }
`;

const BouncingSpan = styled.span`
    cursor: pointer;
    display: inline-block;
    animation: ${bounce} 20s infinite 5s;
`;

const imageList = ["./Firefly.jpg", "./March7th.jpg"];
function hexToHSL(hex) {
    // Convert hex to RGB first
    try {
        let r = 0,
            g = 0,
            b = 0;
        if (hex.length == 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length == 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r) h = ((g - b) / delta) % 6;
        else if (cmax == g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
        l = (cmax + cmin) / 2;
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(2);
        l = +(l * 100).toFixed(2);
        return [h, s + "%", l + "%"];
    } catch (error) {
        return [];
    }
}
const HideAfter = styled.span`
    &:after {
        display: none;
    }
`;
const RootStyle = createGlobalStyle`
#root {
    background-color: #333;
}

#app {
    position: fixed;
    height: 100vh;
    width: 100vw;
}
`;
function App() {
    const [grayscale, setGrayscale] = useState(1);
    const [bgProgress, setBgProgress] = useState(5);
    const ref = createRef();
    const [themeColor, imageSrc, nextImage, previousImage] = useImageTheme(imageList);
    const { width, height } = usePortraitScreen();
    const { custWidth } = useCustomWidth();
    const calcCustWidth = (scale = 1) => {
        return (window.innerWidth / 9 > 50 ? 50 : window.innerWidth / 9) * scale;
    };
    const { scrollYProgress } = useScroll();
    scrollYProgress.on("change", (latest) => {
        const clampedProgress = Math.min(Math.max(latest, 0), 0.1);

        // Calculate the new bgProgress
        const newBgProgress = 5 - ((clampedProgress - 0) / 0.1) * (5 - 0);

        // Update the state
        setBgProgress(newBgProgress);
    });

    const start = 0.02;
    const end = 0.1;

    // Define transformations for each element

    useEffect(() => {
        // setImageSrc(imageList[0]);
    }, []);
    const controls = useAnimation();

    const startAnimation = () => {
        controls.start({
            color: "#fff",
            transition: { duration: 0.5, easings: ["easeIn", "easeOut"] },
        });
    };
    const [v, _v] = useState(0);

    const [taskCompletingProgress, setTaskCompletingProgress] = useState(0);

    const [locale, setLocale, locales] = useLang();

    const [preLoadTaskCompleted, setPreLoadTaskCompleted] = useState(false);
    const [bgLoadCompleted, setBgLoadCompleted] = useState(false);

    useEffect(() => {
        const taskList = [bgLoadCompleted];
        const totalItems = taskList.length;
        const trueCount = taskList.filter((value) => value === true).length;
        const completionPercentage = trueCount / totalItems;

        _v(completionPercentage * 65);
        if (completionPercentage >= 1) {
            setTimeout(() => {
                _v(70);
                setPreLoadTaskCompleted(true);
            }, 1500);
        }
    }, [bgLoadCompleted]);

    const [elementLoaderVisible, setELV] = useState(true);
    const [showBg, setsbg] = useState(false);

    useEffect(() => {
        if (preLoadTaskCompleted) {
            setTimeout(() => {
                setELV(false);
                setsbg(true);
            }, 1000);
        }
    }, [preLoadTaskCompleted]);

    const adplayer = useRef(null);

    const Page1 = () => (
        <motion.div
            className="flex justify-evenly items-center flex-col"
            style={{
                // width: width,
                // height: height,
                "--nextui-primary": hexToHSL(themeColor).join(" "),
                // opacity: page1Opacity,
                transition: "opacity 1s ease-in-out",
            }}
        >
            <div className="flex flex-row items-center">
                {/* <AnimatedRectangles value={v} reverse /> */}
                <div
                    style={{
                        fontFamily: "DINO, Genshin, emoji",
                        // fontWeight: 400,
                        maxWidth: "80vw",
                        display: "flex",
                        flexDirection: "column",
                        gap: "3em",
                        color: "white",
                        textShadow: "0px 0px 3px #000",
                        // lineHeight: "1em",
                        // textAlign: "center",
                        // letterSpacing: "-.05em",
                        // fontVariantCaps: "small-caps",
                    }}
                >
                    <span>
                        <p
                            style={{
                                fontSize: `${calcCustWidth() * 0.7}px`,
                                // marginBottom: "-.5em",
                            }}
                        >
                            <T
                                c={{
                                    jp: "こんにちは、私は",
                                    zh: "你好，我是",
                                    en: "Hello, I am",
                                }}
                            />
                        </p>
                        <p
                            style={{
                                display: "flex",
                                flexDirection: "wrap",
                                flexWrap: "wrap",
                                // gap: "2rem",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: `${calcCustWidth()}px`,
                                    marginRight: ".3em",
                                }}
                            >
                                <T
                                    c={{
                                        jp: (
                                            <>
                                                <Pinyinspan pinyin={"リン"}>林</Pinyinspan>
                                                <Pinyinspan pinyin={"ホン"}>洪</Pinyinspan>
                                                <Pinyinspan pinyin={"チェン"}>琛</Pinyinspan>、
                                            </>
                                        ),
                                        zh: "林洪琛，",
                                        en: "Hongchen Lin,",
                                    }}
                                />
                            </span>
                            <span
                                style={{
                                    fontSize: `${calcCustWidth()}px`,
                                    display: "flex",
                                    alignItems: "center",
                                    // justifyContent: "space-between",
                                    // gap: "1rem",
                                    // marginLeft: ".3em",
                                }}
                            >
                                <span style={{}}>
                                    <span>
                                        <T c={{ zh: "一位", en: "a ", jp: "" }} />
                                    </span>
                                    {T({ zh: " ", jp: " ", en: "" })}
                                    <Pinyinspan
                                        pinyin={T({
                                            jp: "仮面の愚者",
                                            zh: "假面愚者",
                                            en: "Masked   Fools",
                                        })}
                                    >
                                        {T({ jp: "開拓者", zh: "开拓者", en: "Trailblazer" })}
                                    </Pinyinspan>
                                    {T({ zh: "。", jp: " です。", en: "." })}
                                </span>
                            </span>
                        </p>
                    </span>

                    <div
                        className="flex flex-col gap-2"
                        style={{
                            fontFamily: "StarRail-EN, SourceHanSansSC, StarRail-ZH",
                            fontSize: `${calcCustWidth() * 0.3}px`,
                        }}
                    >
                        {T({
                            jp: (
                                <>
                                    <p>
                                        すでに結末が決まっていたとしても、構うことはない。人には変えられないことがたくさんある……
                                    </p>
                                    <p>だが、その前に…結末に向かうまでにできることも、たくさんあるんだ。</p>
                                    <p>そして「結末」は…それによってまったく異なる意味合いを見せる。</p>
                                </>
                            ),
                            zh: (
                                <>
                                    <p>就算结局早已注定，那也无妨，人改变不了的事太多。</p>
                                    <p>但在此之前，在走向结局的路上，我们能做的事同样很多。</p>
                                    <p>而结局……也会因此展现截然不同的意义。</p>
                                </>
                            ),
                            en: (
                                <>
                                    <p>
                                        Even if the ending has been predetermined, that's fine. There are countless
                                        things that humans cannot change.
                                    </p>
                                    <p>
                                        But before that, on the road towards the end, there are still many things that
                                        we can do.
                                    </p>
                                    <p>
                                        And because of this, the "end" will thus reveal a completely different meaning.
                                    </p>
                                </>
                            ),
                        })}
                    </div>
                    <div style={{ width: "fit-content" }}>
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                                padding: "0 10px 3px 5px",
                            }}
                        >
                            <BouncingSpan>
                                <span
                                    style={{
                                        fontSize: `${calcCustWidth() * 0.8}px`,
                                    }}
                                >
                                    <Icons.HandTap />
                                </span>
                            </BouncingSpan>
                            <span
                                style={{
                                    fontSize: `${calcCustWidth() * 0.8}px`,
                                }}
                            >
                                {/* Welcome to My World */}
                            </span>
                        </span>

                        {/* <div
                style={{
                    background: "white",
                    height: (custWidth) * 0.025,
                    borderRadius: "1em",
                    width: "100%",
                }}
            ></div> */}
                    </div>

                    {/* <Button
            radius="full"
            // size="lg"
            variant="solid"
            // style={{
            //     // color: "white",
            //     width: `${window.innerWidth / 6 > 100 ? 100 : window.innerWidth / 6}px`,
            //     height: `${window.innerWidth / 6 > 100 ? 100 : window.innerWidth / 6}px`,
            // }}
            isIconOnly
            onClick={() => {
                adplayer.current.play();
            }}
            // size={window.innerWidth / 8 > 80 ? 80 : window.innerWidth / 8}
        >
            <span></span>
            <Icons.MagnifyingGlass />
        </Button> */}
                    {/* <p>生命因何而沉睡？</p> */}

                    {/* <p >WELCOME</p>
    <p>TO MY</p>
    <p>W·O·R·L·D</p> */}
                </div>

                {/* <AnimatedRectangles value={v} /> */}
            </div>
        </motion.div>
    );

    const Page3 = ({ sp }) => {
        const { scrollYProgress } = useScroll();
        const [enableScroll, set] = useState(false);
        scrollYProgress.on("change", (latest) => {
            if (latest < sp[2] && latest > sp[1]) set(true);
            else set(false);
        });

        return (
            <motion.div
                className="absolute flex justify-evenly items-center flex-col h-screen"
                style={{
                    "--nextui-primary": hexToHSL(themeColor).join(" "),
                    transition: "opacity 1s ease-in-out",
                    overflow: enableScroll ? "scroll" : "hidden",
                }}
            >
                <div className="flex flex-row items-center">
                    <div
                        style={{
                            fontFamily: "DINO, Genshin, emoji",
                            maxWidth: "80vw",
                            display: "flex",
                            flexDirection: "column",
                            gap: "3em",
                            color: "white",
                            textShadow: "0px 0px 3px #000",
                        }}
                    >
                        <span>
                            "Shakespeare" redirects here. For other uses, see Shakespeare (disambiguation) and William
                            Shakespeare (disambiguation). William Shakespeare The Chandos portrait, likely depicting
                            Shakespeare, c. 1611 Born c. 23 April 1564[1] Stratford-upon-Avon, Warwickshire, England
                            Died 23 April 1616 (aged 52) Stratford-upon-Avon, Warwickshire, England Resting place Church
                            of the Holy Trinity, Stratford-upon-Avon Occupations Playwrightpoetactor Years active
                            c. 1585–1613 Era Elizabethan Jacobean Organization Lord Chamberlain's Men/King's Men Notable
                            work Shakespeare bibliography Movement English Renaissance Spouse Anne Hathaway ​(m. 1582)​
                            Children Susanna Hall Hamnet Shakespeare Judith Quiney Parents John Shakespeare (father)
                            Mary Arden (mother) Writing career Language Early Modern English Genres Play
                            (comedyhistorytragedy) Poetry (sonnetnarrative poemepitaph) Signature William Shakespeare
                            (c. 23[a] April 1564 – 23 April 1616)[b] was an English playwright, poet and actor. He is
                            widely regarded as the greatest writer in the English language and the world's pre-eminent
                            dramatist.[4][5][6] He is often called England's national poet and the "Bard of Avon" (or
                            simply "the Bard"). His extant works, including collaborations, consist of some 39 plays,
                            154 sonnets, three long narrative poems and a few other verses, some of uncertain
                            authorship. His plays have been translated into every major living language and are
                            performed more often than those of any other playwright.[7] Shakespeare remains arguably the
                            most influential writer in the English language, and his works continue to be studied and
                            reinterpreted. Shakespeare was born and raised in Stratford-upon-Avon, Warwickshire. At the
                            age of 18, he married Anne Hathaway, with whom he had three children: Susanna, and twins
                            Hamnet and Judith. Sometime between 1585 and 1592, he began a successful career in London as
                            an actor, writer, and part-owner ("sharer") of a playing company called the Lord
                            Chamberlain's Men, later known as the King's Men after the ascension of King James VI of
                            Scotland to the English throne. At age 49 (around 1613), he appears to have retired to
                            Stratford, where he died three years later. Few records of Shakespeare's private life
                            survive; this has stimulated considerable speculation about such matters as his physical
                            appearance, his sexuality, his religious beliefs and even certain fringe theories[8] as to
                            whether the works attributed to him were written by others.[9][10][11] Shakespeare produced
                            most of his known works between 1589 and 1613.[12][13] His early plays were primarily
                            comedies and histories and are regarded as some of the best works produced in these genres.
                            He then wrote mainly tragedies until 1608, among them Hamlet, Othello, King Lear and
                            Macbeth, all considered to be among the finest works in English.[4][5][6] In the last phase
                            of his life, he wrote tragicomedies (also known as romances) such as The Winter's Tale and
                            The Tempest, and collaborated with other playwrights. Many of Shakespeare's plays were
                            published in editions of varying quality and accuracy during his lifetime. However, in 1623,
                            John Heminges and Henry Condell, two fellow actors and friends of Shakespeare's, published a
                            more definitive text known as the First Folio, a posthumous collected edition of
                            Shakespeare's dramatic works that includes 36 of his plays. Its Preface was a prescient poem
                            by Ben Jonson, a former rival of Shakespeare, who hailed Shakespeare with the now famous
                            epithet: "not of an age, but for all time".[14] Life Main article: Life of William
                            Shakespeare Early life John Shakespeare's house, believed to be Shakespeare's birthplace, in
                            Stratford-upon-Avon Shakespeare was the son of John Shakespeare, an alderman and a
                            successful glover (glove-maker) originally from Snitterfield in Warwickshire, and Mary
                            Arden, the daughter of an affluent landowning family.[15] He was born in
                            Stratford-upon-Avon, where he was baptised on 26 April 1564. His date of birth is unknown,
                            but is traditionally observed on 23 April, Saint George's Day.[2] This date, which can be
                            traced to William Oldys and George Steevens, has proved appealing to biographers because
                            Shakespeare died on the same date in 1616.[16][17] He was the third of eight children, and
                            the eldest surviving son.[18] Although no attendance records for the period survive, most
                            biographers agree that Shakespeare was probably educated at the King's New School in
                            Stratford,[19][20][21] a free school chartered in 1553,[22] about a quarter-mile (400 m)
                            from his home. Grammar schools varied in quality during the Elizabethan era, but grammar
                            school curricula were largely similar: the basic Latin text was standardised by royal
                            decree,[23][24] and the school would have provided an intensive education in grammar based
                            upon Latin classical authors.[25] At the age of 18, Shakespeare married 26-year-old Anne
                            Hathaway. The consistory court of the Diocese of Worcester issued a marriage licence on 27
                            November 1582. The next day, two of Hathaway's neighbours posted bonds guaranteeing that no
                            lawful claims impeded the marriage.[26] The ceremony may have been arranged in some haste
                            since the Worcester chancellor allowed the marriage banns to be read once instead of the
                            usual three times,[27][28] and six months after the marriage Anne gave birth to a daughter,
                            Susanna, baptised 26 May 1583.[29] Twins, son Hamnet and daughter Judith, followed almost
                            two years later and were baptised 2 February 1585.[30] Hamnet died of unknown causes at the
                            age of 11 and was buried 11 August 1596.[31] Shakespeare's coat of arms, from the 1602 book
                            The book of coates and creasts. Promptuarium armorum. It features spears as a pun on the
                            family name.[c] After the birth of the twins, Shakespeare left few historical traces until
                            he is mentioned as part of the London theatre scene in 1592. The exception is the appearance
                            of his name in the "complaints bill" of a law case before the Queen's Bench court at
                            Westminster dated Michaelmas Term 1588 and 9 October 1589.[32] Scholars refer to the years
                            between 1585 and 1592 as Shakespeare's "lost years".[33] Biographers attempting to account
                            for this period have reported many apocryphal stories. Nicholas Rowe, Shakespeare's first
                            biographer, recounted a Stratford legend that Shakespeare fled the town for London to escape
                            prosecution for deer poaching in the estate of local squire Thomas Lucy. Shakespeare is also
                            supposed to have taken his revenge on Lucy by writing a scurrilous ballad about him.[34][35]
                            Another 18th-century story has Shakespeare starting his theatrical career minding the horses
                            of theatre patrons in London.[36] John Aubrey reported that Shakespeare had been a country
                            schoolmaster.[37] Some 20th-century scholars suggested that Shakespeare may have been
                            employed as a schoolmaster by Alexander Hoghton of Lancashire, a Catholic landowner who
                            named a certain "William Shakeshafte" in his will.[38][39] Little evidence substantiates
                            such stories other than hearsay collected after his death, and Shakeshafte was a common name
                            in the Lancashire area.[40][41] London and theatrical career It is not known definitively
                            when Shakespeare began writing, but contemporary allusions and records of performances show
                            that several of his plays were on the London stage by 1592.[42] By then, he was sufficiently
                            known in London to be attacked in print by the playwright Robert Greene in his Groats-Worth
                            of Wit from that year: ... there is an upstart Crow, beautified with our feathers, that with
                            his Tiger's heart wrapped in a Player's hide, supposes he is as well able to bombast out a
                            blank verse as the best of you: and being an absolute Johannes factotum, is in his own
                            conceit the only Shake-scene in a country.[43] Scholars differ on the exact meaning of
                            Greene's words,[43][44] but most agree that Greene was accusing Shakespeare of reaching
                            above his rank in trying to match such university-educated writers as Christopher Marlowe,
                            Thomas Nashe, and Greene himself (the so-called "University Wits").[45] The italicised
                            phrase parodying the line "Oh, tiger's heart wrapped in a woman's hide" from Shakespeare's
                            Henry VI, Part 3, along with the pun "Shake-scene", clearly identify Shakespeare as Greene's
                            target. As used here, Johannes Factotum ("Jack of all trades") refers to a second-rate
                            tinkerer with the work of others, rather than the more common "universal genius".[43][46]
                            Greene's attack is the earliest surviving mention of Shakespeare's work in the theatre.
                            Biographers suggest that his career may have begun any time from the mid-1580s to just
                            before Greene's remarks.[47][48][49] After 1594, Shakespeare's plays were performed at The
                            Theatre, in Shoreditch, only by the Lord Chamberlain's Men, a company owned by a group of
                            players, including Shakespeare, that soon became the leading playing company in London.[50]
                            After the death of Queen Elizabeth in 1603, the company was awarded a royal patent by the
                            new King James I, and changed its name to the King's Men.[51] All the world's a stage, and
                            all the men and women merely players: they have their exits and their entrances; and one man
                            in his time plays many parts ... —As You Like It, Act II, Scene 7, 139–142[52] In 1599, a
                            partnership of members of the company built their own theatre on the south bank of the River
                            Thames, which they named the Globe. In 1608, the partnership also took over the Blackfriars
                            indoor theatre. Extant records of Shakespeare's property purchases and investments indicate
                            that his association with the company made him a wealthy man,[53] and in 1597, he bought the
                            second-largest house in Stratford, New Place, and in 1605, invested in a share of the parish
                            tithes in Stratford.[54] Some of Shakespeare's plays were published in quarto editions,
                            beginning in 1594, and by 1598, his name had become a selling point and began to appear on
                            the title pages.[55][56][57] Shakespeare continued to act in his own and other plays after
                            his success as a playwright. The 1616 edition of Ben Jonson's Works names him on the cast
                            lists for Every Man in His Humour (1598) and Sejanus His Fall (1603).[58] The absence of his
                            name from the 1605 cast list for Jonson's Volpone is taken by some scholars as a sign that
                            his acting career was nearing its end.[47] The First Folio of 1623, however, lists
                            Shakespeare as one of "the Principal Actors in all these Plays", some of which were first
                            staged after Volpone, although one cannot know for certain which roles he played.[59] In
                            1610, John Davies of Hereford wrote that "good Will" played "kingly" roles.[60] In 1709,
                            Rowe passed down a tradition that Shakespeare played the ghost of Hamlet's father.[61] Later
                            traditions maintain that he also played Adam in As You Like It, and the Chorus in Henry
                            V,[62][63] though scholars doubt the sources of that information.[64] Throughout his career,
                            Shakespeare divided his time between London and Stratford. In 1596, the year before he
                            bought New Place as his family home in Stratford, Shakespeare was living in the parish of St
                            Helen's, Bishopsgate, north of the River Thames.[65][66] He moved across the river to
                            Southwark by 1599, the same year his company constructed the Globe Theatre there.[65][67] By
                            1604, he had moved north of the river again, to an area north of St Paul's Cathedral with
                            many fine houses. There, he rented rooms from a French Huguenot named Christopher Mountjoy,
                            a maker of women's wigs and other headgear.[68][69] Later years and death Shakespeare's
                            funerary monument in Stratford-upon-Avon Nicholas Rowe was the first biographer to record
                            the tradition, repeated by Samuel Johnson, that Shakespeare retired to Stratford "some years
                            before his death".[70][71] He was still working as an actor in London in 1608; in an answer
                            to the sharers' petition in 1635, Cuthbert Burbage stated that after purchasing the lease of
                            the Blackfriars Theatre in 1608 from Henry Evans, the King's Men "placed men players" there,
                            "which were Heminges, Condell, Shakespeare, etc.".[72] However, it is perhaps relevant that
                            the bubonic plague raged in London throughout 1609.[73][74] The London public playhouses
                            were repeatedly closed during extended outbreaks of the plague (a total of over 60 months
                            closure between May 1603 and February 1610),[75] which meant there was often no acting work.
                            Retirement from all work was uncommon at that time.[76] Shakespeare continued to visit
                            London during the years 1611–1614.[70] In 1612, he was called as a witness in Bellott v
                            Mountjoy, a court case concerning the marriage settlement of Mountjoy's daughter,
                            Mary.[77][78] In March 1613, he bought a gatehouse in the former Blackfriars priory;[79] and
                            from November 1614, he was in London for several weeks with his son-in-law, John Hall.[80]
                            After 1610, Shakespeare wrote fewer plays, and none are attributed to him after 1613.[81]
                            His last three plays were collaborations, probably with John Fletcher,[82] who succeeded him
                            as the house playwright of the King's Men. He retired in 1613, before the Globe Theatre
                            burned down during the performance of Henry VIII on 29 June.[81] Shakespeare died on 23
                            April 1616, at the age of 52.[d] He died within a month of signing his will, a document
                            which he begins by describing himself as being in "perfect health". No extant contemporary
                            source explains how or why he died. Half a century later, John Ward, the vicar of Stratford,
                            wrote in his notebook: "Shakespeare, Drayton, and Ben Jonson had a merry meeting and, it
                            seems, drank too hard, for Shakespeare died of a fever there contracted",[84][85] not an
                            impossible scenario since Shakespeare knew Jonson and Drayton. Of the tributes from fellow
                            authors, one refers to his relatively sudden death: "We wondered, Shakespeare, that thou
                            went'st so soon / From the world's stage to the grave's tiring room."[86][e] Holy Trinity
                            Church, Stratford-upon-Avon, where Shakespeare was baptised and is buried He was survived by
                            his wife and two daughters. Susanna had married a physician, John Hall, in 1607,[87] and
                            Judith had married Thomas Quiney, a vintner, two months before Shakespeare's death.[88]
                            Shakespeare signed his last will and testament on 25 March 1616; the following day, Thomas
                            Quiney, his new son-in-law, was found guilty of fathering an illegitimate son by Margaret
                            Wheeler, both of whom had died during childbirth. Thomas was ordered by the church court to
                            do public penance, which would have caused much shame and embarrassment for the Shakespeare
                            family.[88] Shakespeare bequeathed the bulk of his large estate to his elder daughter
                            Susanna[89] under stipulations that she pass it down intact to "the first son of her
                            body".[90] The Quineys had three children, all of whom died without marrying.[91][92] The
                            Halls had one child, Elizabeth, who married twice but died without children in 1670, ending
                            Shakespeare's direct line.[93][94] Shakespeare's will scarcely mentions his wife, Anne, who
                            was probably entitled to one-third of his estate automatically.[f] He did make a point,
                            however, of leaving her "my second best bed", a bequest that has led to much
                            speculation.[96][97][98] Some scholars see the bequest as an insult to Anne, whereas others
                            believe that the second-best bed would have been the matrimonial bed and therefore rich in
                            significance.[99] Shakespeare's grave, next to those of Anne Shakespeare, his wife, and
                            Thomas Nash, the husband of his granddaughter Shakespeare was buried in the chancel of the
                            Holy Trinity Church two days after his death.[100][101] The epitaph carved into the stone
                            slab covering his grave includes a curse against moving his bones, which was carefully
                            avoided during restoration of the church in 2008:[102] Good frend for Iesvs sake forbeare,
                            To digg the dvst encloased heare. Bleste be yͤ man yͭ spares thes stones, And cvrst be he yͭ
                            moves my bones.[103][g] Good friend, for Jesus' sake forbear, To dig the dust enclosed here.
                            Blessed be the man that spares these stones, And cursed be he that moves my bones. Some time
                            before 1623, a funerary monument was erected in his memory on the north wall, with a
                            half-effigy of him in the act of writing. Its plaque compares him to Nestor, Socrates, and
                            Virgil.[104] In 1623, in conjunction with the publication of the First Folio, the Droeshout
                            engraving was published.[105] Shakespeare has been commemorated in many statues and
                            memorials around the world, including funeral monuments in Southwark Cathedral and Poets'
                            Corner in Westminster Abbey.[106][107] Plays Main articles: Shakespeare's plays, William
                            Shakespeare's collaborations, and Shakespeare bibliography Procession of Characters from
                            Shakespeare's Plays by an unknown 19th-century artist Most playwrights of the period
                            typically collaborated with others at some point, as critics agree Shakespeare did, mostly
                            early and late in his career.[108] The first recorded works of Shakespeare are Richard III
                            and the three parts of Henry VI, written in the early 1590s during a vogue for historical
                            drama. Shakespeare's plays are difficult to date precisely, however,[109][110] and studies
                            of the texts suggest that Titus Andronicus, The Comedy of Errors, The Taming of the Shrew,
                            and The Two Gentlemen of Verona may also belong to Shakespeare's earliest period.[111][109]
                            His first histories, which draw heavily on the 1587 edition of Raphael Holinshed's
                            Chronicles of England, Scotland, and Ireland,[112] dramatise the destructive results of weak
                            or corrupt rule and have been interpreted as a justification for the origins of the Tudor
                            dynasty.[113] The early plays were influenced by the works of other Elizabethan dramatists,
                            especially Thomas Kyd and Christopher Marlowe, by the traditions of medieval drama, and by
                            the plays of Seneca.[114][115][116] The Comedy of Errors was also based on classical models,
                            but no source for The Taming of the Shrew has been found, though it has an indentical plot
                            but different wording as another play with a similar name.[117][118] Like The Two Gentlemen
                            of Verona, in which two friends appear to approve of rape,[119][120][121] the Shrew's story
                            of the taming of a woman's independent spirit by a man sometimes troubles modern critics,
                            directors, and audiences.[122] Oberon, Titania and Puck with Fairies Dancing. By William
                            Blake, c. 1786. Shakespeare's early classical and Italianate comedies, containing tight
                            double plots and precise comic sequences, give way in the mid-1590s to the romantic
                            atmosphere of his most acclaimed comedies.[123] A Midsummer Night's Dream is a witty mixture
                            of romance, fairy magic, and comic lowlife scenes.[124] Shakespeare's next comedy, the
                            equally romantic The Merchant of Venice, contains a portrayal of the vengeful Jewish
                            moneylender Shylock, which reflects dominant Elizabethan views but may appear derogatory to
                            modern audiences.[125][126] The wit and wordplay of Much Ado About Nothing,[127] the
                            charming rural setting of As You Like It, and the lively merrymaking of Twelfth Night
                            complete Shakespeare's sequence of great comedies.[128] After the lyrical Richard II,
                            written almost entirely in verse, Shakespeare introduced prose comedy into the histories of
                            the late 1590s, Henry IV, Part 1 and 2, and Henry V. Henry IV features Falstaff, rogue, wit
                            and friend of Prince Hal. His characters become more complex and tender as he switches
                            deftly between comic and serious scenes, prose and poetry, and achieves the narrative
                            variety of his mature work.[129][130][131] This period begins and ends with two tragedies:
                            Romeo and Juliet, the famous romantic tragedy of sexually charged adolescence, love, and
                            death;[132][133] and Julius Caesar—based on Sir Thomas North's 1579 translation of
                            Plutarch's Parallel Lives—which introduced a new kind of drama.[134][135] According to
                            Shakespearean scholar James Shapiro, in Julius Caesar, "the various strands of politics,
                            character, inwardness, contemporary events, even Shakespeare's own reflections on the act of
                            writing, began to infuse each other".[136] Hamlet, Horatio, Marcellus, and the Ghost of
                            Hamlet's Father. Henry Fuseli, 1780–1785. In the early 17th century, Shakespeare wrote the
                            so-called "problem plays" Measure for Measure, Troilus and Cressida, and All's Well That
                            Ends Well and a number of his best known tragedies.[137][138] Many critics believe that
                            Shakespeare's tragedies represent the peak of his art. Hamlet has probably been analysed
                            more than any other Shakespearean character, especially for his famous soliloquy which
                            begins "To be or not to be; that is the question".[139] Unlike the introverted Hamlet, whose
                            fatal flaw is hesitation, Othello and Lear are undone by hasty errors of judgement.[140] The
                            plots of Shakespeare's tragedies often hinge on such fatal errors or flaws, which overturn
                            order and destroy the hero and those he loves.[141] In Othello, Iago stokes Othello's sexual
                            jealousy to the point where he murders the innocent wife who loves him.[142][143] In King
                            Lear, the old king commits the tragic error of giving up his powers, initiating the events
                            which lead to the torture and blinding of the Earl of Gloucester and the murder of Lear's
                            youngest daughter, Cordelia. According to the critic Frank Kermode, "the play...offers
                            neither its good characters nor its audience any relief from its cruelty".[144][145][146] In
                            Macbeth, the shortest and most compressed of Shakespeare's tragedies,[147] uncontrollable
                            ambition incites Macbeth and his wife, Lady Macbeth, to murder the rightful king and usurp
                            the throne until their own guilt destroys them in turn.[148] In this play, Shakespeare adds
                            a supernatural element to the tragic structure. His last major tragedies, Antony and
                            Cleopatra and Coriolanus, contain some of Shakespeare's finest poetry and were considered
                            his most successful tragedies by the poet and critic T. S. Eliot.[149][150][151] Eliot
                            wrote, "Shakespeare acquired more essential history from Plutarch than most men could from
                            the whole British Museum."[152] In his final period, Shakespeare turned to romance or
                            tragicomedy and completed three more major plays: Cymbeline, The Winter's Tale, and The
                            Tempest, as well as the collaboration, Pericles, Prince of Tyre. Less bleak than the
                            tragedies, these four plays are graver in tone than the comedies of the 1590s, but they end
                            with reconciliation and the forgiveness of potentially tragic errors.[153] Some commentators
                            have seen this change in mood as evidence of a more serene view of life on Shakespeare's
                            part, but it may merely reflect the theatrical fashion of the day.[154][155][156]
                            Shakespeare collaborated on two further surviving plays, Henry VIII and The Two Noble
                            Kinsmen, probably with John Fletcher.[157] Classification Further information: Chronology of
                            Shakespeare's plays The Plays of William Shakespeare, a painting containing scenes and
                            characters from several plays of Shakespeare; by Sir John Gilbert, c. 1849 Shakespeare's
                            works include the 36 plays printed in the First Folio of 1623, listed according to their
                            folio classification as comedies, histories, and tragedies.[158] Two plays not included in
                            the First Folio,[14] The Two Noble Kinsmen and Pericles, Prince of Tyre, are now accepted as
                            part of the canon, with today's scholars agreeing that Shakespeare made major contributions
                            to the writing of both.[159][160] No Shakespearean poems were included in the First Folio.
                            In the late 19th century, Edward Dowden classified four of the late comedies as romances,
                            and though many scholars prefer to call them tragicomedies, Dowden's term is often
                            used.[161][162] In 1896, Frederick S. Boas coined the term "problem plays" to describe four
                            plays: All's Well That Ends Well, Measure for Measure, Troilus and Cressida, and
                            Hamlet.[163] "Dramas as singular in theme and temper cannot be strictly called comedies or
                            tragedies", he wrote. "We may, therefore, borrow a convenient phrase from the theatre of
                            today and class them together as Shakespeare's problem plays."[164] The term, much debated
                            and sometimes applied to other plays, remains in use, though Hamlet is definitively classed
                            as a tragedy.[165][166][167] Performances Main article: Shakespeare in performance It is not
                            clear for which companies Shakespeare wrote his early plays. The title page of the 1594
                            edition of Titus Andronicus reveals that the play had been acted by three different
                            troupes.[168] After the plagues of 1592–93, Shakespeare's plays were performed by his own
                            company at The Theatre and the Curtain in Shoreditch, north of the Thames.[169] Londoners
                            flocked there to see the first part of Henry IV, Leonard Digges recording, "Let but Falstaff
                            come, Hal, Poins, the rest ... and you scarce shall have a room".[170] When the company
                            found themselves in dispute with their landlord, they pulled The Theatre down and used the
                            timbers to construct the Globe Theatre, the first playhouse built by actors for actors, on
                            the south bank of the Thames at Southwark.[171][172] The Globe opened in autumn 1599, with
                            Julius Caesar one of the first plays staged. Most of Shakespeare's greatest post-1599 plays
                            were written for the Globe, including Hamlet, Othello, and King Lear.[171][173][174] The
                            reconstructed Globe Theatre on the south bank of the River Thames in London After the Lord
                            Chamberlain's Men were renamed the King's Men in 1603, they entered a special relationship
                            with the new King James. Although the performance records are patchy, the King's Men
                            performed seven of Shakespeare's plays at court between 1 November 1604, and 31 October
                            1605, including two performances of The Merchant of Venice.[63] After 1608, they performed
                            at the indoor Blackfriars Theatre during the winter and the Globe during the summer.[175]
                            The indoor setting, combined with the Jacobean fashion for lavishly staged masques, allowed
                            Shakespeare to introduce more elaborate stage devices. In Cymbeline, for example, Jupiter
                            descends "in thunder and lightning, sitting upon an eagle: he throws a thunderbolt. The
                            ghosts fall on their knees."[176][177] The actors in Shakespeare's company included the
                            famous Richard Burbage, William Kempe, Henry Condell and John Heminges. Burbage played the
                            leading role in the first performances of many of Shakespeare's plays, including Richard
                            III, Hamlet, Othello, and King Lear.[178] The popular comic actor Will Kempe played the
                            servant Peter in Romeo and Juliet and Dogberry in Much Ado About Nothing, among other
                            characters.[179][180] He was replaced around 1600 by Robert Armin, who played roles such as
                            Touchstone in As You Like It and the fool in King Lear.[181] In 1613, Sir Henry Wotton
                            recorded that Henry VIII "was set forth with many extraordinary circumstances of pomp and
                            ceremony".[182] On 29 June, however, a cannon set fire to the thatch of the Globe and burned
                            the theatre to the ground, an event which pinpoints the date of a Shakespeare play with rare
                            precision.[182] Textual sources Title page of the First Folio, 1623. Copper engraving of
                            Shakespeare by Martin Droeshout. In 1623, John Heminges and Henry Condell, two of
                            Shakespeare's friends from the King's Men, published the First Folio, a collected edition of
                            Shakespeare's plays. It contained 36 texts, including 18 printed for the first time.[183]
                            The others had already appeared in quarto versions—flimsy books made from sheets of paper
                            folded twice to make four leaves.[184] No evidence suggests that Shakespeare approved these
                            editions, which the First Folio describes as "stol'n and surreptitious copies".[185] Alfred
                            Pollard termed some of the pre-1623 versions as "bad quartos" because of their adapted,
                            paraphrased or garbled texts, which may in places have been reconstructed from
                            memory.[184][185][186] Where several versions of a play survive, each differs from the
                            others. The differences may stem from copying or printing errors, from notes by actors or
                            audience members, or from Shakespeare's own papers.[187][188] In some cases, for example,
                            Hamlet, Troilus and Cressida, and Othello, Shakespeare could have revised the texts between
                            the quarto and folio editions. In the case of King Lear, however, while most modern editions
                            do conflate them, the 1623 folio version is so different from the 1608 quarto that the
                            Oxford Shakespeare prints them both, arguing that they cannot be conflated without
                            confusion.[189] Poems In 1593 and 1594, when the theatres were closed because of plague,
                            Shakespeare published two narrative poems on sexual themes, Venus and Adonis and The Rape of
                            Lucrece. He dedicated them to Henry Wriothesley, Earl of Southampton. In Venus and Adonis,
                            an innocent Adonis rejects the sexual advances of Venus; while in The Rape of Lucrece, the
                            virtuous wife Lucrece is raped by the lustful Tarquin.[190] Influenced by Ovid's
                            Metamorphoses,[191] the poems show the guilt and moral confusion that result from
                            uncontrolled lust.[192] Both proved popular and were often reprinted during Shakespeare's
                            lifetime. A third narrative poem, A Lover's Complaint, in which a young woman laments her
                            seduction by a persuasive suitor, was printed in the first edition of the Sonnets in 1609.
                            Most scholars now accept that Shakespeare wrote A Lover's Complaint. Critics consider that
                            its fine qualities are marred by leaden effects.[193][194][195] The Phoenix and the Turtle,
                            printed in Robert Chester's 1601 Love's Martyr, mourns the deaths of the legendary phoenix
                            and his lover, the faithful turtle dove. In 1599, two early drafts of sonnets 138 and 144
                            appeared in The Passionate Pilgrim, published under Shakespeare's name but without his
                            permission.[193][195][196] Sonnets Main article: Shakespeare's sonnets Title page from 1609
                            edition of Shake-Speares Sonnets Published in 1609, the Sonnets were the last of
                            Shakespeare's non-dramatic works to be printed. Scholars are not certain when each of the
                            154 sonnets was composed, but evidence suggests that Shakespeare wrote sonnets throughout
                            his career for a private readership.[197][198] Even before the two unauthorised sonnets
                            appeared in The Passionate Pilgrim in 1599, Francis Meres had referred in 1598 to
                            Shakespeare's "sugred Sonnets among his private friends".[199] Few analysts believe that the
                            published collection follows Shakespeare's intended sequence.[200] He seems to have planned
                            two contrasting series: one about uncontrollable lust for a married woman of dark complexion
                            (the "dark lady"), and one about conflicted love for a fair young man (the "fair youth"). It
                            remains unclear if these figures represent real individuals, or if the authorial "I" who
                            addresses them represents Shakespeare himself, though Wordsworth believed that with the
                            sonnets "Shakespeare unlocked his heart".[199][198] Shall I compare thee to a summer's day?
                            Thou art more lovely and more temperate ... —Opening lines from Shakespeare's Sonnet
                            18.[201] The 1609 edition was dedicated to a "Mr. W.H.", credited as "the only begetter" of
                            the poems. It is not known whether this was written by Shakespeare himself or by the
                            publisher, Thomas Thorpe, whose initials appear at the foot of the dedication page; nor is
                            it known who Mr. W.H. was, despite numerous theories, or whether Shakespeare even authorised
                            the publication.[202] Critics praise the Sonnets as a profound meditation on the nature of
                            love, sexual passion, procreation, death, and time.[203] Style Main article: Shakespeare's
                            writing style Shakespeare's first plays were written in the conventional style of the day.
                            He wrote them in a stylised language that does not always spring naturally from the needs of
                            the characters or the drama.[204] The poetry depends on extended, sometimes elaborate
                            metaphors and conceits, and the language is often rhetorical—written for actors to declaim
                            rather than speak. The grand speeches in Titus Andronicus, in the view of some critics,
                            often hold up the action, for example; and the verse in The Two Gentlemen of Verona has been
                            described as stilted.[205][206] Pity by William Blake, 1795, is an illustration of two
                            similes in Macbeth: "And pity, like a naked new-born babe, Striding the blast, or heaven's
                            cherubim, hors'd Upon the sightless couriers of the air."[207] However, Shakespeare soon
                            began to adapt the traditional styles to his own purposes. The opening soliloquy of Richard
                            III has its roots in the self-declaration of Vice in medieval drama. At the same time,
                            Richard's vivid self-awareness looks forward to the soliloquies of Shakespeare's mature
                            plays.[208][209] No single play marks a change from the traditional to the freer style.
                            Shakespeare combined the two throughout his career, with Romeo and Juliet perhaps the best
                            example of the mixing of the styles.[210] By the time of Romeo and Juliet, Richard II, and A
                            Midsummer Night's Dream in the mid-1590s, Shakespeare had begun to write a more natural
                            poetry. He increasingly tuned his metaphors and images to the needs of the drama itself.
                            Shakespeare's standard poetic form was blank verse, composed in iambic pentameter. In
                            practice, this meant that his verse was usually unrhymed and consisted of ten syllables to a
                            line, spoken with a stress on every second syllable. The blank verse of his early plays is
                            quite different from that of his later ones. It is often beautiful, but its sentences tend
                            to start, pause, and finish at the end of lines, with the risk of monotony.[211] Once
                            Shakespeare mastered traditional blank verse, he began to interrupt and vary its flow. This
                            technique releases the new power and flexibility of the poetry in plays such as Julius
                            Caesar and Hamlet. Shakespeare uses it, for example, to convey the turmoil in Hamlet's
                            mind:[212] Sir, in my heart there was a kind of fighting That would not let me sleep.
                            Methought I lay Worse than the mutines in the bilboes. Rashly— And prais'd be rashness for
                            it—let us know Our indiscretion sometimes serves us well ... — Hamlet, Act 5, Scene 2,
                            4–8[212] After Hamlet, Shakespeare varied his poetic style further, particularly in the more
                            emotional passages of the late tragedies. The literary critic A. C. Bradley described this
                            style as "more concentrated, rapid, varied, and, in construction, less regular, not seldom
                            twisted or elliptical".[213] In the last phase of his career, Shakespeare adopted many
                            techniques to achieve these effects. These included run-on lines, irregular pauses and
                            stops, and extreme variations in sentence structure and length.[214] In Macbeth, for
                            example, the language darts from one unrelated metaphor or simile to another: "was the hope
                            drunk/ Wherein you dressed yourself?" (1.7.35–38); "... pity, like a naked new-born babe/
                            Striding the blast, or heaven's cherubim, hors'd/ Upon the sightless couriers of the air
                            ..." (1.7.21–25). The listener is challenged to complete the sense.[214] The late romances,
                            with their shifts in time and surprising turns of plot, inspired a last poetic style in
                            which long and short sentences are set against one another, clauses are piled up, subject
                            and object are reversed, and words are omitted, creating an effect of spontaneity.[215]
                            Shakespeare combined poetic genius with a practical sense of the theatre.[216] Like all
                            playwrights of the time, he dramatised stories from sources such as Plutarch and
                            Holinshed.[217] He reshaped each plot to create several centres of interest and to show as
                            many sides of a narrative to the audience as possible. This strength of design ensures that
                            a Shakespeare play can survive translation, cutting, and wide interpretation without loss to
                            its core drama.[218] As Shakespeare's mastery grew, he gave his characters clearer and more
                            varied motivations and distinctive patterns of speech. He preserved aspects of his earlier
                            style in the later plays, however. In Shakespeare's late romances, he deliberately returned
                            to a more artificial style, which emphasised the illusion of theatre.[219][220] Legacy
                            Influence Main article: Shakespeare's influence Macbeth Consulting the Vision of the Armed
                            Head. By Henry Fuseli, 1793–1794. Shakespeare's work has made a significant and lasting
                            impression on later theatre and literature. In particular, he expanded the dramatic
                            potential of characterisation, plot, language, and genre.[221] Until Romeo and Juliet, for
                            example, romance had not been viewed as a worthy topic for tragedy.[222] Soliloquies had
                            been used mainly to convey information about characters or events, but Shakespeare used them
                            to explore characters' minds.[223] His work heavily influenced later poetry. The Romantic
                            poets attempted to revive Shakespearean verse drama, though with little success. Critic
                            George Steiner described all English verse dramas from Coleridge to Tennyson as "feeble
                            variations on Shakespearean themes."[224] John Milton, considered by many to be the most
                            important English poet after Shakespeare, wrote in tribute: "Thou in our wonder and
                            astonishment/ Hast built thyself a live-long monument."[225] Shakespeare influenced
                            novelists such as Thomas Hardy, William Faulkner, and Charles Dickens. The American novelist
                            Herman Melville's soliloquies owe much to Shakespeare; his Captain Ahab in Moby-Dick is a
                            classic tragic hero, inspired by King Lear.[226] Scholars have identified 20,000 pieces of
                            music linked to Shakespeare's works, including Felix Mendelssohn's overture and incidental
                            music for A Midsummer Night's Dream and Sergei Prokofiev's ballet Romeo and Juliet. His work
                            has inspired several operas, among them Giuseppe Verdi's Macbeth, Otello and Falstaff, whose
                            critical standing compares with that of the source plays.[227] Shakespeare has also inspired
                            many painters, including the Romantics and the Pre-Raphaelites, while William Hogarth's 1745
                            painting of actor David Garrick playing Richard III was decisive in establishing the genre
                            of theatrical portraiture in Britain.[228] The Swiss Romantic artist Henry Fuseli, a friend
                            of William Blake, even translated Macbeth into German.[229] The psychoanalyst Sigmund Freud
                            drew on Shakespearean psychology, in particular, that of Hamlet, for his theories of human
                            nature.[230] Shakespeare has been a rich source for filmmakers; Akira Kurosawa adapted
                            Macbeth and King Lear as Throne of Blood and Ran, respectively. Other examples of
                            Shakespeare on film include Max Reinhardt's A Midsummer Night's Dream, Laurence Olivier's
                            Hamlet and Al Pacino's documentary Looking For Richard.[231] Orson Welles, a lifelong lover
                            of Shakespeare, directed and starred in Macbeth, Othello and Chimes at Midnight, in which he
                            plays John Falstaff, which Welles himself called his best work.[232] In Shakespeare's day,
                            English grammar, spelling, and pronunciation were less standardised than they are now,[233]
                            and his use of language helped shape modern English.[234] Samuel Johnson quoted him more
                            often than any other author in his A Dictionary of the English Language, the first serious
                            work of its type.[235] Expressions such as "with bated breath" (Merchant of Venice) and "a
                            foregone conclusion" (Othello) have found their way into everyday English speech.[236][237]
                            Shakespeare's influence extends far beyond his native England and the English language. His
                            reception in Germany was particularly significant; as early as the 18th century Shakespeare
                            was widely translated and popularised in Germany, and gradually became a "classic of the
                            German Weimar era;" Christoph Martin Wieland was the first to produce complete translations
                            of Shakespeare's plays in any language.[238][239] Actor and theatre director Simon Callow
                            writes, "this master, this titan, this genius, so profoundly British and so effortlessly
                            universal, each different culture – German, Italian, Russian – was obliged to respond to the
                            Shakespearean example; for the most part, they embraced it, and him, with joyous abandon, as
                            the possibilities of language and character in action that he celebrated liberated writers
                            across the continent. Some of the most deeply affecting productions of Shakespeare have been
                            non-English, and non-European. He is that unique writer: he has something for
                            everyone."[240] According to Guinness World Records, Shakespeare remains the world's
                            best-selling playwright, with sales of his plays and poetry believed to have achieved in
                            excess of four billion copies in the almost 400 years since his death. He is also the third
                            most translated author in history.[241] Critical reputation Main articles: Reputation of
                            William Shakespeare and Timeline of Shakespeare criticism He was not of an age, but for all
                            time. —Ben Jonson[242] Shakespeare was not revered in his lifetime, but he received a large
                            amount of praise.[243][244] In 1598, the cleric and author Francis Meres singled him out
                            from a group of English playwrights as "the most excellent" in both comedy and
                            tragedy.[245][246] The authors of the Parnassus plays at St John's College, Cambridge,
                            numbered him with Chaucer, Gower, and Spenser.[247] In the First Folio, Ben Jonson called
                            Shakespeare the "Soul of the age, the applause, delight, the wonder of our stage", although
                            he had remarked elsewhere that "Shakespeare wanted art" (lacked skill).[242] Between the
                            Restoration of the monarchy in 1660 and the end of the 17th century, classical ideas were in
                            vogue. As a result, critics of the time mostly rated Shakespeare below John Fletcher and Ben
                            Jonson.[248] Thomas Rymer, for example, condemned Shakespeare for mixing the comic with the
                            tragic. Nevertheless, poet and critic John Dryden rated Shakespeare highly, saying of
                            Jonson, "I admire him, but I love Shakespeare".[249] He also famously remarked that
                            Shakespeare "was naturally learned; he needed not the spectacles of books to read nature; he
                            looked inwards, and found her there."[250] For several decades, Rymer's view held sway. But
                            during the 18th century, critics began to respond to Shakespeare on his own terms and, like
                            Dryden, to acclaim what they termed his natural genius. A series of scholarly editions of
                            his work, notably those of Samuel Johnson in 1765 and Edmond Malone in 1790, added to his
                            growing reputation.[251][252] By 1800, he was firmly enshrined as the national poet,[253]
                            and described as the "Bard of Avon" (or simply "the Bard").[254][h] In the 18th and 19th
                            centuries, his reputation also spread abroad. Among those who championed him were the
                            writers Voltaire, Goethe, Stendhal, and Victor Hugo.[256][i] William Ordway Partridge's
                            garlanded statue of William Shakespeare in Lincoln Park, Chicago, typical of many created in
                            the 19th and early 20th centuries During the Romantic era, Shakespeare was praised by the
                            poet and literary philosopher Samuel Taylor Coleridge, and the critic August Wilhelm
                            Schlegel translated his plays in the spirit of German Romanticism.[258] In the 19th century,
                            critical admiration for Shakespeare's genius often bordered on adulation.[259] "This King
                            Shakespeare," the essayist Thomas Carlyle wrote in 1840, "does not he shine, in crowned
                            sovereignty, over us all, as the noblest, gentlest, yet strongest of rallying signs;
                            indestructible".[260] The Victorians produced his plays as lavish spectacles on a grand
                            scale.[261] The playwright and critic George Bernard Shaw mocked the cult of Shakespeare
                            worship as "bardolatry", claiming that the new naturalism of Ibsen's plays had made
                            Shakespeare obsolete.[262] The modernist revolution in the arts during the early 20th
                            century, far from discarding Shakespeare, eagerly enlisted his work in the service of the
                            avant-garde. The Expressionists in Germany and the Futurists in Moscow mounted productions
                            of his plays. Marxist playwright and director Bertolt Brecht devised an epic theatre under
                            the influence of Shakespeare. The poet and critic T. S. Eliot argued against Shaw that
                            Shakespeare's "primitiveness" in fact made him truly modern.[263] Eliot, along with G.
                            Wilson Knight and the school of New Criticism, led a movement towards a closer reading of
                            Shakespeare's imagery. In the 1950s, a wave of new critical approaches replaced modernism
                            and paved the way for post-modern studies of Shakespeare.[264] Comparing Shakespeare's
                            accomplishments to those of leading figures in philosophy and theology, Harold Bloom wrote,
                            "Shakespeare was larger than Plato and than St. Augustine. He encloses us because we see
                            with his fundamental perceptions."[265] Speculation Authorship Main article: Shakespeare
                            authorship question Around 230 years after Shakespeare's death, doubts began to be expressed
                            about the authorship of the works attributed to him.[266] Proposed alternative candidates
                            include Francis Bacon, Christopher Marlowe, and Edward de Vere, 17th Earl of Oxford.[267]
                            Several "group theories" have also been proposed.[268] All but a few Shakespeare scholars
                            and literary historians consider it a fringe theory, with only a small minority of academics
                            who believe that there is reason to question the traditional attribution,[269] but interest
                            in the subject, particularly the Oxfordian theory of Shakespeare authorship, continues into
                            the 21st century.[270][271][272] Religion Main article: Religious views of William
                            Shakespeare Shakespeare conformed to the official state religion,[j] but his private views
                            on religion have been the subject of debate. Shakespeare's will uses a Protestant formula,
                            and he was a confirmed member of the Church of England, where he was married, his children
                            were baptised, and where he is buried. Some scholars are of the view that members of
                            Shakespeare's family were Catholics, at a time when practising Catholicism in England was
                            against the law.[274] Shakespeare's mother, Mary Arden, certainly came from a pious Catholic
                            family. The strongest evidence might be a Catholic statement of faith signed by his father,
                            John Shakespeare, found in 1757 in the rafters of his former house in Henley Street.
                            However, the document is now lost and scholars differ as to its authenticity.[275][276] In
                            1591, the authorities reported that John Shakespeare had missed church "for fear of process
                            for debt", a common Catholic excuse.[277][278][279] In 1606, the name of William's daughter
                            Susanna appears on a list of those who failed to attend Easter communion in
                            Stratford.[277][278][279] Other authors argue that there is a lack of evidence about
                            Shakespeare's religious beliefs. Scholars find evidence both for and against Shakespeare's
                            Catholicism, Protestantism, or lack of belief in his plays, but the truth may be impossible
                            to prove.[280][281] Sexuality Main article: Sexuality of William Shakespeare Artistic
                            depiction of the Shakespeare family, late 19th century Few details of Shakespeare's
                            sexuality are known. At 18, he married 26-year-old Anne Hathaway, who was pregnant. Susanna,
                            the first of their three children, was born six months later on 26 May 1583. Over the
                            centuries, some readers have posited that Shakespeare's sonnets are autobiographical,[282]
                            and point to them as evidence of his love for a young man. Others read the same passages as
                            the expression of intense friendship rather than romantic love.[283][284][285] The 26
                            so-called "Dark Lady" sonnets, addressed to a married woman, are taken as evidence of
                            heterosexual liaisons.[286] Portraiture Main article: Portraits of Shakespeare No written
                            contemporary description of Shakespeare's physical appearance survives, and no evidence
                            suggests that he ever commissioned a portrait. From the 18th century, the desire for
                            authentic Shakespeare portraits fuelled claims that various surviving pictures depicted
                            Shakespeare.[287] That demand also led to the production of several fake portraits, as well
                            as misattributions, re-paintings, and relabelling of portraits of other people.[288][289]
                            Some scholars suggest that the Droeshout portrait, which Ben Jonson approved of as a good
                            likeness,[290] and his Stratford monument provide perhaps the best evidence of his
                            appearance.[291] Of the claimed paintings, art historian Tarnya Cooper concluded that the
                            Chandos portrait (shown at the top of this article) had "the strongest claim of any of the
                            known contenders to be a true portrait of Shakespeare". After a three-year study supported
                            by the National Portrait Gallery, London, the portrait's owners, Cooper contended that its
                            composition date, contemporary with Shakespeare, its subsequent provenance, and the sitter's
                            attire, all supported the attribution.[292]
                        </span>

                        {/* <Button
            radius="full"
            // size="lg"
            variant="solid"
            // style={{
            //     // color: "white",
            //     width: `${window.innerWidth / 6 > 100 ? 100 : window.innerWidth / 6}px`,
            //     height: `${window.innerWidth / 6 > 100 ? 100 : window.innerWidth / 6}px`,
            // }}
            isIconOnly
            onClick={() => {
                adplayer.current.play();
            }}
            // size={window.innerWidth / 8 > 80 ? 80 : window.innerWidth / 8}
        >
            <span></span>
            <Icons.MagnifyingGlass />
        </Button> */}
                        {/* <p>生命因何而沉睡？</p> */}

                        {/* <p >WELCOME</p>
    <p>TO MY</p>
    <p>W·O·R·L·D</p> */}
                    </div>

                    {/* <AnimatedRectangles value={v} /> */}
                </div>
            </motion.div>
        );
    };

    const Page4 = () => {
        return (
            <span>
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">Daily Mix</p>
                        <small className="text-default-500">12 Tracks</small>
                        <h4 className="font-bold text-large">Frontend Radio</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://nextui.org/images/hero-card-complete.jpeg"
                            width={270}
                        />
                    </CardBody>
                </Card>
            </span>
        );
    };

    return (
        <>
            <OnHoverAppear
                style={{
                    position: "fixed",
                    zIndex: 999,
                    background: "white",
                    padding: 20,
                }}
            >
                <Slider
                    label="Element Loader"
                    size="sm"
                    minValue={0}
                    maxValue={70}
                    renderThumb={(props) => <HideAfter {...props} />}
                    style={{
                        transition: "all 1s",
                    }}
                    value={v}
                    onChange={_v}
                />
                <Slider
                    label="Background Size"
                    size="sm"
                    minValue={0}
                    maxValue={5}
                    renderThumb={(props) => <HideAfter {...props} />}
                    style={{
                        transition: "all 1s",
                    }}
                    value={bgProgress}
                    onChange={setBgProgress}
                />
                <Select
                    label="Language"
                    selectedKeys={new Set([locale])}
                    onSelectionChange={(v) => setLocale(Array.from(v)[0])}
                >
                    {locales.map((l) => (
                        <SelectItem key={l}>{l}</SelectItem>
                    ))}
                </Select>
                <Select label="Scroll To">
                    {[0, 0.1].map((l) => (
                        <SelectItem
                            key={l}
                            onClick={() => {
                                const targetScrollPosition = document.documentElement.scrollHeight * l;
                                window.scrollTo({ top: targetScrollPosition, behavior: "smooth" });
                            }}
                        >
                            {l}
                        </SelectItem>
                    ))}
                </Select>
            </OnHoverAppear>

            <OpController on={!showBg}>
                <div
                    style={{
                        position: "fixed",
                        height: "100vh",
                        width: "100vw",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <GenshinLoader value={v} active={elementLoaderVisible} />
                </div>
            </OpController>

            <OpController on={showBg}>
                <RootStyle />
                <Bg src={"bg (1).mp4"} sp={[0, 1]} maxScale={5} onLoadComplete={() => setBgLoadCompleted(true)} />
                <div
                    style={{
                        width: "900px",
                        maxWidth: "80vw",
                    }}
                >
                    <Page1 />
                </div>

                {/* <div className="h-screen w-screen flex justify-center items-center">

                        <Page>opacity?</Page>
                    </div> */}
                {/* <AppContainer
                    onBgLoadCompleted={() => setBgLoadCompleted(true)}
                    // bg={<Bg src={"bg (1).mp4"} level={bgProgress} onLoadComplete={() => setBgLoadCompleted(true)} />}
                    pages={[Page1, Page2, Page3, Page4]}
                >
                    <AudioPlayer ref={adplayer} />

                    
                </AppContainer> */}
            </OpController>
        </>
    );
}

export default App;
