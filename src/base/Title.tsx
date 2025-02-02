import Flip from "../animations/Flip";
import { IComponent } from "../interfaces/components";

export function PageTitle({ children }: IComponent.Default) {
    return (
        <div className="flex justify-center items-center gap-2 py-40 text-4xl font-bold">
            <Flip delay={400}>
                {(children?.toString() ?? "").split("").map((char, index) => (
                    <span key={index}>{char.toUpperCase()}</span>
                ))}
            </Flip>
        </div>
    );
}
