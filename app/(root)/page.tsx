'use client'

import { useSession } from "next-auth/react";
import SideContent from "../components/SideContent";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { getMenuSidebar } from "../service/MenuService";

export default function Home() {

  const [menudata, setMenudata] = useState({
    ARTICLES: [],
    TAGS: []
  })

  const transformApiResponse = (apiResponse: any) => {
    const ARTICLES = apiResponse.map((item: any) => ({
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

  return (
    <>
      <div className="">
        <div className="drawer lg:drawer-open font-Figtree">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <SideContent />
          <SideBar ARTICLES={menudata.ARTICLES} TAGS={menudata.TAGS} />
        </div>
      </div>
    </>
  );
}
