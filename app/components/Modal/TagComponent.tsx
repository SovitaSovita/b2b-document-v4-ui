'use client'

import { Backdrop, Fade, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SaveNewTag } from '@/app/service/TagService';
import CustomAlert from '../Material/CustomAlert';
import { isRender } from '@/app/service/Redux/articleDetailSlice';
import { RootState } from '@/app/service/Redux/store/store';


function TagComponent({ open, setOpen, user, sendDataToParent, selectedValue, setSelectedValue }: any) {
    const handleSelectChange = (event: any) => {
        const newInputValue = event.target.value;
        setSelectedValue(parseInt(newInputValue));
    };
   
    
    
    const dispatch = useDispatch()
    const [inputVal, setInputVal] = useState<string>();
    const session: UserData = useSelector((state: RootState) => state?.article.session);
    const [isErrorAlert, setIsErrorAlert] = useState({
        open: false,
        type: "",
        message: "",
        duration: 1600,
    });
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
        if (inputVal === undefined || inputVal === "") {
            setIsErrorAlert({
                ...isErrorAlert,
                open: true,
                type: "error",
                message: "Input can not empty"
            })
        } else {
            const request = {
                dept_id: parseInt(user?.dvsn_CD, 10),
                title: inputVal,
                user_name: session?.userId,
                // status: 1,
                create_date: formattedDate,
                status: selectedValue
            }
            SaveNewTag(request).then((res: any) => {
                setInputVal('')
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "success",
                    message: "Added Successfully.",
                });
                dispatch(isRender(true));
                sendDataToParent({
                    id: res?.data?.rec.id,
                    label: res?.data?.rec.title,
                    user_id: res?.data?.rec.user_name,
                    status: res?.data?.rec.status,
                    dept_id: res?.data?.rec.dept_id,
                    create_date: Date.now(),
                    modified_date: null,
                })
                handleClose();
            })
        }
    }

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
                    <div className='w-1/3 bg-base-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg p-6 rounded-lg' style={{ width: '450px' }}>
                        <form onSubmit={handleSubmit} className='flex flex-col justify-between items-center'>
                            <div className=''>
                                {/* Left side icons */}
                                <div className='flex bg-base-100 p-3 rounded-lg'>
                                    <label className="input w-full input-bordered flex items-cent input-sm er gap-2">
                                        <input onChange={onChange} type="text" className="grow" placeholder="Enter new Tag name" />
                                    </label> 
                                    <div className='self-start'>
                                        <select
                                            value={selectedValue}
                                            onChange={handleSelectChange}
                                            className="select select-sm select-bordered w-full ml-3 max-w-40" style={{ width: '125px' }}>
                                            <option value={0}>Private</option>
                                            <option value={2}>Department</option>
                                            <option selected value={1}>Public</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Right side icons */}
                                <div className="flex" style={{ marginLeft: " 13px" }}>
                                    <div className='self-end '>
                                        <button type='button' onClick={handleClose} className="btn btn-active mt-2 btn-sm">Cancel</button>
                                        <button type='submit' onClick={handleSubmit} className="btn btn-active btn-info ml-2 btn-sm  bg-blue-500">Save</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>

        </div >
    )
}

export default TagComponent