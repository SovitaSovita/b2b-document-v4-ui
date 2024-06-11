import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import '../style/reset.css';
import { Editor } from '@tinymce/tinymce-react';
import '../style/tiny.css';
import LoadingCustom from './Material/Loading';
import { Printer } from 'iconsax-react';

interface RenderArticleProps {
    body: string;
}

const RenderArticle: React.FC<RenderArticleProps> = ({ body } , props) => {
    const { isLoading, handleDrawerClose, openMainDrawer }: any = props
    const printRef = useRef<HTMLDivElement>(null);

    

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'Article Print',
    });

    return (
        <>
            {isLoading ? (
                <LoadingCustom />
            ) : (
                <>
                    {/* <span onClick={handlePrint} style={{ cursor: 'pointer', margin: '15px' }}>
                        <Printer size="32" color="black" />
                    </span> */}
                    <div className="content-wrapper">
                        <div>
                            <div className="my-tinymce-container">
                                <Editor
                                    apiKey="51cakyf7l011kd34r23bib5jrvh79lb520v82wpid72wq92n"
                                    initialValue={body}
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
                            {/* <div ref={printRef} className="print-content" dangerouslySetInnerHTML={{ __html: body }} /> */}
                        </div>
                    </div>
                    <style>
                        {`
                            @media print {
                                .my-tinymce-container {
                                    display: none;
                                }
                                .print-content {
                                    margin: 15px;
                                }
                            }
                            .print-content {
                                margin: 15px;
                            }
                        `}
                    </style>
                </>
            )}
        </>
    );
};

export default RenderArticle;
