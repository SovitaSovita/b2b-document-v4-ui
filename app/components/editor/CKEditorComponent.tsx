import { Insert_file } from '@/app/service/ArticleService';
import { RootState } from '@/app/service/Redux/store/store';
import { Editor } from '@tinymce/tinymce-react';
import { Cagliostro } from 'next/font/google';
// import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
const API_BASE_URL = process.env.NEXT_API_URL

function CKEditorComponent(props: any) {

    const { geteditorRef, articleData } = props

    const editorRef = useRef<any>(null);
    const geminiContent = useSelector((state: RootState) => state?.article.geminiContent);

    useEffect(() => {
        editorRef?.current?.setContent(editorRef.current.getContent() + geminiContent);
    }, [geminiContent])


    useEffect(() => {
        geteditorRef(editorRef)
    }, [editorRef, geteditorRef])

    const handleImageUpload: any = (blobInfo: any) => {
        return new Promise((resolve, reject) => {
            const file = blobInfo.blob();
            const formData = new FormData();
            formData.append("imageFile", file);
            fetch(`${API_BASE_URL}/files/upload_file`, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((result) => {
                    const imageURL = result?.payload?.thum_img_path;
                    resolve(imageURL);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        const formData: FormData = new FormData();
        formData.append("imageFile", file);
        handleInsertHTML(formData);
    };

    const handleInsertHTML = (formData: FormData) => {
        if (formData) {
            Insert_file(formData).then((fileResponse: FileUploadResponseType) => {
                const htmlContent = `
                  <div style="padding: 10px; width: 250px; background-color: rgb(246, 248, 252)">
                    <a href="${API_BASE_URL}/files/view_files?fileName=${fileResponse?.payload.file_nm}" download=${fileResponse?.payload.file_nm} 
                    style="display: flex; align-items: center; justify-content: space-between; text-decoration: none;">
                      download ${fileResponse?.payload.file_nm}
                      <img width="30px" src="https://firebasestorage.googleapis.com/v0/b/core-appliance-412508.appspot.com/o/cloud-arrow-down-svgrepo-com.svg?alt=media&token=a2b5e6bc-c4e7-445c-b39e-37e35d8e4b5c" />
                    </a>
                  </div>
            `;
                editorRef?.current?.setContent(editorRef.current.getContent() + htmlContent);
            })
        } else {
            console.error("No file selected.");
        }
    };

    const handleFileButtonClicked = () => {
        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.onchange = handleFileChange;
        fileInput.click();
    };



    return (
        <div>
            <Editor
                apiKey='j5jlvquhq3p95alr8qcd16aymrzmto2lsgawim44fsm0v8ed'
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={articleData?.content_body}
                init={{
                    height: 580,
                    setup: (editor) => {
                        // Define behavior for custom button
                        editor.ui.registry.addButton('insertFileBtn', {
                            text: 'File',
                            type: 'button',
                            icon: 'browse',
                            onAction: handleFileButtonClicked
                        });
                    },
                    plugins: [
                        'autolink',
                        'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                        'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist checklist outdent indent | removeformat | insertFileBtn code table help',
                    images_upload_handler: handleImageUpload,
                    // content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
        </div>
    )
}

export default CKEditorComponent