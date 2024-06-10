import React, { useEffect, useRef, useState } from 'react'
import { GeminiGetContentResponse } from '../service/GeminiService'
import { useDispatch } from 'react-redux';
import { get_geminiContent } from '../service/Redux/articleDetailSlice';
import Marked from 'marked-react'
import { Back, Gemini, Illustrator, Send2 } from 'iconsax-react';
import { Button, Input } from '@nextui-org/react';

function GeminiContent({ setIsHideClass, isHideClass }: any) {

    const [aiResponse, setAiResponse] = useState<String | any>();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const [promptValue, setPromptValue] = useState("");
    const handleChange = (event: any) => {
        setPromptValue(event.target.value)
    }

    const getResponseFromGemini = () => {
        setIsLoading(true)
        if (promptValue === "") {
            setIsLoading(false)
            return
        }
        GeminiGetContentResponse({
            "contents": [
                {
                    "parts": [
                        {
                            "text": "write the document about" + promptValue
                        }
                    ]
                }
            ]
        }).then((res: any) => {
            setAiResponse(res.candidates[0].content.parts[0].text)
            setIsLoading(false)
            setPromptValue("")
            console.log("promptValue >>>>>", promptValue);
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

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            getResponseFromGemini();
        }
    };

    console.log(isHideClass);
    return (
        <div>
            <div id='render' ref={renderRef} className='hidden'>
                <Marked>{aiResponse}</Marked>
            </div>
            {
                isHideClass === "hidden" ?
                    (
                        <div className='flex justify-between'>
                            <Input
                                key={""}
                                type="text"
                                size='sm'
                                color={'default'}
                                placeholder="Enter Prompt here..."
                                value={promptValue}
                                className="w-full"
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />

                            < Button
                                isLoading={isLoading}
                                isIconOnly
                                spinner={
                                    <svg
                                        className="animate-spin h-5 w-5 text-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                }
                                onClick={getResponseFromGemini} variant='flat' size='sm' color="secondary" className='ml-2'>
                                <Send2 size={20} />
                            </Button>
                            < Button
                                isDisabled={isLoading}
                                isIconOnly
                                type='button'
                                onClick={() => setIsHideClass("")} variant='flat' size='sm' color="default" className='ml-2'>
                                <Back size={"20px"} />
                            </Button>
                        </div>
                    )
                    :
                    <Button
                        size='sm'
                        color='secondary'
                        type='button'
                        onClick={() => setIsHideClass("hidden")} className={`btn btn-sm btn-secondary ml-3 ${isHideClass}`}>
                        <Illustrator size="20" className='text-primary' />
                        Gemini AI
                    </Button>
            }
        </div >
    )
}

export default GeminiContent