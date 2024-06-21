'use client';

import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// const BASE_URL = process.env.NEXT_API_URL;
const BASE_URL = 'http://192.168.178.239:4545'

export default function Page({ params }: { params: { id: string } }) {
    const [tokenProvid, setTokenProvid] = useState<string | null>(null);
    const [articleData, setArticleData] = useState<any>(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        setTokenProvid(token);
    }, []);

    const router = useRouter();

    const fetchAPI = async (id: string, token: string | null) => {
        const res = await fetch(`${BASE_URL}/api/v1/articles/listById?id=${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token || 'default-token'}`,
            }
        });

        if (res.status === 401) {
            router.push(""); // Redirect if unauthorized
            return null;
        }
        return res.json();
    };

    const handleViewArticle = async () => {
        const data = await fetchAPI(params?.id, tokenProvid);
        if (data) {
            const contentBody = data?.rec?.rec?.rec?.content_body;
            if (data.code === "200" && contentBody) {
                setArticleData(contentBody);
            } else if (data.code === "401") {
                alert("No Permission");
            } else {
                setArticleData(null);
            }
        }
    };

    useEffect(() => {
        if (tokenProvid !== null) {
            handleViewArticle();
        }
    }, [params?.id, tokenProvid]);

    return (
        <section className="text-gray-600 body-font bg-base-200 min-h-screen">
            <div className="container px-5 py-16 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto bg-base-100 shadow border p-5 rounded-lg">
                    {articleData === null ? (
                        <div role="alert" className="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Article ID [{params?.id}] is not Found</span>
                        </div>
                    ) : (
                        <div className="my-tinymce-containers">
                            <Editor
                                apiKey='y7nhfoq6rca9j1otxq92aqdc64f3rm36gq92ebilc67dm6ni'
                                initialValue={articleData}
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
                    )}
                </div>
            </div>
        </section>
    );
}
