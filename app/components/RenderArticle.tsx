import React from 'react'
import '../style/reset.css';
import { Editor } from '@tinymce/tinymce-react';
import '../style/tiny.css'
import LoadingCustom from './Material/Loading';

function RenderArticle({ body }: any) {
    
    return (
        <div className="my-tinymce-container">
            {
                body ?
                    <Editor
                        apiKey='51cakyf7l011kd34r23bib5jrvh79lb520v82wpid72wq92n'
                        initialValue={body}
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
                    : <LoadingCustom />
            }
        </div >
    )
}

export default RenderArticle