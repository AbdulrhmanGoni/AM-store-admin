import { useWhenElementAppears } from "@abdulrhmangoni/am-store-library";
import { useState, JSX } from "react";

interface RenderSectionWhenSpecificElementAppearsProps {
    sectionToAbserve: string,
    section: JSX.Element
}

export default function RenderSectionWhenSpecificElementAppears(props: RenderSectionWhenSpecificElementAppearsProps) {

    const { sectionToAbserve, section } = props
    const [renderSection, setRenderSection] = useState<boolean>(false);

    useWhenElementAppears(
        sectionToAbserve,
        () => { setRenderSection(true) },
        { scrollElementId: "app" }
    );

    return renderSection && section
}
