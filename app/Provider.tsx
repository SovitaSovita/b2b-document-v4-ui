'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './service/Redux/store/store';

interface Props {
    children: ReactNode
}

function Provider({ children }: Props) {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>
                {children}
            </ReduxProvider >
        </SessionProvider>
    )
}

export default Provider