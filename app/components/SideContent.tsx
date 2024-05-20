import React, { FormEvent, useEffect, useState } from 'react'
import Breadcrumbs from './Breadcrumbs'
import Page from '../(root)/vanda/page';

import LeftDrawerCustom from './Profile/LeftDrawerCustom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../service/Redux/store/store';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Profile from './Profile/Profile';
import ProfileDrawer from './Profile/ProfileDrawer';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LoadingCustom from './Material/Loading';
import { useParams, useRouter } from 'next/navigation';
import HomeContent from './HomeContent';

import {
    TelegramIcon,
    TelegramShareButton,
} from 'next-share'
import { DeleteIcon, EditIcon } from '@/public/icon/TableIcon';
import SearchComponent from './Modal/SearchComponent';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import TagComponent from './Modal/TagComponent';
import { AddArticleBy, deleteArticle } from '../service/ArticleService';
import CustomAlert from './Material/CustomAlert';
import { isMode, isRender } from '../service/Redux/articleDetailSlice';
import AskToConfirmModal from './Modal/AskToConfirmModal';
// import { getFavorite, checkIsFavorite } from '../service/Favourite';
import ihttp, { UI_BASE_URL } from '../utils/xhttp';
import { MenuData } from '../type/MenuData';
import { addToFavorite, deleteFavorite } from '../service/FavouriteService';
import UpdateArticleModal from './Modal/UpdateArticleModal';
import { styled } from '@mui/material';

const drawerWidth = 320;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

function SideContent({ openMainDrawer }: any) {

    const { article }: { article: any } = useSelector((state: RootState) => state?.article);
    const router = useRouter();
    // Favorite yuth
    const isFavorite = useSelector((state: RootState) => state.article.isFavorite);
    // const [isFavorite, setIsFavorite] = useState(article.isFavorite);
    const { data: session, status }: { data: any, status: any } = useSession();
    const path = useParams();
    const dispatch = useDispatch()

    const [isErrorAlert, setIsErrorAlert] = React.useState({
        open: false,
        type: "",
        message: "",
        duration: 1600,
    });

    const [openSearch, setOpenSearch] = React.useState(false);
    const handleOpenSearch = () => setOpenSearch(true);

    const [openTag, setOpenTag] = React.useState(false);
    const handleOpenTag = () => setOpenTag(true);


    const [articleData, setArticleData] = React.useState({});
    const [openArticle, setOpenArticle] = React.useState(false);
    const handleOpenArticle = (article: any) => {
        setArticleData(article)
        setOpenArticle(true)
    };

    const [openAskCf, setOpenAskCf] = React.useState(false);
    const [articleId, setArticleId] = React.useState<number>();
    const handleOpenAskCf = (id: number) => {
        setOpenAskCf(true)
        setArticleId(id)
    };

    const handleDeleteArticle: any = () => {

        if (!articleId) {
            alert("Article ID is wrong.")
        }

        deleteArticle(articleId!).then((res) => {
            if (res.code == "200") {
                +         setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "success",
                    message: "Deleted Successfully.",
                });
                dispatch(isRender(true));
                setOpenAskCf(false)
            }
            else {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "error",
                    message: "fail deleted.",
                });
                setOpenAskCf(false)
            }
        })
    }

    // Add to favorite
    const handleAddFavorite = async (article_id: number) => {
        try {
            const response = await addToFavorite({
                article_id: article_id,
                dept_id: session?.user.dvsn_CD,
                user_id: session?.user.userId
            });
            if (response.code === "200") {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "success",
                    message: "Add to favorite success."
                })
                dispatch(isRender(true));
                setOpenAskCf(false)

            } else {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "error",
                    message: "Faild add to favorite. Please try again."
                })
            }
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    // Delete favorite
    const handleDeleteFavorite = async (article_id: number, user_id: string) => {
        try {
            const response = await deleteFavorite({
                article_id: article_id,
                user_id: session?.user.userId
            });

            if (response.code === "200") {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "success",
                    message: "Delete success."
                })
                dispatch(isRender(true));

            } else {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "error",
                    message: "Faild to delete. Please try again."
                })
            }
        } catch (error) {
            console.error("Error deleting from favorites:", error);
        }
    }

    const onChange = (e: any) => {
        if ("dark" === localStorage.getItem("mode")) {
            localStorage.setItem("mode", "light");
        }
        else {
            localStorage.setItem("mode", "dark");
        }
        dispatch(isMode(true))
    }


    return (
        <Main open={openMainDrawer}>
            <div className="drawer-content bg-primary flex flex-col items-center justify-center py-2 px-4">
                {/* Page content here */}
                <div className='flex justify-between items-center w-full mb-3'>
                    {/* <Breadcrumbs /> */}
                    <div data-tip="Create new" className='tooltip tooltip-left'>
                        {/* <div className='btn btn-ghost btn-circle' onClick={handleOpenTag}>
                        <CreateNewFolderOutlinedIcon />
                    </div> */}
                    </div>

                    <label className="input input-bordered flex items-center gap-2 bordered input-sm w-full max-w-[200px]">
                        <input type="button" onClick={handleOpenSearch} className="grow" value="Search" />
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
                                        onChange={onChange}
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
                            {/* <li>
                            <Link href={"/manage_users"}>Manage User</Link>
                        </li> */}
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

                {/* <img src={article?.img_path} alt="content" width={500} className='mt-6 ml-6' /> */}
                {/* <div>
                <div data-dial-init className="fixed start-4 z-50 bottom-4 group">
                    <button type="button" onClick={handleOpenArticle} data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" className="flex items-center justify-center text-white bg-blue-700 rounded-full w-10 h-10 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800" style={{ width: '2.5rem !important', height: '2.5rem !important' }}>
                        <svg className="w-5 h-5 transition-transform group-hover:rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                        <span className="sr-only">Open actions menu</span>
                    </button>
                </div>
            </div> */}

                <div className="rounded-lg bg-base-100 border w-full min-h-screen p-4">
                    {
                        !article?.content_body ? (<HomeContent />)
                            : (
                                <div className='flex flex-col'>
                                    <div className='mb-4 flex items-center justify-between'>
                                        {/* Left side icons */}
                                        <div></div>

                                        {/* Right side icons */}
                                        <div className="flex items-center bg-primary p-2 rounded-lg border">
                                            {/* Favorite */}

                                            {
                                                isFavorite ? (
                                                    <FavoriteBorderOutlinedIcon onClick={() => handleDeleteFavorite(article?.id, session.user.userId)} className='mr-3' style={{ cursor: 'pointer', color: 'red' }} />
                                                ) : (
                                                    <FavoriteBorderOutlinedIcon onClick={() => handleAddFavorite(article?.id)} className='mr-3' style={{ cursor: 'pointer', color: 'black' }} />
                                                )
                                            }

                                            <TelegramShareButton
                                                url={`${UI_BASE_URL}/share/${article?.id}`}
                                            >
                                                <ReplyAllOutlinedIcon className='mr-3' />
                                            </TelegramShareButton>

                                            {
                                                session?.user.userId === article?.username && (
                                                    <div className='flex justify-between w-10'>
                                                        <EditIcon className="cursor-pointer" variant="text" onClick={() => handleOpenArticle(article)} />
                                                        <DeleteIcon className="cursor-pointer" onClick={() => handleOpenAskCf(article?.id)} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div dangerouslySetInnerHTML={{ __html: article?.content_body }} />


                                </div>


                            )
                    }
                </div>

                {/* <label htmlFor="my-drawer-2" className="btn btn-circle drawer-button lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </label> */}
                <CustomAlert
                    open={isErrorAlert.open}
                    setOpen={(open: boolean) => {
                        setIsErrorAlert({ ...isErrorAlert, open });
                    }}
                    message={isErrorAlert.message}
                    type={isErrorAlert.type}
                    duration={isErrorAlert.duration}
                />

                <SearchComponent open={openSearch} setOpen={setOpenSearch} />
                <TagComponent open={openTag} setOpen={setOpenTag} user={session?.user} />
                <AskToConfirmModal
                    open={openAskCf}
                    setOpen={setOpenAskCf}
                    handleSubmitCallback={handleDeleteArticle}
                />
                <UpdateArticleModal open={openArticle} setOpen={setOpenArticle} session={session} articleData={articleData} />
            </div>
        </Main>
    )
}

export default SideContent;