import React, { useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import Page from '../(root)/vanda/page';

import LeftDrawerCustom from './Profile/LeftDrawerCustom'
import { useSelector } from 'react-redux';
import { RootState } from '../service/Redux/store/store';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Profile from './Profile/Profile';
import ProfileDrawer from './Profile/ProfileDrawer';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import LoadingCustom from './Material/Loading';
import { useParams } from 'next/navigation';

function SideContent() {

    const { article }: { article: any } = useSelector((state: RootState) => state?.article);
    console.log("yuth", article.id)
    const { data: session, status }: { data: any, status: any } = useSession();
    const path = useParams();

    // Handle click icon
    const [isFavorite, setIsFavorite] = useState(false);


    const addFavorite = () => {

        setIsFavorite(!isFavorite);
        console.log("user", session.user.userId);
        console.log("department", session.user.dvsn_CD);
        console.log("article id", article.id)
    };

    // const addThisArticleToFavorite = {
    //     userId: 
    // }




    return (
        <div className="drawer-content flex flex-col items-center justify-center p-4">
            {/* Page content here */}
            <div className='flex justify-between w-full mb-3'>
                <Breadcrumbs />

                <label className="input input-bordered flex items-center gap-2 bordered input-sm w-full max-w-xs">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>

                <div className='flex items-center'>
                    <LeftDrawerCustom>
                        {/*left Sidebar content here */}
                        <Profile userInfo={session?.user} />
                        <li className="border shadow rounded-lg mb-5">
                            <label className="swap swap-rotate">
                                <input
                                    type="checkbox"
                                    name="mode"
                                    className="theme-controller"
                                    value={"dark"}
                                />
                                {/* sun icon */}
                                <svg
                                    className="swap-off fill-current w-7 h-7"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                                {/* moon icon */}
                                <svg
                                    className="swap-on fill-current w-7 h-8=7"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </li>
                        <ProfileDrawer userInfo={session?.user} />
                        <li>
                            <Link href={"/manage_users"}>Manage User</Link>
                        </li>
                        <li>
                            <Link href={"/department"}>Deparment</Link>
                        </li>
                        <li>
                            <div
                                role="button"
                                onClick={async () => await signOut()}
                                className="text-red-500"
                            >
                                Sign out
                            </div>
                        </li>
                    </LeftDrawerCustom>
                </div>

            </div>

            <div className="border-2 flex flex-col rounded-lg border-dashed w-full h-full p-4">
                {
                    !article ? (<LoadingCustom />)
                        : (
                            <div className='self-end'>
                                <div className='mb-4'>
                                    {/* <FavoriteBorderOutlinedIcon className='mr-3' onClick={addFavorite} style={{ cursor: 'pointer' }} />
                                    <FavoriteIcon className='mr-3'/>
                                    <ReplyAllOutlinedIcon style={{ cursor: 'pointer' }}/> */}

                                    {!isFavorite && (
                                        <FavoriteBorderOutlinedIcon
                                            className='mr-3'
                                            onClick={addFavorite}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    {isFavorite && (
                                        <FavoriteTwoToneIcon
                                            className='mr-3'
                                            onClick={addFavorite}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    <ReplyAllOutlinedIcon style={{ cursor: 'pointer' }}/>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: article?.content_body }} key={article?.id}/>
                            </div>
                        )
                }

                {/* <img src={article?.img_path} alt="content" width={500} className='mt-6 ml-6' /> */}
                <Page />

            </div>

            {/* <label htmlFor="my-drawer-2" className="btn btn-circle drawer-button lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </label> */}
        </div>
    )
}

export default SideContent;