import { Button, Drawer, DrawerBody, DrawerContent, Spacer, Tab, Tabs, useDisclosure } from "@heroui/react";
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSwipeable } from "react-swipeable";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import Lucide from "../icons/Lucide";
import { IComponent } from "../interfaces/components";
import { IStore } from "../interfaces/stores";
import DarkTheme, { useDarkTheme } from "./DarkTheme";
import ScrollArea from "./ScrollArea";
import { PageTitle } from "./Title";
import { ContentBlockType, GalleryStyle } from "../enums/ContentBlockType";
import { IContentBlock } from "../interfaces/config";
import Wiki from "./Wiki";
import Gallery from "./Gallery";

const useNavigator = create<IStore.Navigator>()(
    subscribeWithSelector((set) => ({
        current: "cover",
        scrolling: false,
        setCurrent: (id) => set(() => ({ current: id })),
        scrollTo: (id) =>
            new Promise<void>((resolve) => {
                const element = document.getElementById(id);
                if (element) {
                    const observer = new IntersectionObserver((entries, observer) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                observer.disconnect();
                                set(() => ({ scrolling: false }));
                                resolve();
                            }
                        });
                    });
                    set(() => ({ scrolling: true }));
                    element.scrollIntoView({ behavior: "smooth" });
                    observer.observe(element);
                }
            }),
    }))
);

export function Page({ children, id, className = "", onReveal = () => {} }: IComponent.Page) {
    const { inView, ref } = useInView({ threshold: 0.1 });

    useEffect(() => {
        if (inView) onReveal();
    }, [inView]);

    return (
        <>
            <div id={id} ref={ref} className={`${className} w-screen`}>
                {children}
            </div>
            <Spacer />
        </>
    );
}

function Navigator({ title, menu, contents }: IComponent.Navigator) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const onSwipLeft = useSwipeable({ onSwipedLeft: () => onClose(), trackMouse: true });
    const onSwipRight = useSwipeable({ onSwipedRight: () => onOpen(), trackMouse: true });
    const { dark, isDark } = useDarkTheme();

    const onAppear = () => {
        return {
            opacity: 1,
            transition: { duration: 0.5, delay: 0.3, ease: "easeInOut" },
        };
    };

    const onDisappear = () => {
        return {
            opacity: 0,
            transition: { duration: 0.5, delay: 0.3, ease: "easeInOut" },
        };
    };

    const { current, setCurrent, scrollTo, scrolling } = useNavigator();

    useEffect(() => {
        scrollTo(`page-${current}`);
    }, [current]);

    const ContentBlock = ({
        content,
    }: {
        content: IContentBlock.Wiki | IContentBlock.Gallery | IContentBlock.Timeline;
    }): ReactNode => {
        switch (content.type) {
            case ContentBlockType.Gallery:
                return <Gallery style={content.style} items={content.items} />;
            case ContentBlockType.Timeline:
                return <></>;
            case ContentBlockType.Wiki:
                return <Wiki image={content.image} content={content.content} />;
            default:
                return <></>;
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col">
            <div
                {...onSwipRight}
                className="justify-between h-16 flex items-center text-foreground bg-background select-none top-0 max-w-none sm:px-10 px-4 border-b-1 border-b-stone-200 dark:border-b-neutral-700"
            >
                <div className="flex gap-3 items-center">
                    <Button className="sm:hidden flex" variant="light" isIconOnly onPress={onOpen}>
                        <Lucide.Menu />
                    </Button>
                    <p className="font-bold text-inherit">{title}</p>
                </div>
                <div className="flex gap-3 items-center">
                    <Tabs className="hidden sm:flex" variant="underlined" selectedKey={`${current}`}>
                        {menu.map((m) => (
                            <Tab
                                key={m.key}
                                title={
                                    <div className="flex items-center space-x-2" onClick={() => setCurrent(m.key)}>
                                        {m.icon && <span>{m.icon}</span>}
                                        {m.title && <span>{m.title}</span>}
                                    </div>
                                }
                            />
                        ))}
                    </Tabs>
                    <DarkTheme />
                </div>
            </div>

            <ScrollArea className="flex-1">
                <Page id="page-c" className="bg-transparent min-h-screen" onReveal={() => setCurrent("c")}></Page>
                <motion.span
                    initial={onDisappear()}
                    animate={current !== "c" && current !== "f" ? onAppear() : onDisappear()}
                    exit={onDisappear()}
                >
                    <Page className="bg-background bg-opacity-90 backdrop-blur">
                        {menu.map((m) => (
                            <Page
                                key={m.key}
                                id={`page-${m.key}`}
                                className="min-h-screen pb-52"
                                onReveal={() => (scrolling ? void 0 : setCurrent(m.key))}
                            >
                                <PageTitle>{m.title}</PageTitle>
                                <ContentBlock content={contents[m.key]} />
                            </Page>
                        ))}
                    </Page>
                </motion.span>

                <Page id="page-f" className="bg-transparent min-h-screen" onReveal={() => setCurrent("f")}></Page>
            </ScrollArea>

            <Drawer
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="sm"
                radius="none"
                placement="left"
                backdrop="blur"
                hideCloseButton
                classNames={{ base: "max-w-80pc border-r-1" }}
                closeButton
                className={`text-foreground bg-background ${dark} ${
                    isDark ? `border-r-neutral-700` : `border-b-stone-200`
                }`}
            >
                <DrawerContent>
                    <DrawerBody {...onSwipLeft} className="px-4 py-0">
                        <div className="flex gap-3 h-16 items-center select-none">
                            <Button className="flex" variant="light" isIconOnly onPress={onClose}>
                                <Lucide.Menu />
                            </Button>
                            <p className="font-bold text-inherit">{title}</p>
                        </div>
                        <div>
                            {menu.map((m) => (
                                <Button
                                    fullWidth
                                    variant={m.key === current ? "flat" : "light"}
                                    radius="none"
                                    className="justify-start"
                                    key={m.key}
                                    onPress={() => {
                                        if (current !== m.key) {
                                            setCurrent(m.key);
                                            onClose();
                                        }
                                    }}
                                    color={m.key === current ? "primary" : "default"}
                                    startContent={m.icon}
                                >
                                    {m.title}
                                </Button>
                            ))}
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default Navigator;
