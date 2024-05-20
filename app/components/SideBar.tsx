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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fontGrid } from '@mui/material/styles/cssUtils';
import EditorCustum from './editor/EditorCustum';
import { DeleteIcon, EditIcon } from '@/public/icon/TableIcon';
import empty_folder from '../../public/icon/empty-folder.png'
import UpdateTagComponent from './Modal/UpdateTagComponent';
import { checkIsFavorite, getFavoriteDetail } from '../service/FavouriteService';
import logoDocument from "../../public/icon/Document.png"
import { DeleteTag } from '../service/TagService';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import DeleteTagComponent from './Modal/DeleteTagComponent';
import UpdateArticleModal from './Modal/UpdateArticleModal';
import DepartmentDoc from './SideBar/DepartmentDoc';
import { Button, Drawer, Typography, styled } from '@mui/material';

const drawerWidth = 320;

function SideBar(props: any) {
    const { ARTICLES, TAGS, FAVORITE }: MenuData = props
    const { handleDrawerClose, openMainDrawer }: any = props
    console.log("LAST>>>",TAGS)
    const { data: session, status }: { data: any, status: any } = useSession();
    const [activeItemId, setActiveItemId] = useState("");


    //const handleOpenTag = () => setOpenTag(true);
    const [openTag, setOpenTag] = React.useState(false);
    const [openTags, setOpenTags] = React.useState(false);
    const [tagUpdateData, setTagUpdateData] = React.useState({});
    const [tagData , settagData] = React.useState({})
    const [tagDeleteData, setTagDeleteData] = React.useState({});


    const handleOpenTag = (item: any) => {
        setTagUpdateData(item)
        setOpenTag(true)
    };
    const handleDelete = (item: any) => {
        setTagDeleteData(item)
        setOpenTags(true)
    }
    const dispatch = useDispatch();

    // Function to filter articles based on tag_id
    function filterArticlesByTagId(tagId: number) {
        return ARTICLES.filter(article => article.tag_id === tagId);
    }

    function handleViewArticle(id: string) {
        getArticleDetail(id).then((res) => {
            dispatch(getArticle(res?.rec[0]))
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

    const [openArticle, setOpenArticle] = React.useState(false);
    const handleOpenArticle = () => setOpenArticle(true);

    return (
        <Drawer sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
        }}
            variant="persistent"
            anchor="left"
            open={openMainDrawer}>
            <ul className="menu menu-dropdown-show p-4 w-full bg-primary text-base-content">
                <div className="p-2 bg-base-100 border rounded-lg flex justify-between">
                    <div className='flex items-center'>
                        <Image src={logoDocument} alt="" width={40} />
                        <span className="inline-flex tracking-widest flex-col font-semibold text-gray-600 text-md font-Poppin ml-2">
                            <span>DOCUMENT</span>
                            <span className='text-xs font-thin'>v4.0</span>
                        </span>
                        {/* <Button onClick={handleDrawerClose}>Open drawer</Button> */}
                    </div>
                    <div onClick={handleOpenArticle} className="tooltip tooltip-secondary tooltip-left cursor-pointer" data-tip="New Article">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="icon-xl-heavy text-gray-600"><path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path></svg>
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
                        {FAVORITE && FAVORITE.length > 0 ? (
                            <ul className='pt-1'>
                                {FAVORITE.map((item: any, index) => (
                                    <li key={index} onClick={() => {
                                        console.log(item.article_id);
                                        handleViewArticle(item?.article_id.toString());
                                    }}>
                                        <a className="text-[13px]">{item?.title}</a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className='pt-1'>
                                <li>
                                    <a className="text-[13px]" style={{ cursor: 'none', pointerEvents: 'none' }}>No favorite</a>
                                </li>
                            </ul>

                        )}
                    </details >
                </li >

                {/* <li className='mb-2'>
                    <label htmlFor="department_drawer" className='drawer-button border bg-base-100 font-semibold text-[15px] font-mono'>
                        <ContactPageOutlinedIcon className='text-[18px]' />
                        Department
                    </label>
                </li>
                <DepartmentDoc
                    filterArticlesByTagId={filterArticlesByTagId}
                    TAGS={TAGS}
                    handleViewArticle={handleViewArticle}
                    handleOpenTag={handleOpenTag}

                /> */}

                {/* <li className='mb-2'>
                    <label htmlFor="department_drawer" className='drawer-button border bg-base-100 font-semibold text-[15px] font-mono'>
                        <ContactPageOutlinedIcon className='text-[18px]' />
                        Public
                    </label>
                </li> */}

                {
                    TAGS.map((item, index) => (
                        <span className='flex mainManageTag group'>
                            <div className='w-6'>
                                <div className="dropdown dropdown-hover dropdown-top mt-2.5 opacity-0 hidden group-hover:block group-hover:opacity-100 transition-all">
                                    <div tabIndex={0} role="button">
                                        <MoreVertIcon />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                        <li>
                                            <div className='flex items-center' onClick={() => handleOpenTag(item)}>
                                                <EditIcon />
                                                <span>Edit</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='flex items-center text-red-400' onClick={() => handleDelete(item)}>
                                                <DeleteIcon />
                                                <span>Detele</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <li key={index + 1} className='min-w-[260px]'>
                                <details>
                                    <summary className="mt-1 font-medium">
                                        {item.title}
                                    </summary>
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
   


                        </span>
                    ))
                }
            </ul >
            <UpdateTagComponent open={openTag} setOpen={setOpenTag} tagUpdateData={tagUpdateData} />
            <UpdateArticleModal open={openArticle} setOpen={setOpenArticle} session={session} articleData={null} />
        </Drawer>

    )
}
export default SideBar