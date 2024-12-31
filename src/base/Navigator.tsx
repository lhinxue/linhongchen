import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    Listbox,
    ListboxItem,
    Navbar,
    NavbarBrand,
    NavbarContent,
    Spacer,
    Tab,
    Tabs,
    useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSwipeable } from "react-swipeable";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import Lucide from "../icons/Lucide";
import DarkTheme from "./DarkTheme";
import ScrollArea from "./ScrollArea";

interface PageProps {
    id?: string;
    className?: string;
    onReveal?: () => void;
    children?: ReactNode;
}

interface MenuItem {
    key: string;
    title: string;
    icon?: ReactNode;
    content?: ReactNode;
}

interface NavigatorProps {
    title: string;
    menu: MenuItem[];
}

interface NavigatorStore {
    current: string;
    scrolling: boolean;
    setCurrent: (id: string) => void;
    scrollTo: (id: string) => Promise<void>;
}

const useNavigator = create<NavigatorStore>()(
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

export function Page({ children, id, className = "", onReveal = () => {} }: PageProps) {
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

function Navigator({ title, menu }: NavigatorProps) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const onSwipLeft = useSwipeable({ onSwipedLeft: () => onClose() });
    const onSwipRight = useSwipeable({ onSwipedRight: () => onOpen() });

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

    return (
        <div className="w-screen h-screen flex flex-col">
            <Navbar
                isBordered
                className="text-foreground bg-background"
                {...onSwipRight}
                classNames={{ wrapper: "sm:px-10 px-4 ", base: "top-0 max-w-none" }}
            >
                <NavbarBrand className="flex gap-3">
                    <Button className="sm:hidden flex" variant="light" isIconOnly onPress={onOpen}>
                        <Lucide.Menu />
                    </Button>
                    <p className="font-bold text-inherit">{title}</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <Tabs className="hidden sm:flex" variant="underlined" selectedKey={`${current}`}>
                        {menu.map((m) => (
                            <Tab
                                key={m.key}
                                title={
                                    <div className="flex items-center space-x-2" onClick={() => scrollTo(m.key)}>
                                        {m.icon}
                                        {m.title && <span>{m.title}</span>}
                                    </div>
                                }
                            />
                        ))}
                    </Tabs>
                    <DarkTheme />
                </NavbarContent>
            </Navbar>

            <ScrollArea className="flex-1">
                <Page id="page-c" className="bg-transparent  min-h-screen" onReveal={() => setCurrent("c")}></Page>

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
                                className="min-h-screen"
                                onReveal={() => (scrolling ? void 0 : setCurrent(m.key))}
                            >
                                {m.content}
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
                classNames={{ base: "max-w-80pc" }}
                closeButton
                className={`text-foreground bg-background`}
            >
                <DrawerContent>
                    <DrawerBody {...onSwipLeft} className="px-4 py-0">
                        <div className="flex gap-3 h-16 items-center">
                            <Button className="flex" variant="light" isIconOnly onPress={onClose}>
                                <Lucide.Menu />
                            </Button>
                            <p className="font-bold text-inherit">Honkai: Star Rail</p>
                        </div>
                        <Listbox onAction={(key) => alert(key)}>
                            {menu.map((m) => (
                                <ListboxItem key={m.key}>{m.title}</ListboxItem>
                            ))}
                        </Listbox>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

export default Navigator;
