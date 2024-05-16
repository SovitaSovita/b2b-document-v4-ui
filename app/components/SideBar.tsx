'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { MenuData } from '../type/MenuData';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
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
import logoDocument from "../../public/icon/Document.png"


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
                <div className="p-2 bg-base-100 border rounded-lg">
                    <div className='flex items-center'>
                        <Image src={logoDocument} alt="" width={40} />
                        <span className="inline-flex tracking-widest flex-col font-semibold text-gray-600 text-md font-Poppin ml-2">
                            <span>DOCUMENT</span>
                            <span className='text-xs font-thin'>v4.0</span>
                        </span>
                    </div>
                </div>

                <div className="css-o2c9dn my-6"></div>

                {/* Favorite */}
                <li className='mb-2'>
                    <details>
                        <summary className="border bg-base-100 font-semibold text-[15px] font-mono">
                            <FavoriteBorderOutlinedIcon className='text-[18px]' />
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
                    TAGS.map((item, index) => (
                        <span style={{ width: '160px', display: 'inline-flex' }}>
                            <li key={index + 1} >
                                <details>
                                    <summary className="mt-1 font-medium hover:bg-base-100">{item.title}</summary>
                                    <ul>
                                        {
                                            filterArticlesByTagId(item.id).length > 0 ?
                                                filterArticlesByTagId(item.id).map(item => (
                                                    <li key={item?.id} onClick={() => handleViewArticle(item.id.toString())}>
                                                        <a className={activeItemId === item.id.toString()
                                                            ? "hover:bg-base-100 bg-base-100 border-r-4 border-secondary rounded-none mt-2"
                                                            : "hover:bg-base-100 hover:border-l-4 border-secondary rounded-none transition-all mt-2"}>
                                                            {item?.title}
                                                        </a>
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
                            <li>
                                <div className='btn btn-ghost btn-circle' onClick={handleOpenTag}>
                                    <EditIcon />
                                </div>
                            </li>
                            <li>
                                <div className='btn btn-ghost btn-circle'>
                                    <DeleteIcon />
                                </div>
                            </li>


                        </span>

                    ))

                }
            </ul >

            <UpdateTagComponent open={openTag} setOpen={setOpenTag} user={TAGS} />
        </div >
    )
}

export default SideBar 