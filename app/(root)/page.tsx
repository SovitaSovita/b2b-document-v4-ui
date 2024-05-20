'use client'

import { useSession } from "next-auth/react";
import SideContent from "../components/SideContent";
import SideBar from "../components/SideBar";
import React, { useEffect, useState } from "react";
import { getMenuSidebar } from "../service/MenuService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../service/Redux/store/store";
import { isRender } from "../service/Redux/articleDetailSlice";
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
  const [favorites, setFavorites] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true)
    if (session) {
      GetTagAndArticle(parseInt(session?.user.dvsn_CD, 10), 1).then((res: any) => {
        setMenudata(res?.data.rec);
        dispatch(isRender(false));
        setIsLoading(false)
      })
    }
  }, [reRederMenu, session])




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

  return (
    <>
      <div className="">
        <div className="flex">
          <SideBar ARTICLES={menudata.articleList} TAGS={menudata.tagList} FAVORITE={favorites} handleDrawerClose={handleDrawerClose} openMainDrawer={open}/>
          <SideContent openMainDrawer={open} />
        </div>
      </div>
    </>
  );
}
