'use client'

import { Backdrop, Box, Fade, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { SaveNewTag } from '@/app/service/TagService';
import { useRouter } from 'next/navigation';

function TagComponent({ open, setOpen, user }: any) {

    const dispatch = useDispatch()
    const [inputVal, setInputVal] = useState("");
    const router = useRouter()

    const handleClose = () => {
        setOpen(false)
    };

    const onChange = (e: any) => {
        const inputData = e.target.value;
        setInputVal(inputData);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        if (inputVal != "") {
            const request = {
                dept_id: parseInt(user?.dvsn_CD, 10),
                title: inputVal,
                user_id: 28, //sak user ID
                status: 1,
                create_date: formattedDate
            }
            // console.log("req >> ", request);

            SaveNewTag(request).then((res: any) => {
                setInputVal("")
                handleClose();
                router.push("/vanda/article")
            })
        }
        else {
            alert("Tag title can't b empty")
        }
    }

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
                    <div className='w-1/3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg p-5 rounded-lg'>
                        <form onSubmit={handleSubmit} className='flex flex-col justify-between items-center'>
                            <label className="input w-full input-bordered flex items-cent input-sm er gap-2">
                                <input onChange={onChange} type="text" className="grow" placeholder="Enter new Tag name" />
                            </label>
                            <div className='self-end'>
                                <button type='button' onClick={handleClose} className="btn btn-active mt-2 btn-sm">Cancel</button>
                                <button type='submit' className="btn btn-active btn-primary ml-2 btn-sm">Save</button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div >
    )
}

export default TagComponent