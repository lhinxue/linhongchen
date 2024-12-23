import { Card, Chip } from "@nextui-org/react";
import { RiCalendar2Line } from "@remixicon/react";
import styled from "styled-components";

import FadeIn from "../animations/FadeIn";
import FadeLeft from "../animations/FadeLeft";
import FadeRight from "../animations/FadeRight";
import FadeUp from "../animations/FadeUp";

const Container = styled.div`
    max-width: 800px;
    margin: auto;

    & .title {
        font-size: 1.3em;
        /* position: absolute; */
        top: -0.25em;
        position: relative;
        margin-bottom: .25em;
    }

    & .content {
        padding: 15px 0;
    }
    & .content p {
        margin: 2px 0;
    }
`;

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 20px;
    padding-left: 20px;
    position: relative;

    /* Adjust for a continuous vertical line */
    /* &::before {
        content: "";
        position: absolute;
        left: 8px; 
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: #0072f5;
        z-index: 0;
    } */
`;

const TimelineMarker = styled.div`
    position: relative;
    width: 16px;
    height: 16px;
    background-color: white;
    border: 3px solid #0072f5;
    border-radius: 50%;
    z-index: 1;
`;
const TimelineItem = styled.div`
    margin-bottom: 30px;
    /* position: relative;
    display: flex;
    align-items: flex-start; */

    /* & > div {
        flex: 1;
    }
    &:last-child {
        margin-bottom: 0;
    } */
`;

const TimelineCard = styled(Card)`
    margin-left: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const TimelineHeader = styled(Text)`
    font-size: 18px;
    font-weight: bold;
`;

const TimelineDate = styled(Text)`
    font-size: 14px;
    color: #6c757d;
`;

const TimelineContent = styled(Text)`
    margin-top: 10px;
`;

const Item = ({ data }) => (
    <>
        <div className="Time">{data.title}</div>
        <div className="content">
            {data.content.map((p) => (
                <p dangerouslySetInnerHTML={{ __html: p }} />
            ))}
        </div>
    </>
);

export default function Timeline({ content }) {
    return (
        <Container>
            {content.events.map((e, index) => (
                <TimelineItem>
                    <FadeRight delay={500}>
                        <Chip className="italic mb-2" color="primary" variant="flat">
                            {e.timestamp}
                        </Chip>
                    </FadeRight>
                    <FadeLeft delay={500}>
                        <Card className="px-6 py-6">
                            <FadeIn>
                                <div className="title">{e.title}</div>
                            </FadeIn>
                            {e.content.length !== 0 && (
                                <div className="content">
                                    <FadeUp>
                                        {e.content.map((p) => (
                                            <p dangerouslySetInnerHTML={{ __html: p }} />
                                        ))}
                                    </FadeUp>
                                </div>
                            )}
                        </Card>
                    </FadeLeft>
                </TimelineItem>
            ))}

            <ol class="relative ">
                {content.events.map((e, index) => (
                    <li class="pb-12 ps-10 border-gray-300 border-s-3">
                            <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                {/* <RiCalendar2Line/> */}
                            </span>

                        <FadeIn>
                            <div className="title">{e.title}</div>
                        </FadeIn>
                        <FadeRight delay={500}>
                            <p class="italic block mb-2 text-sm  text-gray-400 ">
                                {e.timestamp}
                            </p>
                        </FadeRight>
                        <FadeUp>
                            {e.content.map((p) => (
                                <p
                                    class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
                                    dangerouslySetInnerHTML={{ __html: p }}
                                />
                            ))}
                        </FadeUp>
                    </li>
                ))}
            </ol>
        </Container>
    );
}
