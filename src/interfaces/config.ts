import { ContentBlockType, GalleryStyle } from "../enums/ContentBlockType";
import { IComponent } from "./components";

export interface IAppConfig {}

export interface IAppContent {
    Cover: {};
    Footer: {};
    Catalog: IComponent.MenuItem[];
    Pages: {
        key: string;
        title: string;
        subtitle: string;
        content: (IContentBlock.Wiki | IContentBlock.Gallery | IContentBlock.Timeline)[];
    }[];
}

export namespace IContentBlock {
    export interface Wiki extends IComponent.Wiki {
        type: ContentBlockType.Wiki;
    }

    export interface Gallery extends IComponent.Gallery {
        type: ContentBlockType.Gallery;
    }
    export interface Timeline extends IComponent.Timeline {
        type: ContentBlockType.Timeline;
    }
}
