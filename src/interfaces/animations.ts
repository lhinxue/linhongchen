import { ReactNode } from "react";

export namespace IAnimation {
    export interface Default {
        children: ReactNode;
        cascade?: boolean;
        damping?: number;
        delay?: number;
        duration?: number;
        distance?: number;
        fraction?: number;
    }
}
