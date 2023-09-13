import { Tooltip } from '@mui/material';
import { useState, JSX, cloneElement } from 'react';

type SimplePopperProps = { children: JSX.Element, thePopper: string, onClick: () => void }
export default function SimplePopper({ children, thePopper, onClick }: SimplePopperProps) {
    const [title, setTitle] = useState<string>("");
    function whenClick() {
        onClick();
        setTitle(thePopper);
        setTimeout(() => { setTitle("") }, 2000);
    }
    return (
        <Tooltip title={title} open={!!title}>
            {cloneElement(children, { onClick: whenClick })}
        </Tooltip>
    );
}