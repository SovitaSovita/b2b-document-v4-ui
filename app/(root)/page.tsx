'use client'

import SideContent from "../components/SideContent";
import SideBar from "../components/SideBar/SideBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../service/Redux/store/store";
import { get_session, isMode, isRender } from "../service/Redux/articleDetailSlice";
import { GetTagAndArticle } from "../service/TagService";
import { getFavoriteDetail } from "../service/FavouriteService";
import { getSession } from "../utils/xhttp";
import { Editor } from "tinymce";

export default function Home() {

  const dispatch = useDispatch()
  const session: UserData = useSelector((state: RootState) => state?.article.session);

  const disptach_session = async () => {
    try {
      console.log("session work");
      const session = await getSession();
      dispatch(get_session(session));
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  };

  useEffect(() => {
    disptach_session();
  }, [])

  const [menudata, setMenudata] = useState({
    articleList: [],
    tagList: []
  })

  const [isLoading, setIsLoading] = useState(false);

  const reRederMenu = useSelector((state: RootState) => state?.article.isRender);
  const reRederFavorite = useSelector((state: RootState) => state?.favorite.isRender);
  const optionGETdata = useSelector((state: RootState) => state?.article.getOptionData);
  const isMode_theme = useSelector((state: RootState) => state?.article.isMode);

  const [favorites, setFavorites] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true)
    let status = 1;
    let username = null;
    let departmentId = null;
    if (session?.dvsn_CD != "") {
      if (optionGETdata == "PRIVATE") {
        status = 0
        username = session.userId
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
  useEffect(() => {
    handleViewFavorite(session?.userId);
  }, [session, reRederFavorite])

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex">
        <SideBar
          isLoading={isLoading}
          ARTICLES={menudata?.articleList}
          TAGS={menudata?.tagList}
          FAVORITE={favorites}
          handleDrawerClose={handleDrawerClose}
          openMainDrawer={open} />
        <SideContent openMainDrawer={open} />
      </div>
    </>
  );
}
