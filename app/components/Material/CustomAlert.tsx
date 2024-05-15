import { Alert, Snackbar } from '@mui/material'
import { useRouter } from 'next/router';

import React from 'react'

export default function CustomAlert(props: any) {

    const {
        open,
        setOpen,
        type,
        message,
        duration,
        position = { vertical: "bottom", horizontal: "left" },
        handleClose = (event: any, reason: any) => {
            if (reason === 'clickaway') {
                return;
            }
            setOpen(false);
        },
    } = props


    return (
        <>
            <Snackbar
                anchorOrigin={position}
                open={open}
                autoHideDuration={duration}
                onClose={handleClose}>
                <Alert variant="filled" onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}