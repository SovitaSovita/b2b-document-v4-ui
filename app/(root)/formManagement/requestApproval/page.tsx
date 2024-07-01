'use client'
import { RootState } from "@/app/service/Redux/store/store";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from 'next/link';
import { ArrowLeft2 } from "iconsax-react";

interface FormData {
    response: Response; // Assuming Response is defined somewhere
    formNumber: string;
    formName: string
}

const Page: React.FC = () => {
    const formDatas = useSelector((state: RootState) => state.form.form as FormData);
    console.log('page request approval', formDatas);
    const handleRequestApproval = () => {
        // Create form
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', 'https://emplinfo-dev.appplay.co.kr/com_empl_02.act')
        form.setAttribute('target', '_blank')
        form.style.display = 'none';
        const inputData: any = {
            "POP_TYPE": "A",
            "SECR_KEY": "0e5dddb4-79b8-814b-9701-3d5ebe625455",
            "USE_INTT_ID": "UTLZ_590",
            "POP_OPT": "M",
            "EMPL_DSNC": "U",
            "USER_ID": "sovita",
            "POST_CALLBACK_PAGE": "http://localhost:3000/api/test",
            "LNGG_DSNC": "EN"
        }
        for (const key in inputData) {
            if (inputData.hasOwnProperty(key)) {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', inputData[key]);
                form.appendChild(input);
            }
        }
        document.body.appendChild(form)
        form.submit()
    }
    const [response, setResponse] = useState(null)
    useEffect(() => {
        const handleMessage = (event: any) => {
            if (event.origin === 'http://localhost:3000/api/test' && event.data.RESP_DATA) {
                setResponse(event.data.RESP_DATA);
            }
        }
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [response])
    console.log('response ', response)

    const formData: any = useSelector((state: RootState) => state.form.form)
    console.log(formData)

    return (
        <>
            {/* <div className="p-4">
                <div className="navbar bg-base-100">
                    <div className="flex-1">                      
                        <Link href="/formManagement/formList">
                            <ArrowLeft2 size={32} color="black" />
                        </Link>

                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <button onClick={handleRequestApproval}>Request approval</button>
                        </ul>
                    </div>
                </div>
                <hr></hr>
                <br></br>
                <h1>{formData?.formName}</h1>
                <h1>Document No: {formData?.formNumber}</h1>
            </div> */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2>{formData?.formName}</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
