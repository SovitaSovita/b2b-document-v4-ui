'use client'

import { getArticleDetail } from "@/app/service/ArticleService";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import '../../../style/tiny.css'
import { RootState } from "@/app/service/Redux/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {

    const [articleData, setArticleData] = useState<any>();
    const router = useRouter()

    function handleViewArticle() {
        getArticleDetail(params?.id).then((res) => {
            if (res.code == "200") {
                setArticleData(res.rec)
            }
            else if (res.code == "401") {
                alert("No Permission")
            }
            else {
                setArticleData(null)
            }
        })
    }
    // const session: UserData = useSelector((state: RootState) => state?.article.session);

    useEffect(() => {
        console.log("session", localStorage.getItem("tid"));
        if (localStorage.getItem("tid")) {
            console.log("work");
            handleViewArticle()
        }
        else {
            alert("No Token")
            // router.push("/error");
        }
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
                                <div className="my-tinymce-containers">
                                    <Editor
                                        apiKey='y7nhfoq6rca9j1otxq92aqdc64f3rm36gq92ebilc67dm6ni'
                                        initialValue={articleData?.content_body}
                                        init={{
                                            height: 800,
                                            readonly: true as any,
                                            plugins: 'false',
                                            toolbar: false,
                                            setup: function (editor) {
                                                editor.on('init', function () {
                                                    editor.getBody().setAttribute('contenteditable', 'false');
                                                });
                                            },
                                            content_style: 'editor-style',
                                        }}
                                    />
                                </div>
                            )
                    }
                </div>
            </div>
        </section>
    )
}