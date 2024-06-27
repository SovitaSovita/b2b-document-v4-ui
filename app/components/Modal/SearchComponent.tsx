'use client'

import { getArticleDetail, searchArticle } from '@/app/service/ArticleService';
import { Backdrop, Box, Fade, Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import empty_folder from '../../../public/icon/empty-folder.png'
import Image from 'next/image';
import { getArticle } from '@/app/service/Redux/articleDetailSlice';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import '../../style/search_style.css'

function SearchComponent({ open, setOpen }: any) {

    const [recentData, setRecentData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [focus, setFocus] = useState(false);
    const [data, setData] = useState<SearchType[]>([]);
    const dispatch = useDispatch()

    useEffect(() => {
        getRecentSearch()
        if (focus) setFocus(false)
        else setFocus(true)
    }, [open])

    const onChange = (e: any) => {
        const inputData = e.target.value;
        if (inputData.length < 1) {
            setSearchData([])
            return;
        }
        searchArticle(inputData).then((data) => {
            setSearchData(data);
        })
    }

    const handleClose = () => {
        setOpen(false)
        setSearchData([])
    };

    function handleViewArticle(id: string) {
        getArticleDetail(id).then((res: any) => {
            dispatch(getArticle(res.rec))
            addRecentSearch(res.rec)
            handleClose()
        })
    }
    const stripHtmlTags = (html: string): string => {
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    };
  
    function addRecentSearch(searchData: any) {
        if (typeof window !== 'undefined') {
            var recentData = JSON.parse(localStorage.getItem('recentData') as any) || [];
            var isDuplicate = recentData.some((item: any) => item?.id === searchData?.id);
            if (!isDuplicate) {
                recentData.push(searchData);
                if (recentData.length > 10) {
                    recentData = recentData.slice(recentData.length - 10);
                }
                localStorage.setItem('recentData', JSON.stringify(recentData));
                getRecentSearch()
            }
        }
    }


    function getRecentSearch() {
        const getRecentSearch = JSON.parse(localStorage.getItem('recentData') as any) || [];
        setRecentData(getRecentSearch);
    }

    function removeRecentSearch(searchDataId: any) {
        var recentData = JSON.parse(localStorage.getItem('recentData') as any) || [];

        // Find the index of the item 
        var indexToRemove = recentData.findIndex((item: any) => item?.id === searchDataId);

        // If exists -> remove
        if (indexToRemove !== -1) {
            recentData.splice(indexToRemove, 1);
            localStorage.setItem('recentData', JSON.stringify(recentData));
            getRecentSearch()
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
                    <div className='w-1/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg' style={{ width: '650px' }}>
                        <div className="group bg-base-100 rounded-lg">
                            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                            <input onChange={onChange} placeholder="Search here" type="search" className="inputSearch bg-base-100 rounded-lg" />
                        </div>

                        <div className='bg-base-100 rounded-lg p-4 mt-1 pt-3'>
                            <ul className="mt-1 h-[400px] overflow-auto">
                                {
                                    searchData.length <= 0 ?
                                        (
                                            <div className='h-full'>
                                                <h2 className='mb-3 font-semibold'>Recent:</h2>
                                                {
                                                    recentData.length > 0 ?
                                                        (
                                                            recentData.map((item: SearchType) => (
                                                                <li key={item?.id} className=''>
                                                                    <div key={item?.id} className='flex items-center justify-between py-2 pl-3 pr-1 hover:bg-base-200 text-sm rounded-lg cursor-pointer'>
                                                                        <a className='flex justify-between w-[97%]' onClick={() => handleViewArticle(item.id.toString())}>
                                                                            <div className='line-clamp-1 '>{item?.title}</div>
                                                                        </a>
                                                                        <div className='text-center rounded-full' onClick={() => removeRecentSearch(item?.id)}>
                                                                            <CloseIcon />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        ) :
                                                        (
                                                            < div className='h-full flex flex-col justify-center items-center'>
                                                                <Image src={empty_folder} alt="empty" width={80} height={80} />
                                                                No Data
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        ) :
                                        (
                                            <li className='h-full'>
                                                <h2 className="mb-3 font-semibold">Search Result:</h2>
                                                <ul>
                                                    {
                                                        searchData.map((item: SearchType) => {
                                                            return (
                                                                <div>
                                                                    <h1 dangerouslySetInnerHTML={{__html:item.tag_title}}></h1>
                                                                     <p dangerouslySetInnerHTML={{__html:item.title}}></p>
                                                                    <p dangerouslySetInnerHTML={{__html:item.content_body}}></p>  
                                                                </div>
                                                            )
                                                        }
                                                        )
                                                    }
                                                    {/* {
                                                        searchData.map((item: SearchType) => (
                                                            <li key={item.id} className='py-2 px-3 hover:bg-neutral hover:text-base-300 text-sm rounded-lg cursor-pointer'>
                                                                <div key={item?.id} className='flex justify-between'>
                                                                    <a className='flex justify-between w-[97%]' onClick={() => handleViewArticle(item.id.toString())}>
                                                                        <div className='line-clamp-1 '>{item?.title}</div>
                                                                    </a>
                                                                </div>
                                                            </li>
                                                        ))
                                                    } */}
                                                </ul>
                                            </li>
                                        )
                                }
                            </ul>
                        </div>
                    </div>
                </Fade >
            </Modal >
        </div >
    )
}

export default SearchComponent