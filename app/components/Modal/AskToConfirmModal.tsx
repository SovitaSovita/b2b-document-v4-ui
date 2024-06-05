'use client'

import { Backdrop, Box, Fade, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

function AskToConfirmModal({ open, setOpen, handleSubmitCallback }: any) {
    const handleClose = () => {
        setOpen(false)
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <div className='w-1/4 bg-base-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg p-5 rounded-lg'>

                        <h3 className="text-base/7 font-medium">
                            Are you sure you want to delete this article?
                        </h3>
                        <p className="mt-2 text-sm/6">
                            This action will delete your articel post.<br></br> You can not undo this action.
                        </p>
                        <form className='flex flex-col justify-between items-center'>
                            <div className='self-end'>
                                <button type='button' onClick={handleClose} className="btn btn-active mt-2 btn-sm">Cancel</button>
                                <button type='button' onClick={handleSubmitCallback} className="btn btn-active btn-error ml-2 mt-3 btn-sm">Delete</button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div >
    )
}

export default AskToConfirmModal