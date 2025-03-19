import { Corner, Root, Scrollbar, Thumb, Viewport } from "@radix-ui/react-scroll-area";
import "./ScrollArea.css";

function ScrollArea({ children, className = "", ...props }) {
    return (
        <Root className={`${className} overflow-hidden`} style={{ height: "100%" }} type="always" {...props}>
            <Viewport className=" overflow-y-auto" style={{ height: "100%" }}>
                {children}
            </Viewport>
            <Scrollbar className="radix-scrollbar" orientation="vertical">
                <Thumb className="radix-scrollbar-thumb" />
            </Scrollbar>
            <Corner />
        </Root>
    );
}

export default ScrollArea;
