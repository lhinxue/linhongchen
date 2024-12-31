import { Corner, Root, Scrollbar, Thumb, Viewport } from "@radix-ui/react-scroll-area";
import { forwardRef, ReactNode } from "react";

function ScrollArea({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <Root className={`${className} overflow-hidden`} style={{ height: "100%" }} type="always">
            <Viewport className=" overflow-y-auto" style={{ height: "100%" }}>
                {children}
            </Viewport>
            <Scrollbar
                className="flex select-none rounded-lg bg-slate-200 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2"
                orientation="vertical"
            >
                <Thumb className="relative flex-1 rounded-[10px] bg-slate-500 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
            </Scrollbar>
            {/* <Scrollbar orientation="horizontal">
                <Thumb />
            </Scrollbar> */}
            <Corner />
        </Root>
    );
}

export default ScrollArea;
