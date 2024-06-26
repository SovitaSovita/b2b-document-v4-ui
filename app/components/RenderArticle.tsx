import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../style/reset.css';
import '../style/tiny.css';
import LoadingCustom from './Material/Loading';

interface RenderArticleProps {
    body: string;
}

const RenderArticle = forwardRef<HTMLDivElement, RenderArticleProps>(({ body }, ref) => {
    const editorRef = useRef<any>(null);


    return (
        <>
            <div className="content-wrapper">
                <div>
                    <div className="my-tinymce-container">
                        <div ref={ref} className="print-content" dangerouslySetInnerHTML={{ __html: body }} />
                        <Editor
                            apiKey="51cakyf7l011kd34r23bib5jrvh79lb520v82wpid72wq92n"
                            onInit={(evt, editor) => editorRef.current = editor}
                            init={{
                                height: 800,
                                readonly: true as any,
                                plugins: 'false',
                                toolbar: false,
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                setup: (editor) => {
                                    editor.on('init', () => {
                                        editor.getBody().setAttribute('contenteditable', 'false');
                                    });
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
            <style>
                {`
                    @media print {
                        .my-tinymce-container {
                            display: none;
                        }
                        .print-content {
                            display: block;
                            margin: 15px;
                        }
                    }
                    .print-content {
                        margin: 15px;
                    }
                `}
            </style>
        </>
    );
});

RenderArticle.displayName = 'RenderArticle';

export default RenderArticle;
