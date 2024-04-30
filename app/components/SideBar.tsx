'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { MenuData } from '../type/MenuData';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { sampleFetch } from '../service/sample';

function SideBar({ ARTICLES, TAGS }: MenuData) {

    // Function to filter articles based on tag_id
    function filterArticlesByTagId(tagId: number) {
        return ARTICLES.filter(article => article.tag_id === tagId);
    }

    useEffect(() => {
        // //client side fetching
        // sampleFetch().then((res) => {
        //     console.log("response :: ", res)
        // })
    }, []);

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            {/* 4071f4 */}
            <ul className="menu menu-dropdown-show p-4 w-80 min-h-full text-base-content overflow-auto">
                <div className="pt-3 pb-5 pl-3 flex justify-center items-center">
                    <Image src={"https://www.kosign.com.kh/images/Vectors-Wrapper.svg"} alt="" width={140} height={100} />
                    {/* <span className="font-extrabold inline-flex text-base-content text-md md:text-xl font-Anton ml-2">
              B2B <span className="text-blue-700 ml-1">DOC</span></span> */}
                </div>
                <div className="css-o2c9dn mb-3"></div>
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
                {
                    TAGS.map((item, index) => (
                        <li key={index + 1}>
                            <details>
                                <summary className="mt-1 font-medium">{item.title}</summary>
                                <ul>
                                    {filterArticlesByTagId(item.id).map(item => (
                                        <li key={item?.id}><a className="text-[13px]">{item?.title}</a></li>
                                    ))}
                                </ul>
                            </details>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SideBar 