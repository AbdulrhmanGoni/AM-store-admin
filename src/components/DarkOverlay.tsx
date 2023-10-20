import { CSSProperties } from 'react'

export default function DarkOverlay({ children, style }: { children?: JSX.Element | string | number, style?: CSSProperties }) {

    const overlayStyle: CSSProperties = {
        backgroundColor: "#00000054",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 10,
        ...style
    }

    return (
        <div className='flex-center' style={overlayStyle}>
            {children}
        </div>
    )
}
