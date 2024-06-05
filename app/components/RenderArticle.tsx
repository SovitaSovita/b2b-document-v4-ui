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
                        apiKey='y7nhfoq6rca9j1otxq92aqdc64f3rm36gq92ebilc67dm6ni'
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