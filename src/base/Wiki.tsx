import FadeUp from "../animations/FadeUp";
import Image from "./Image";
import { IComponent } from "../interfaces/components";

export default function Wiki({ image, content }: IComponent.Wiki) {
    return (
        <div className="max-w-3xl flex justify-between mx-auto gap-5 items-center flex-col-reverse sm:flex-row sm:items-center">
            <div className="flex-1">
                <FadeUp>
                    {content.map((p, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                </FadeUp>
            </div>
            <FadeUp delay={600}>
                <Image
                    src={image?.src}
                    alt={image?.alt}
                    isBlurred
                    className="m-auto w-[90vw] sm:w-80 min-h-[300px] max-h-[80vh] bg-background shadow-sm"
                />
            </FadeUp>
        </div>
    );
}
