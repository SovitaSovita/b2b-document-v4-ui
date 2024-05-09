'use client'

import Image from 'next/image'
import React from 'react'
import { MenuData } from '../type/MenuData';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { getArticleDetail } from '../service/MenuService';
import { getArticle } from '../service/Redux/articleDetailSlice';
import { useDispatch } from 'react-redux';


interface TagItem {
    id: number;
    title: string;
}

function SideBar({ ARTICLES, TAGS }: MenuData) {

    const dispatch = useDispatch();

    // Function to filter articles based on tag_id
    function filterArticlesByTagId(tagId: number) {
        return ARTICLES.filter(article => article.tag_id === tagId);
    }

    function handleViewArticle(id: string) {
        getArticleDetail(id).then((res) => {
            // console.log("res[0] >>", res);
            dispatch(getArticle(res[0]))
        })
    }

    return (
        <div className="drawer-side min-h-screen">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            {/* 4071f4 */}
            <div className="pt-6 px-6 flex flex-col">
                <div className='flex justify-between items-center pb-5'>
                    <div onClick={() => dispatch(getArticle({}))}>
                        <Image src={"https://www.kosign.com.kh/images/Vectors-Wrapper.svg"} alt="" width={100} height={80} />
                    </div>
                </div>
                <div className="css-o2c9dn mb-3"></div>

            </div>

            <ul className="menu menu-dropdown-show p-4 w-80 min-h-full text-base-content overflow-auto">
                <li className='mb-2'>
                    <details>
                        <summary className="border shadow font-semibold text-[15px]">
                            <BookmarksOutlinedIcon />
                            Favorites
                        </summary>
                        <ul className='pt-1'>
                            <li><a>test</a></li>
                        </ul>
                    </details>
                </li>

                {/* <label className="input input-bordered input-sm flex items-center gap-2 my-4">
                    <input type="text" onChange={handleOnChange} className="grow" placeholder="Enter Tag Name" />
                    <CancelOutlinedIcon className='text-[18px] text-gray-600' />
                    <CheckCircleOutlineOutlinedIcon className='text-[18px] text-blue-600' />
                </label> */}

                {
                    TAGS.length >= 0 ?
                        TAGS.map((item, index) => (
                            <li key={index + 1}>
                                <details>
                                    <summary className="mt-1 font-medium">{item.title}</summary>
                                    <ul>
                                        {filterArticlesByTagId(item.id).map(item => (
                                            <li key={item?.id} onClick={() => handleViewArticle(item.id.toString())}><a className="text-[13px]">{item?.title}</a></li>
                                        ))}
                                    </ul>
                                </details>
                            </li>
                        )) : <div className='flex justify-center items-center mt-24'>
                            <p>No Data Found</p>
                        </div>
                }



            </ul>
        </div>
    )
}

export default SideBar 