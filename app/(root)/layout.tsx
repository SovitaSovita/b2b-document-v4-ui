'use client'

import * as React from 'react';
import SideBar from '../components/SideBar/SideBar';
import { GetTagAndArticle } from '../service/TagService';
import { get_session, isRender } from '../service/Redux/articleDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../service/Redux/store/store';
import { getSession } from '../utils/xhttp';
import { getFavoriteDetail } from '../service/FavouriteService';
import Navbar from '../components/Navbar';
import SmallSideBar from '../components/SideBar/SmallSideBar';
import { Button } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

const Layout = (props: { children: React.ReactNode }) => {

    const dispatch = useDispatch()
    const session: UserData = useSelector((state: RootState) => state?.article.session);

    const disptach_session = async () => {
        try {
            const session = await getSession();
            dispatch(get_session(session));
        } catch (error) {
            console.error('Error fetching session:', error);
        }
    };

    React.useEffect(() => {
        disptach_session();
    }, [])

    const [menudata, setMenudata] = React.useState({
        articleList: [],
        tagList: []
    })

    const [isLoading, setIsLoading] = React.useState(false);

    const reRederMenu = useSelector((state: RootState) => state?.article.isRender);
    const reRederFavorite = useSelector((state: RootState) => state?.favorite.isRender);
    const optionGETdata = useSelector((state: RootState) => state?.article.getOptionData);
    const [favorites, setFavorites] = React.useState<any>([]);

    React.useEffect(() => {
        setIsLoading(true)
        let status = 1;
        let username = null;
        let departmentId = null;
        if (session?.dvsn_CD != "") {
            if (optionGETdata == "PRIVATE") {
                status = 0
                username = session?.userId
            }
            if (optionGETdata == "PUBLIC") {
                status = 1
            }
            if (optionGETdata == "DEPARTMENT") {
                status = 2
                departmentId = parseInt(session?.dvsn_CD, 10)
            }
            // Get Tag
            GetTagAndArticle(departmentId, status, username).then((res: any) => {
                setMenudata(res?.data?.rec);
                dispatch(isRender(false));
                setIsLoading(false)
            })
        }
    }, [reRederMenu, session, optionGETdata])

    // Favorote
    function handleViewFavorite(user_id: string) {
        getFavoriteDetail(user_id).then((res) => {
            setFavorites(res);
        },)
    }
    React.useEffect(() => {
        handleViewFavorite(session?.userId);
    }, [session, reRederFavorite])

    const [open, setOpen] = React.useState(true);
    const [openDocDraw, setOpenDocDraw] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [toggleSideBar, setToggleSideBar] = React.useState("0%")
    const FN_toggleSideBar = (pathname: any) => {
        console.log(pathname);
        if (pathname == "/") {
            if (toggleSideBar == "30%")
                setToggleSideBar("0%")
            else setToggleSideBar("30%")
        }
        else {
            setToggleSideBar("0%")
        }
    }

    return (
        <div className='flex bg-primary w-full min-h-screen'>
            {/* <DocumentSidebar openMainDrawer={openDocDraw} /> */}
            <SmallSideBar fun_toggleSideBar={FN_toggleSideBar} />
            <SideBar
                isLoading={isLoading}
                ARTICLES={menudata?.articleList}
                TAGS={menudata?.tagList}
                FAVORITE={favorites}
                handleDrawerClose={handleDrawerClose}
                openMainDrawer={open}
                toggleSideBar={toggleSideBar}
            />

            <div className='w-full ml-3 bg-base-100 rounded-lg'>
                <Navbar session={session} />
                <div className="drawer-content h-screen flex flex-col items-center py-2 px-4">
                    {/* Page content here */}
                    <div className="rounded-lg bg-base-100 border w-full h-full">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
