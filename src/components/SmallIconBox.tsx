import { Box, alpha, useTheme } from '@mui/material'
import { CSSProperties } from '@mui/material/styles/createMixins'

type SmallIconBoxProps = {
    color?: string,
    icon: any,
    children?: any,
    boxStyle?: CSSProperties
    svgIconStyle?: CSSProperties
}

export default function SmallIconBox(props: SmallIconBoxProps) {
    const { palette: { primary } } = useTheme()
    let { color = primary.main, icon, boxStyle, svgIconStyle, children } = props;
    return (
        <Box
            component="div"
            className='flex-center'
            sx={{
                p: "13px", borderRadius: "5px",
                border: `solid 1px ${color}`,
                bgcolor: alpha(color, .5),
                ...boxStyle,
                "& svg": {
                    width: "1.2em",
                    height: "1.2em",
                    ...svgIconStyle
                },
                "& :is(svg, g, path)": {
                    fill: "white !important"
                }
            }}
        >
            {children ? children : icon}
        </Box>
    )
}
