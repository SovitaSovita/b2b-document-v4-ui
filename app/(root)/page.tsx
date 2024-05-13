'use client'

import { useSession } from "next-auth/react";
import SideContent from "../components/SideContent";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { getMenuSidebar } from "../service/MenuService";
import { getFavoriteDetail } from "../service/FavouriteService";

export default function Home() {

  const { data: session, status }: { data: any, status: any } = useSession()

  const [menudata, setMenudata] = useState({
    ARTICLES: [],
    TAGS: []
  })

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

  useEffect(() => {
    getMenuSidebar().then((res) => {
      const transformedData: any = transformApiResponse(res);
      setMenudata(transformedData);
    })
  }, [])

  const [favorites, setFavorites] = useState<any[]>([]);


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
          <SideContent FAVORITE={favorites} />
          <SideBar ARTICLES={menudata.ARTICLES} TAGS={menudata.TAGS} FAVORITE={favorites} />
        </div>
      </div>
    </>
  );
}
