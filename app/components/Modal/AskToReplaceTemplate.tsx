'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

function AskToReplaceTemplate({ open, setOpen }: any) {
    const handleClose = () => {
        setOpen(false)
    };

    const handleSubmitCallback = () => {

    }

    return (
        <Transition appear show={open}>
            <Dialog as="div" className="relative z-50 focus:outline-none" onClose={handleClose}>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 z-60 overflow-y-auto">
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
                                    Hello
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AskToReplaceTemplate