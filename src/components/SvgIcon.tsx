import { useTheme, Box } from '@mui/material'

type iconComponentProps = {
    svgElementAsString: string,
    width?: number,
    height?: number,
    color?: string,
    disableIconColor?: boolean
}

export default function Icon({ svgElementAsString, disableIconColor, width = 35, height = 35, color }: iconComponentProps) {

    const { palette: { primary: { main } } } = useTheme();

    return (
        <Box
            sx={{
                "& > svg": { width, height },
                "& :is(svg, g, path)": { fill: disableIconColor ? undefined : color ?? main },
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            dangerouslySetInnerHTML={{ __html: svgElementAsString }}
        />
    )
}
