'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { MenuData } from '../type/MenuData';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { sampleFetch } from '../service/sample';
import { useState } from 'react';

interface TagItem {
    id: number;
    title: string;
}

function SideBar({ ARTICLES, TAGS }: MenuData) {

    const [options, setOptions] = useState([]);
    const [articles, setArticles] = useState([]);

    // Function to filter articles based on tag_id
    function filterArticlesByTagId(tagId: number) {
        return ARTICLES.filter(article => article.tag_id === tagId);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4545/api/v1/DocTag/getTagByDepId?dept_id=1');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const responseData = await response.json();
                if (responseData.error === false) {
                    const data = responseData.rec;
                    setOptions(data);
                } else {
                    console.error('Error in response:', responseData.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Assuming ARTICLES is your array of articles fetched from somewhere
        const filteredArticles = ARTICLES.filter(article => options.some(option => option.id === article.tag_id));
        setArticles(filteredArticles);
    }, [options]);

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

                {/* Tag */}
                {/* <select className='select w-full max-w-xs border shadow font-semibold text-[15px]'>
                    {options.map((option, index) => (
                        <option key={index} value={option.id}>{option.title}</option>
                    ))}
                </select> */}


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


                {/* {
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
                } */}

                {options.map((tag, index) => (
                    <li key={index + 1}>
                        <details>
                            <summary className="mt-1 font-medium">{tag.title}</summary>
                            <ul>
                                {articles.filter(article => article.tag_id === tag.id).map(article => (
                                    <li key={article.id}><a className="text-[13px]">{article.title}</a></li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))}


            </ul>
        </div>
    )
}

export default SideBar