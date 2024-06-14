"use client"
import { POST } from '@/app/api/test/route';
import { Button } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

function Page() {
    const handleSubmit = () => {
        // Create a form element
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'https://emplinfo-dev.appplay.co.kr/com_empl_02.act');
        form.setAttribute('target', '_blank');
        form.style.display = 'none'; // Hide the form

        // Create input fields and set their attributes
        const inputData: any = {
            "POP_TYPE": "E",
            "SECR_KEY": "0e5dddb4-79b8-814b-9701-3d5ebe625455",
            "USE_INTT_ID": "UTLZ_590",
            "POP_OPT": "M",
            "EMPL_DSNC": "U",
            "USER_ID": "sovita",
            "POST_CALLBACK_PAGE": "http://localhost:3000/api/test",
            "LNGG_DSNC": "EN"
        };

        for (const key in inputData) {
            if (inputData.hasOwnProperty(key)) {
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', key);
                input.setAttribute('value', inputData[key]);
                form.appendChild(input);
            }
        }

        // Append the form to the document body
        document.body.appendChild(form);

        form.submit();
    }

    const [response, setResponse] = useState(null);

    useEffect(() => {
        const handleMessage = (event: any) => {
            if (event.origin === "http://localhost:3000/api/test" && event.data.RESP_DATA) {
                setResponse(event.data.RESP_DATA);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [response]);

    console.log("response ? ", response);


    return (
        <div>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

export default Page