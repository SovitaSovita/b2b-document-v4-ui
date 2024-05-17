'use client'

import { getArticleDetail } from "@/app/service/MenuService";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {

    const [articleData, setArticleData] = useState<any>();

    function handleViewArticle() {
        getArticleDetail(params?.id).then((res) => {
            setArticleData(res[0])
        })
    }
    useEffect(() => {
        handleViewArticle()
    }, [params?.id])


    return (
        <section className="text-gray-600 body-font bg-base-200 min-h-screen">
            <div className="container px-5 py-16 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto bg-base-100 shadow border p-5 rounded-lg">
                    <div dangerouslySetInnerHTML={{ __html: articleData?.content_body }} />
                </div>
            </div>
        </section>
    )
}