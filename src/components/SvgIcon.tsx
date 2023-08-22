import { useTheme, Box } from '@mui/material'

type iconComponentProps = {
    svgElementAsString: string,
    width?: number,
    height?: number,
}

export default function Icon({ svgElementAsString, width = 35, height = 35 }: iconComponentProps) {

    const { palette: { primary: { main } } } = useTheme()

    return (
        <Box sx={{
            "& > svg": { width, height, fill: main },
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
            dangerouslySetInnerHTML={{ __html: svgElementAsString }}
        />
    )
}
