'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { MenuData } from '../../type/MenuData';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useState } from 'react';
import { getArticleDetail } from '../../service/MenuService';

import { getArticle, isFavorite } from '../../service/Redux/articleDetailSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteIcon, EditIcon } from '@/public/icon/TableIcon';
import empty_folder from '../../../public/icon/empty-folder.png'
import UpdateTagComponent from '../Modal/UpdateTagComponent';
import { checkIsFavorite } from '../../service/FavouriteService';
import DeleteTagComponent from '../Modal/DeleteTagComponent';
import UpdateArticleModal from '../Modal/UpdateArticleModal';
import { Drawer } from '@mui/material';
import HeaderSidebar from './HeaderSidebar';
import { RootState } from '@/app/service/Redux/store/store';

const drawerWidth = 320;

function SideBar(props: any) {
    const { ARTICLES, TAGS, FAVORITE }: MenuData = props
    const { handleDrawerClose, openMainDrawer }: any = props

    const { data: session, status }: { data: any, status: any } = useSession();
    const [activeItemId, setActiveItemId] = useState("");


    //const handleOpenTag = () => setOpenTag(true);
    const [openTag, setOpenTag] = React.useState(false);
    const [tagUpdateData, setTagUpdateData] = React.useState({});
    const [tagDeleteData, setTagDeleteData] = React.useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (item: any) => {
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);

    const handleOpenTag = (item: any) => {
        setTagUpdateData(item)
        setOpenTag(true)
    };
    const handleDelete = (item: any) => {
        DeleteTagComponent
        //setOpenTag(true)
    }
    // const handleDelete = (e: any) => {
    //     //setTagDeleteData(item)
    //     const request ={
    //         //id:tagDeleteData.id
    //     }
    //     DeleteTag(request).then((res:any)=>{
    //     })
    // }
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

    //open modal to insert or update article
    const [openArticle, setOpenArticle] = React.useState(false);
    const handleOpenArticle = () => setOpenArticle(true);

    const isMode_theme = useSelector((state: RootState) => state?.article.isMode);
    const [bg_color, setBg_color] = useState("");
    useEffect(() => {
        if (localStorage.getItem("mode") === "light") {
            setBg_color("rgb(246, 248, 252)")
        }
        else {
            setBg_color("oklch(0.232607 0.013807 253.101)")
        }
    }, [isMode_theme])

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: bg_color
                },
            }}
            variant="persistent"
            anchor="left"
            open={openMainDrawer}>
            <ul className="menu menu-dropdown-show p-4 w-full bg-primary text-base-content">
                <HeaderSidebar handleOpenArticle={handleOpenArticle} />

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

                {
                    TAGS.map((item, index) => (
                        <span key={index} className='flex mainManageTag group'>
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
                                            <div className='flex items-center text-red-400' onClick={() => openModal(item)}>
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