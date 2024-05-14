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

export default function Home() {

  const { data: session, status }: { data: any, status: any } = useSession()

  const [menudata, setMenudata] = useState({
    articleList: [],
    tagList: []
  })

  const dispatch = useDispatch()

  const transformApiResponse = (apiResponse: any) => {
    const ARTICLES = apiResponse?.map((item: any) => ({
      id: item.id,
      tag_id: item.tag_id,
      title: item.title,
      isfavorite: item.isfavorite
    }));

    const TAGS = Array.from(new Set(apiResponse.map((item: any) => item.tag_id))).map((tagId) => ({
      id: tagId,
      title: apiResponse.find((item: any) => item.tag_id === tagId)?.tag_title || "",
      dep_id: apiResponse.find((item: any) => item.tag_id === tagId)?.dept_id || ""
    }));
    return {
      ARTICLES,
      TAGS: TAGS
    };
  };

  const reRederMenu = useSelector((state: RootState) => state?.article.isRender);

  useEffect(() => {
    GetTagAndArticle(50).then((res: any) => {
      // const transformedData: any = transformApiResponse(res);
      setMenudata(res?.data.rec);
      dispatch(isRender(false));
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
