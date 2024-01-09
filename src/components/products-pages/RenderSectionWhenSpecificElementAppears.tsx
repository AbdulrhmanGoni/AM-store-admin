import { useWhenElementAppears } from "@abdulrhmangoni/am-store-library";
import { useState, JSX } from "react";

interface RenderSectionWhenSpecificElementAppearsProps {
    sectionIdToAbserve: string,
    section: JSX.Element
}

export default function RenderSectionWhenSpecificElementAppears(props: RenderSectionWhenSpecificElementAppearsProps) {

    const { sectionIdToAbserve, section } = props
    const [renderSection, setRenderSection] = useState<boolean>(false);

    useWhenElementAppears(
        sectionIdToAbserve,
        () => { setRenderSection(true) },
        { scrollElementId: "app" }
    );

    return renderSection && section
}
