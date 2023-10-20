import React, { Dispatch, JSX, createContext, useState } from 'react'
import { useCookies } from 'react-cookie';

export const Context = createContext<Dispatch<React.SetStateAction<string>> | null>(null);

export default function SwitchThemeContext({ children }: { children: JSX.Element }) {
    
    const [, setMode] = useState<string>(useCookies()[0].theme ?? "dark");

    return (
        <Context.Provider value={setMode}>
            {children}
        </Context.Provider>
    )
}
