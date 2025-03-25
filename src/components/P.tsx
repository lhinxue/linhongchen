import React from "react";

interface PProps {
    children: string;
}

export default function P({ children }: PProps) {
    return <p dangerouslySetInnerHTML={{ __html: children }} />;
}
