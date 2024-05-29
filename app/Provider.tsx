'use client'
import React, { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './service/Redux/store/store';

interface Props {
    children: ReactNode
}

function Provider({ children }: Props) {
    return (
        <ReduxProvider store={store}>
            {children}
        </ReduxProvider >
    )
}

export default Provider