import { ReactNode } from "react";

import { GalleryStyle } from "../enums/ContentBlockType";

export namespace IComponent {
    export interface Default {
        children?: ReactNode;
        className?: string;
        id?: string;
    }

    export interface VideoBackgroundSource {
        landscape: string;
        portrait: string;
    }

    export interface VideoBackground {
        src?: string | VideoBackgroundSource;
        alt?: string | VideoBackgroundSource;
    }

    export interface MediaSource {
        src?: string;
        alt?: string;
    }

    export interface Image extends MediaSource, Default {
        isZoomd?: boolean;
        isBlurred?: boolean;
    }

    export interface Page {
        id?: string;
        className?: string;
        onReveal?: () => void;
        children?: ReactNode;
    }

    export interface MenuItem {
        key: string;
        title: string;
        icon?: ReactNode;
        content?: ReactNode;
    }

    export interface Navigator {
        title: string;
        menu: MenuItem[];
    }

    export interface Wiki {
        image?: { src: string; alt: string };
        content: string[];
    }

    export interface Gallery {
        style: GalleryStyle;
        items: GalleryItem[];
    }

    export interface GalleryItem {
        image?: { src: string; alt: string };
        title: string;
        content: string[];
        progress?: number;
        progressLabel?: string;
        tags?: string[];
        galleryStyle?: GalleryStyle;
    }
    export interface Timeline {
        items: {
            timestamp: Date | string;
            title: string;
            content: string[];
        };
    }
}
