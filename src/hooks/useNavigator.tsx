import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface NavigatorState {
    current: string;
    scrolling: boolean;
    setCurrent: (id: string) => void;
    scrollTo: (id: string) => Promise<void>;
}

const useNavigator = create<NavigatorState>()(
    subscribeWithSelector((set) => ({
        current: "cover",
        scrolling: false,
        setCurrent: (id: string) => set(() => ({ current: id })),
        scrollTo: (id: string) =>
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

export default useNavigator;
