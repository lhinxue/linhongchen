import { Button, Drawer, DrawerBody, DrawerContent, Listbox, ListboxItem, Navbar, NavbarBrand, NavbarContent, Spacer, Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { motion, scroll } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSwipeable } from "react-swipeable";
import { create } from "zustand";

import Lucide from "../icons/Lucide";
import { useDarkTheme } from "./DarkTheme";

interface PageProps {
    id: string;
    className?: string;
    onReveal: () => void;
    children?: ReactNode;
}

interface NavigatorProps {
    title: string;
    menu: { key: string; title: string; content: ReactNode }[];
}

interface NavigatorStore {
    current: String | null;
    target: String | null;
    navigate?: (pageId: string) => void;

    setCurrent: (pageId: string | null) => void;
    setTarget: (pageId: string | null) => void;
}

const useNavigator = create<NavigatorStore>((set) => ({
    current: "cover",
    target: null,
    setTarget: (pageId) => set((state) => ({ ...state, target: pageId })),
    setCurrent: (pageId) => set((state) => ({ ...state, current: pageId })),
}));

export function Page({ children, id, className = "", onReveal = () => {} }: PageProps) {
    const { inView, ref } = useInView({
        threshold: 0.1,
    });

    const { current, target, navigate, setTarget, setCurrent } = useNavigator();

    useEffect(() => {
        if (inView) {
            // scrollTo(id);
            onReveal();
        }
    }, [inView]);

    return (
        <>
            <div id={id} ref={ref} className={`${className} w-screen`} style={{ minHeight: "150vh" }}>
                {children}
            </div>
            <Spacer />
        </>
    );
}

function Navigator({ title, menu }: NavigatorProps) {
    const { dark } = useDarkTheme();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const onSwipLeft = useSwipeable({ onSwipedLeft: () => onClose() });
    const onSwipRight = useSwipeable({ onSwipedRight: () => onOpen() });

    const { current, navigate, setTarget } = useNavigator();

    const onAppear = () => {
        return {
            opacity: 1,
            transition: { duration: 0.5 },
        };
    };

    const onDisappear = () => {
        return {
            opacity: 0,
            transition: { duration: 0.5 },
        };
    };
    const [currentPage, _currentPage] = useState(0);
    useEffect(() => {
        console.log(currentPage);
        scrollTo(`page-${currentPage}`);
    }, [currentPage]);

    const navigates = (t) => {
        scrollTo(t.replace("tab", "page"),true);
    };
    const [scrolling, _scrolling] = useState(false);

    function scrollTo(pageId: string, block=false) {
        return new Promise((resolve) => {
            const element = document.getElementById(pageId);

            if (element) {
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            observer.disconnect(); // Stop observing once the element is in view
                            _scrolling(false);
                        }
                    });
                });
                _scrolling(true);
                element.scrollIntoView({ behavior: "smooth" });
                observer.observe(element);
            }
        });
    }

    return (
        <>
            <Navbar
                className="text-foreground bg-background"
                {...onSwipRight}
                classNames={{ wrapper: "sm:px-10 px-4 ", base: " max-w-none" }}
            >
                <NavbarBrand className="flex gap-3">
                    <Button className="sm:hidden flex" variant="light" isIconOnly onPress={onOpen}>
                        <Lucide.Menu />
                    </Button>
                    <p className="font-bold text-inherit">{title}</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex" justify="end">
                    <Tabs variant="underlined" selectedKey={`tab-${currentPage}`} onSelectionChange={navigates}>
                        {menu.map((m, i) => (
                            <Tab key={`tab-${i}`} title={m.title} />
                        ))}
                    </Tabs>
                </NavbarContent>
            </Navbar>

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

            {/* <Page id="cover" className="bg-transparent" onReveal={() => _t("cover")}></Page> */}

            {/* <motion.span
                initial={onDisappear()}
                animate={current === "cover" ? onAppear() : onDisappear()}
                exit={onDisappear()}
            >
                
            </motion.span> */}
            {menu.map((m, i) => (
                <Page id={`page-${i}`} onReveal={() => (scrolling ?  void 0:_currentPage(i))}>
                    {m.content}
                </Page>
            ))}
        </>
    );
}

export default Navigator;
