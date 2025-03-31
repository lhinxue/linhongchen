import en from "./src/en";
import zh from "./src/zh";

export interface Personality {
    icon: React.FC;
    title: string;
    notes: string;
}

export interface HistoricalEvent {
    name: string;
    tag: string;
    timestamp: string;
    notes: string;
}

export interface Skill {
    name: string;
}

export interface Project {
    name: string;
    tags: string[];
    timestamp: string;
    notes: string;
}

export interface Links {
    linkedin: string;
    github: string;
    youtube: string;
    x: string;
    facebook: string;
}

export interface Tagline {
    _1: string;
    _1p: string;
    _2: string;
    _2p: string;
}

export interface Content {
    name: string;
    epithet: string;
    license: string;
    links: Links;
    tagline: Tagline[];
    coverBtn: string;
    aboutH1: string;
    aboutH2: string[];
    aboutP: string;
    aboutList: Personality[];
    expH1: string;
    expH2: string[];
    expList: HistoricalEvent[];
    abilityH1: string;
    abilityH2: string[];
    abilityList1: Skill[];
    abilityList2: Project[];
    footerBtn1: string;
}

export default { en, zh };
