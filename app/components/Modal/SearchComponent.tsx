'use client'

import { searchArticle } from '@/app/service/ArticleService';
import { Backdrop, Box, Fade, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import empty_folder from '../../../public/icon/empty-folder.png'
import Image from 'next/image';
import { getArticleDetail } from '@/app/service/MenuService';
import { getArticle } from '@/app/service/Redux/articleDetailSlice';
import { useDispatch } from 'react-redux';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 20,
    boxShadow: 24,
};

function SearchComponent({ handleOpen, open, setOpen }: any) {

    const [searchData, setSearchData] = useState([]);
    const dispatch = useDispatch()

    const onChange = (e: any) => {
        const inputData = e.target.value;

        searchArticle(inputData).then((res) => {
            if (res) {
                setSearchData(res);
            }
        })
    }

    const handleClose = () => {
        setOpen(false)
        setSearchData([])
    };


    function handleViewArticle(id: string) {
        getArticleDetail(id).then((res) => {
            dispatch(getArticle(res[0]))
            handleClose()
        })
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
                    <div className='w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg'>
                        <input onChange={onChange} type="text" placeholder="Search here" className="input w-full" />

                        <div className='bg-base-200 rounded-lg'>
                            <ul className="menu mt-1 h-[400px] overflow-auto">
                                {
                                    searchData.length <= 0 ? (
                                        <div className='h-full flex flex-col justify-center items-center'>
                                            <Image src={empty_folder} alt="empty" width={80} />
                                            No Data
                                        </div>
                                    ) : (
                                        <li>
                                            <h2 className="">result:</h2>
                                            <ul>
                                                {
                                                    searchData.map((item: SearchType) => (
                                                        <li onClick={() => handleViewArticle(item.id.toString())} key={item.id}><a>{item?.title}</a></li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    )
}

export default SearchComponent