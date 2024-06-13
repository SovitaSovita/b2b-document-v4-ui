import React, { FormEvent, useEffect, useRef, useState } from 'react'

import LeftDrawerCustom from './Profile/LeftDrawerCustom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../service/Redux/store/store';
import Link from 'next/link';
import Profile from './Profile/Profile';
import ProfileDrawer from './Profile/ProfileDrawer';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import { useParams, usePathname, useRouter } from 'next/navigation';
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
import { getArticle, isMode, isRender, getFavorite, isFavorite } from '../service/Redux/articleDetailSlice';
import AskToConfirmModal from './Modal/AskToConfirmModal';
import ihttp, { UI_BASE_URL } from '../utils/xhttp';
import { addToFavorite, checkIsFavorite, deleteFavorite } from '../service/FavouriteService';
import UpdateArticleModal from './Modal/ArticleModal';
import { styled } from '@mui/material';
import { getArticleDetail } from '../service/ArticleService';
import RenderArticle from './RenderArticle';
import CKEditorComponent from './editor/CKEditorComponent';
import { User } from '@nextui-org/react';
import { Chart21, ChartSuccess, ClipboardExport } from 'iconsax-react';




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

function SideContent({ openMainDrawer, setOpen }: any) {

    const { article }: { article: any } = useSelector((state: RootState) => state?.article);
    const router = useRouter();
    // Favorite 
    const isFavorites = useSelector((state: RootState) => state.article.isFavorite);
    const session: UserData = useSelector((state: RootState) => state?.article.session);
    const path = useParams();
    const dispatch = useDispatch()

    const [isErrorAlert, setIsErrorAlert] = React.useState({
        open: false,
        type: "",
        message: "",
        duration: 1600,
    });
    const handleClose = () => {
        setOpen(false)
    };

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
            setIsErrorAlert({
                ...isErrorAlert,
                open: true,
                type: "warning",
                message: "Article ID is Incorrect.",
            });
        }

        deleteArticle(articleId!).then((res) => {
            if (res.code == "200") {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "success",
                    message: "Deleted Successfully.",
                });
                dispatch(isRender(true));
                dispatch(getArticle(null));
            }
            else {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "error",
                    message: "fail deleted.",
                });
            }
            setOpenAskCf(false)
        })
    }

    function handleViewArticle(id: string) {
        getArticleDetail(id).then((res) => {
            dispatch(getArticle(res.rec))
        })
        checkIsFavorite(session.userId, parseInt(id, 10), session.dvsn_CD).then((data) => {
            if (data != null) {
                dispatch(isFavorite(true))
            }
            else {
                dispatch(isFavorite(false))
            }
        })
    }
    // Add to favorite
    const handleAddFavorite = async (article_id: number) => {
        try {
            const response = await addToFavorite({
                article_id: article_id,
                dept_id: session?.dvsn_CD,
                user_id: session?.userId
            });
            if (response.code === "200") {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "success",
                    message: "Add to favorite success."
                })
                dispatch(isRender(true));
                // dispatch(getArticle(true))
                setOpenAskCf(false)
                handleViewArticle(article_id.toString())


            } else {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "error",
                    message: "Faild add to favorite. Please try again."
                })
            }
            handleClose()
            //dispatch(handleOpenArticle(art);
            setOpenAskCf(false)
        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };

    // Delete favorite
    const handleDeleteFavorite = async (article_id: number, user_id: string) => {
        try {
            const response = await deleteFavorite({
                article_id: article_id,
                user_id: session?.userId
            });
            if (response.code === "200") {
                setIsErrorAlert({
                    ...isErrorAlert,
                    open: true,
                    type: "success",
                    message: "Delete success."
                })
                dispatch(isRender(true));
                handleViewArticle(article_id.toString())
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

    const convertTimestamp = (value: any) => {
        const date = new Date(value);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;

    }

    const pathname = usePathname()


    return (
        <Main open={openMainDrawer}>
            {
                article?.content_body == null ? (<HomeContent handleOpenArticle={handleOpenArticle} />)
                    : (
                        <div className='flex flex-col w-full h-full'>
                            <div className='mb-4 flex items-center justify-between'>
                                {/* Left side icons */}
                                <div className='p-2'>
                                    <User
                                        name={article?.username}
                                        description={article?.create_date ? convertTimestamp(article?.create_date) : convertTimestamp(article?.modified_date)}
                                        avatarProps={{
                                            src: article?.image
                                        }}
                                    />
                                </div>
                                {/* Right side icons */}
                                <div className="flex items-center bg-primary rounded-bl-lg p-2 border">
                                    {/* Favorite icons*/}
                                    {
                                        isFavorites ? (
                                            <FavoriteBorderOutlinedIcon onClick={() => handleDeleteFavorite(article?.id, session.userId)} className='mr-3' style={{ cursor: 'pointer', color: 'red' }} />
                                        ) : (
                                            <FavoriteBorderOutlinedIcon onClick={() => handleAddFavorite(article?.id)} className='mr-3' style={{ cursor: 'pointer', color: 'black' }} />
                                        )
                                    }
                                    <TelegramShareButton
                                        url={`${UI_BASE_URL}share/${article?.id}`}
                                    >
                                        <ReplyAllOutlinedIcon className='mr-3' />
                                    </TelegramShareButton>
                                    {
                                        session?.userId === article?.username && (
                                            <div className='flex justify-between w-10'>
                                                <EditIcon className="cursor-pointer" variant="text" onClick={() => handleOpenArticle(article)} />
                                                <DeleteIcon className="cursor-pointer" onClick={() => handleOpenAskCf(article?.id)} />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <RenderArticle body={article?.content_body} />
                        </div>
                    )
            }
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

            <TagComponent open={openTag} setOpen={setOpenTag} user={session} sendDataToParent={null} selectedValue={null} setSelectedValue={null} />
            <AskToConfirmModal
                open={openAskCf}
                setOpen={setOpenAskCf}
                handleSubmitCallback={handleDeleteArticle}
            />
            <UpdateArticleModal open={openArticle} setOpen={setOpenArticle} session={session} articleData={articleData} handleViewArticle={handleViewArticle} />
        </Main>
    )
}

export default SideContent;