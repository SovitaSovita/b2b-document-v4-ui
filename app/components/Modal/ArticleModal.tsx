'use client'

import { Backdrop, Fade, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { SaveNewTag } from '@/app/service/TagService';
import { useRouter } from 'next/navigation';
import CustomAlert from '../Material/CustomAlert';
import { isRender } from '@/app/service/Redux/articleDetailSlice';
import EditorCustum from '../editor/EditorCustum';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'

function UpdateArticleModal({ open, setOpen, session, articleData, handleViewArticle }: any) {
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

            <Transition appear show={open}>
                <Dialog as="div" className="relative z-50 focus:outline-none" onClose={handleClose}>
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 z-60 w-screen h-screen overflow-y-auto">
                        <div className="flex items-center justify-center">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="w-full h-screen bg-white p-6 backdrop-blur-2xl">
                                    <div className='w-full h-full overflow-scroll bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg py-6'>
                                        <EditorCustum handleClose={handleClose} session={session} articleData={articleData} tagData={articleData?.id} handleViewArticle={handleViewArticle} />
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div >
    )
}

export default UpdateArticleModal