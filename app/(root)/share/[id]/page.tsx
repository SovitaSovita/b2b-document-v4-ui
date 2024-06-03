'use client'

import { getArticleDetail } from "@/app/service/ArticleService";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {

    const [articleData, setArticleData] = useState<any>();

    function handleViewArticle() {
        getArticleDetail(params?.id).then((res) => {
            if (res) {
                setArticleData(res)
            }
            else {
                setArticleData(null)
            }
        })
    }
    useEffect(() => {
        handleViewArticle()
    }, [params?.id])


    return (
        <section className="text-gray-600 body-font bg-base-200 min-h-screen">
            <div className="container px-5 py-16 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto bg-base-100 shadow border p-5 rounded-lg">
                    {
                        articleData == null ?
                            <div role="alert" className="alert">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>Article ID [{params?.id}] is not Found</span>
                            </div>
                            : (
                                <div dangerouslySetInnerHTML={{ __html: articleData?.content_body }} />
                            )
                    }
                </div>
            </div>
        </section>
    )
}