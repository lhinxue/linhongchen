import React, { FC } from "react";
import { Corner, Root, Scrollbar, Thumb, Viewport } from "@radix-ui/react-scroll-area";
import "./ScrollArea.css";

type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof Root> & {
    children: React.ReactNode;
    className?: string;
};

const ScrollArea: FC<ScrollAreaProps> = ({ children, className = "", ...props }) => {
    return (
        <Root className={`${className} radix-scrollbar-root`} type="always" {...props}>
            <Viewport className="radix-scrollbar-viewport">{children}</Viewport>
            <Scrollbar className="radix-scrollbar" orientation="vertical">
                <Thumb className="radix-scrollbar-thumb" />
            </Scrollbar>
            <Corner />
        </Root>
    );
};

export default ScrollArea;
