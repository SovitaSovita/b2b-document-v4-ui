'use client'

import { useSession } from "next-auth/react";
import SideContent from "../components/SideContent";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setIsLoading(true)
    GetTagAndArticle(50, 1).then((res: any) => {
      setMenudata(res?.data.rec);
      dispatch(isRender(false));
      setIsLoading(false)
    })
  }, [reRederMenu])

  const [favorites, setFavorites] = useState<any>([]);


  // Favorote
  function handleViewFavorite(user_id: string) {
    getFavoriteDetail(user_id).then((res) => {
      console.log("Favorite response", res);
      setFavorites(res);
    })
  }

  useEffect(() => {
    // Get user_id
    handleViewFavorite(session?.user?.userId);
  }, [session])

  // if (isLoading) {
  //   return (
  //     <LoadingCustom />
  //   );
  // }


  return (
    <>
      <div className="">
        <div className="drawer lg:drawer-open font-Figtree">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <SideContent />
          <SideBar ARTICLES={menudata.articleList} TAGS={menudata.tagList} FAVORITE={favorites} />
        </div>
      </div>
    </>
  );
}
