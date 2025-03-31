import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Title from "./Title";
import "./Page.css";

interface PageProps {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    onReveal?: (id?: string) => void;
    h1?: string;
    h2?: string[];
    headerContent?: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children, id, className = "", onReveal = () => {}, h1, h2, headerContent }) => {
    const { inView, ref } = useInView({ threshold: 0.05 });

    useEffect(() => {
        if (inView) onReveal(id);
    }, [inView]);

    return (
        <>
            <div id={id} ref={ref} className={`page ${className}`}>
                {h1 && (
                    <div className="page-header">
                        <Title h1={h1} h2={h2} />
                        {headerContent}
                    </div>
                )}
                <div className="page-content">{children}</div>
            </div>
        </>
    );
};

export default Page;
