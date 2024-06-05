import React, { useEffect, useRef, useState } from 'react'
import { GeminiGetContentResponse } from '../service/GeminiService'
import { useDispatch } from 'react-redux';
import { get_geminiContent } from '../service/Redux/articleDetailSlice';
import Marked from 'marked-react'
import { Gemini } from 'iconsax-react';

function GeminiContent() {

    const [aiResponse, setAiResponse] = useState<String | any>();
    const dispatch = useDispatch();

    let Aiprompt = "How to create next js project";

    const getResponseFromGemini = () => {
        GeminiGetContentResponse({
            "contents": [
                {
                    "parts": [
                        {
                            "text": "write the document about" + Aiprompt
                        }
                    ]
                }
            ]
        }).then((res: any) => {
            setAiResponse(res.candidates[0].content.parts[0].text)
        })
    }

    useEffect(() => {
        getInnerHTML();
    }, [aiResponse])

    const renderRef = useRef<HTMLDivElement>(null);

    // Function to get inner HTML of the render element
    const getInnerHTML = () => {
        if (renderRef.current) {
            dispatch(get_geminiContent(renderRef.current.innerHTML));
        }
    };
    return (
        <div>
            <div id='render' ref={renderRef} className='hidden'>
                <Marked>{aiResponse}</Marked>
            </div>
            <button type='button' disabled onClick={getResponseFromGemini} className='btn btn-sm btn-secondary ml-3'>
                <Gemini size="20" className='text-primary' />
                Gemini AI
            </button>
        </div>
    )
}

export default GeminiContent