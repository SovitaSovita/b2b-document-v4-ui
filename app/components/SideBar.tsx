'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { MenuData } from '../type/MenuData';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import { sampleFetch } from '../service/sample';
import { useState } from 'react';
import { getArticleDetail } from '../service/MenuService';

import { getArticle, getFavorite, isFavorite } from '../service/Redux/articleDetailSlice';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { fontGrid } from '@mui/material/styles/cssUtils';
import EditorCustum from './editor/EditorCustum';
import { DeleteIcon, EditIcon } from '@/public/icon/TableIcon';
import empty_folder from '../../public/icon/empty-folder.png'
import UpdateTagComponent from './Modal/UpdateTagComponent';
import { checkIsFavorite, getFavoriteDetail } from '../service/FavouriteService';


interface TagItem {
    id: number;
    title: string;
}

interface FavoriteItem {
    user_id: number;
}

function SideBar({ ARTICLES, TAGS, FAVORITE }: MenuData) {
    const { data: session, status }: { data: any, status: any } = useSession();
    const [activeItemId, setActiveItemId] = useState("");


    //const handleOpenTag = () => setOpenTag(true);
    const [openTag, setOpenTag] = React.useState(false);
    const handleOpenTag = () => setOpenTag(true);


    const dispatch = useDispatch();

    // Function to filter articles based on tag_id
    function filterArticlesByTagId(tagId: number) {
        return ARTICLES.filter(article => article.tag_id === tagId);
    }

    function handleViewArticle(id: string) {
        getArticleDetail(id).then((res) => {
            // console.log("res[0] >>", res);
            dispatch(getArticle(res[0]))
            setActiveItemId(id);
        })
        // favorite
        checkIsFavorite(session.user.userId, parseInt(id, 10), session.user.dvsn_CD).then((data) => {

            if (data != null) {
                dispatch(isFavorite(true))
            }
            else {
                dispatch(isFavorite(false))
            }

        })


    }


    console.log(FAVORITE)


    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            {/* 4071f4 */}
            <ul className="menu menu-dropdown-show p-4 w-80 bg-primary min-h-full text-base-content overflow-auto">
                <div className="pt-3 pb-5 pl-3 flex justify-center items-center">
                    <Image src={"https://www.kosign.com.kh/images/Vectors-Wrapper.svg"} alt="" width={140} height={100} />
                    {/* <span className="font-extrabold inline-flex text-base-content text-md md:text-xl font-Anton ml-2">
              B2B <span className="text-blue-700 ml-1">DOC</span></span> */}
                </div>

                <div className="css-o2c9dn mb-3"></div>

                {/* Favorite */}
                <li className='mb-2'>
                    <details>
                        <summary className="border shadow font-semibold text-[15px]">
                            <BookmarksOutlinedIcon />
                            Favorites
                        </summary>
                        <ul className='pt-1'>
                            {FAVORITE?.map((item: any, index) => (
                                <li key={index + 1} onClick={() => { console.log(item.article_id); handleViewArticle(item?.article_id.toString()) }}>
                                    <a className="text-[13px]">{item?.title}</a>
                                </li>
                            ))}
                        </ul >
                    </details >
                </li >

                {
                    TAGS?.length > 0 ?
                        TAGS.map((item, index) => (
                            <li key={index + 1}>
                                <details>
                                    <summary className="mt-1 font-medium">{item.title}</summary>
                                    <ul>
                                        {
                                            filterArticlesByTagId(item.id).length > 0 ?
                                                filterArticlesByTagId(item.id).map(item => (
                                                    <li key={item?.id} onClick={() => handleViewArticle(item.id.toString())}>
                                                        <a className={activeItemId === item.id.toString() ? "bg-secondary text-neutral mt-2" : "mt-2"}>{item?.title}</a>
                                                    </li>
                                                )) : (
                                                    <div className='cursor-default flex flex-col justify-center items-center'>
                                                        <div>
                                                            <Image src={empty_folder} alt="no data" height={40} />
                                                        </div>
                                                        <p className='text-xs text-base-content'>No Article</p>
                                                    </div>
                                                )
                                        }
                                    </ul>
                                </details>
                            </li>
                        )) : <div className='flex justify-center items-center mt-24'>
                            <p>No Data Found</p>
                        </div>
                }
            </ul >

            <UpdateTagComponent />
        </div >
    )
}

export default SideBar 