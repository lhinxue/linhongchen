import { Chip, Image as ReactImage } from "@heroui/react";
import { IComponent } from "../interfaces/components";
import { useState } from "react";

export default function Image({ src, alt, className, isZoomd = false, isBlurred = false }: IComponent.Image) {
    const [isFailed, set] = useState(false);
    return (
        <>
            {!isFailed && (
                <ReactImage
                    src={src}
                    onError={() => set(true)}
                    isZoomed={isZoomd}
                    isBlurred={isBlurred}
                    classNames={{ wrapper: className }}
                />
            )}
            {isFailed && (
                <div className={`flex flex-col justify-end items-center py-4 ${className}`}>
                    <Chip classNames={{ content: "opacity-70" }} variant="dot">
                        {alt}
                    </Chip>
                </div>
            )}
        </>
    );
}
