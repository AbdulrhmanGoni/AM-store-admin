import { Box, alpha, useTheme } from '@mui/material'
import { CSSProperties } from '@mui/material/styles/createMixins'

type SmallIconBoxProps = {
    color?: string,
    icon: any,
    children?: any,
    boxStyle?: CSSProperties,
    svgIconStyle?: CSSProperties,
    svgIconSize?: number,
    disableIconColor?: boolean
}

export default function SmallIconBox(props: SmallIconBoxProps) {
    const { palette: { primary, text } } = useTheme()
    let { color = primary.main, icon, boxStyle, svgIconStyle, children, svgIconSize, disableIconColor } = props;
    return (
        <Box
            component="div"
            className='flex-center'
            sx={{
                borderRadius: "5px",
                border: `solid 1px ${text.primary}`,
                bgcolor: color,
                p: "13px", ...boxStyle,
                "& svg": {
                    width: `${svgIconSize ?? 35}px !important`,
                    height: `${svgIconSize ?? 35}px !important`,
                    ...svgIconStyle
                },
                "& :is(svg, g, path)": { fill: disableIconColor ? undefined : "white !important" }
            }}
        >
            {children ? children : icon}
        </Box>
    )
}
