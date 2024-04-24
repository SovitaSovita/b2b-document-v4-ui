import Image from 'next/image'
import React from 'react'
import { MenuData } from '../type/MenuData';

function SideBar({ ARTICLES, TAGS }: MenuData) {

    // Function to filter articles based on tag_id and id
    function filterArticlesByTagId(tagId: number) {
        return ARTICLES.filter(article => article.tag_id === tagId);
    }

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            {/* 4071f4 */}
            <ul className="menu menu-dropdown-show bg-white p-4 w-80 min-h-full text-base-content overflow-auto">
                <div className="pt-3 pb-5 pl-3 flex items-center">
                    <Image src={"https://www.kosign.com.kh/images/Vectors-Wrapper.svg"} alt="" width={140} height={100} />
                    {/* <span className="font-extrabold inline-flex text-base-content text-md md:text-xl font-Anton ml-2">
              B2B <span className="text-blue-700 ml-1">DOC</span></span> */}
                </div>
                {
                    TAGS.map((item, index) => (
                        <li key={index}>
                            <details>
                                <summary className="mt-1 font-medium">{item.title}</summary>
                                <ul>
                                    {filterArticlesByTagId(item.id).map(item => (
                                        <li><a className="text-[13px]">{item.title}</a></li>
                                    ))}
                                </ul>
                            </details></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SideBar