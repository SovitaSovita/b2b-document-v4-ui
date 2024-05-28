'use client'

import { Backdrop, Fade, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { SaveNewTag } from '@/app/service/TagService';
import { useRouter } from 'next/navigation';
import CustomAlert from '../Material/CustomAlert';
import { isRender } from '@/app/service/Redux/articleDetailSlice';
import EditorCustum from '../editor/EditorCustum';

function UpdateArticleModal({ open, setOpen, session, articleData }: any) {
    const dispatch = useDispatch()
    const [inputVal, setInputVal] = useState<string>();
    const router = useRouter()
    const [isErrorAlert, setIsErrorAlert] = useState({
        open: false,
        type: "",
        message: "",
        duration: 1600,
    });

    const handleClose: any = () => {
        setOpen(false)
    };

    return (
        <div>
            <CustomAlert
                open={isErrorAlert.open}
                setOpen={(open: boolean) => {
                    setIsErrorAlert({ ...isErrorAlert, open });
                }}
                message={isErrorAlert.message}
                type={isErrorAlert.type}
                duration={isErrorAlert.duration}
            />
            {/* The button to open modal */}
            {/* Put this part before </body> tag */}
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
                    <div className='w-full h-full overflow-scroll bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg py-6'>
                        <EditorCustum handleClose={handleClose} session={session} articleData={articleData} tagData={articleData?.id} />
                    </div>
                </Fade>
            </Modal>
        </div >
    )
}

export default UpdateArticleModal