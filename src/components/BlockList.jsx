import { Card, CardBody, CardFooter, CardHeader, Chip, CircularProgress } from "@nextui-org/react";
import styled from "styled-components";

const Container = styled.div`
    & .ant-card {
        width: 100%;
        max-width: 1000px;
        margin: 20px auto;
    }

    & .contribution {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 12px;
        white-space: nowrap;
        gap: 5px;
    }
`;

export default function BlockList({ c }) {
    return (
        <Container>
            {c.list.map((l) => (
                <Card className="max-w-5xl w-full mx-auto my-5 px-5 py-4">
                    <CardHeader>
                        <div className="flex-1 text-xl">{l.title}</div>
                        <div className="contribution">
                            <span>{l.progress.label}</span>
                            <CircularProgress size="lg" value={l.progress.percent} strokeWidth={4} showValueLabel={true} />
                        </div>
                    </CardHeader>
                    <CardBody className="text-sm">
                        {l.content.map((p) => (
                            <p dangerouslySetInnerHTML={{ __html: p }} />
                        ))}
                    </CardBody>
                    <CardFooter className="flex gap-2 flex-wrap">
                        {l.tags.map((t) => (
                            <Chip key={t} size="sm" variant="flat">
                                {t}
                            </Chip>
                        ))}
                    </CardFooter>
                </Card>
            ))}
        </Container>
    );
}
