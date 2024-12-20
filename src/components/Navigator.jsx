import { Button, Drawer, DrawerBody, DrawerContent, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, useDisclosure } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { useSwipeable } from "react-swipeable";

import Lucid from "./Lucide";

const menuItems = [
    { key: "story", label: "故事" },
    { key: "char", label: "角色" },
    { key: "anime", label: "动画" },
];

function Navigator() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const onSwipLeft = useSwipeable({ onSwipedLeft: () => onClose() });
    const onSwipRight = useSwipeable({ onSwipedRight: () => onOpen() });
    return (
        <>
            <Navbar className="light" {...onSwipRight} classNames={{ wrapper: "sm:px-10 px-4" }}>
                <div className="dark">
                    <Text>wocaonima</Text>
                    

                    
                </div>
                <NavbarBrand className="flex gap-5">
                    <Button className="sm:hidden flex" variant="light" isIconOnly onPress={onOpen}>
                        <Lucid.Menu />
                    </Button>
                    <p className="font-bold">Honkai: Star Rail</p>
                </NavbarBrand>
                <NavbarContent className="hidden gap-8 sm:flex" justify="end">
                    {menuItems.map((m) => (
                        <NavbarItem key={m.key}>{m.label}</NavbarItem>
                    ))}
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
                classNames={{ base: "max-w-80pc bg-[rgba(255,_255,_255,_.8)]" }}
                closeButton
            >
                <DrawerContent>
                    <DrawerBody {...onSwipLeft} className="px-0 py-0">
                        <div className="flex gap-5 px-4 h-16 items-center">
                            <Button className="sm:hidden flex" variant="light" isIconOnly onPress={onClose}>
                                <Lucid.Menu />
                            </Button>
                            <p className="font-bold text-inherit">ACME</p>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Navigator;
