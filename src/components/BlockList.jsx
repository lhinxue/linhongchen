import { Card, CardBody, CardFooter, CardHeader, Chip } from "@nextui-org/react";
import styled from "styled-components";

import FadeUp from "../animations/FadeUp";
import Progress from "./Progress";

const Container = styled.div`
    & .ant-card {
        width: 100%;
        max-width: 1000px;
        margin: 20px auto;
    }
`;

export default function BlockList({ c }) {
    return (
        <Container>
            {c.list.map((l) => (
                <FadeUp>
                    <Card className="max-w-5xl w-full mx-auto my-5">
                        <CardHeader className="px-4 py-4">
                            <div className="flex-1 text-xl">{l.title}</div>
                            <Progress label={l.progress.label} value={l.progress.percent} />
                        </CardHeader>
                        <CardBody className="text-sm px-4 py-2">
                            {l.content.map((p) => (
                                <p dangerouslySetInnerHTML={{ __html: p }} />
                            ))}
                        </CardBody>
                        <CardFooter className="flex gap-2 flex-wrap px-4 py-5">
                            {l.tags.map((t) => (
                                <Chip key={t} size="sm" variant="flat">
                                    {t}
                                </Chip>
                            ))}
                        </CardFooter>
                    </Card>
                </FadeUp>
            ))}
        </Container>
    );
}
