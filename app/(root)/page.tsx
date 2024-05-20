'use client'

import { useSession } from "next-auth/react";
import SideContent from "../components/SideContent";
import SideBar from "../components/SideBar/SideBar";
import React, { useEffect, useState } from "react";
import { getMenuSidebar } from "../service/MenuService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../service/Redux/store/store";
import { isMode, isRender } from "../service/Redux/articleDetailSlice";
import { GetTagAndArticle } from "../service/TagService";
import { getFavoriteDetail } from "../service/FavouriteService";
import LoadingCustom from "../components/Material/Loading";

export default function Home() {

  const { data: session, status }: { data: any, status: any } = useSession()

  const [menudata, setMenudata] = useState({
    articleList: [],
    tagList: []
  })

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);

  const reRederMenu = useSelector((state: RootState) => state?.article.isRender);
  const reRederFavorite = useSelector((state: RootState) => state?.favorite.isRender);
  const optionGETdata = useSelector((state: RootState) => state?.article.getOptionData);
  const isMode_theme = useSelector((state: RootState) => state?.article.isMode);

  const [favorites, setFavorites] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true)
    let status = 1;
    if (session) {
      if (optionGETdata == "PRIVATE") status = 0
      if (optionGETdata == "PUBLIC") status = 1
      if (optionGETdata == "DEPARTMENT") status = 2
      //GET
      GetTagAndArticle(parseInt(session?.user.dvsn_CD, 10), status).then((res: any) => {
        setMenudata(res?.data.rec);
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

  useEffect(() => {
    handleViewFavorite(session?.user?.userId);
  }, [session, reRederFavorite])

  // if (isLoading) {
  //   return (
  //     <LoadingCustom />
  //   );
  // }

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [mode, setMode] = useState("light");

  useEffect(() => {
    setMode(localStorage.getItem("mode")!);
    dispatch(isMode(false))
  }, [isMode_theme])


  return (
    <>
      <div className="flex" data-theme={mode}>
        <SideBar ARTICLES={menudata.articleList} TAGS={menudata.tagList} FAVORITE={favorites} handleDrawerClose={handleDrawerClose} openMainDrawer={open} />
        <SideContent openMainDrawer={open} />
      </div>
    </>
  );
}
