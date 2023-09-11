import { Tooltip } from '@mui/material';
import { useState, JSX, cloneElement } from 'react';

export default function SimplePopper({ children, thePopper }: { children: JSX.Element, thePopper: string }) {
    const [title, setTitle] = useState<string>("");
    function onClick() {
        setTitle(thePopper)
        setTimeout(() => { setTitle("") }, 2000)
    }
    return (
        <Tooltip title={title} open={!!title}>
            {cloneElement(children, { onClick })}
        </Tooltip>
    );
}