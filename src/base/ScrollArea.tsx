import { Corner, Root, Scrollbar, Thumb, Viewport } from "@radix-ui/react-scroll-area";
import { IComponent } from "../interfaces/components";


function ScrollArea({ children, className = "" }: IComponent.Default) {
    return (
        <Root className={`${className} overflow-hidden`} style={{ height: "100%" }} type="always">
            <Viewport className=" overflow-y-auto" style={{ height: "100%" }}>
                {children}
            </Viewport>
            <Scrollbar className="w-3" orientation="vertical">
                <Thumb className="m-1 rounded-lg bg-slate-900 bg-opacity-30 dark:bg-gray-50 dark:bg-opacity-60" />
            </Scrollbar>
            <Corner />
        </Root>
    );
}

export default ScrollArea;
