import { AddBox } from '@mui/icons-material'
import { Button, Dialog } from '@mui/material'
import { cloneElement, JSX, ReactNode, useState } from 'react'

interface OverlayWindowProps {
    children: ReactNode,
    openBtnTxt?: string,
    customBtn?: JSX.Element
}

export default function OverlayWindow({ children, openBtnTxt, customBtn }: OverlayWindowProps) {

    const [open, setOpen] = useState(false);

    return (
        <>
            {
                customBtn ? cloneElement(customBtn, { onClick: () => setOpen(true) }) : (
                    <Button
                        variant='contained'
                        size='small'
                        endIcon={<AddBox />}
                        onClick={() => setOpen(true)}
                    >
                        {openBtnTxt || "open"}
                    </Button>
                )
            }
            <Dialog open={open} onClose={() => setOpen(false)}>
                {children}
            </Dialog>
        </>
    )
}

