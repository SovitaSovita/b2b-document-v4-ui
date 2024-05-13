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

export default function Home() {

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

  return (
    <>
      <div className="">
        <div className="drawer lg:drawer-open font-Figtree">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <SideContent />
          <SideBar ARTICLES={menudata.articleList} TAGS={menudata.tagList} />
        </div>
      </div>
    </>
  );
}
