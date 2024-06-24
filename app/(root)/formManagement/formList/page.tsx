'use client'
// Assuming your React component structure and imports remain the same

import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { ListAllFormName } from '@/app/service/FormManagement'
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'

interface Form {
    id: number,
    formName: string,
    formContent: string,
    username: string,
    status: number,
    createDate: string
}

function Page() {
    const [forms, setForms] = useState<Form[]>([]);


    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await ListAllFormName(2, "sovita") as { data?: { rec: Form[] } };
                if (response && response.data && response.data.rec) {
                    setForms(response.data.rec);
                } else {
                    console.error('Invalid response structure:', response);
                }
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        }
        fetchAPI();
    }, []);


    return (
        <>
            <div className='p-4'>
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                    {forms.map((form) => (
                        <Card key={form.id} className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Form Name</p>
                                <h4 className="font-bold text-large">{form.formName}</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                {renderFormContent(form.formContent)}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    )
}

// Function to render form content based on the formContent string
const renderFormContent = (formContent: string) => {
    // Example: Check if formContent contains an image tag and extract src attribute
    const regex = /src=['"]([^'"]+)['"]/;
    const match = formContent.match(regex);
    if (match) {
        const imageUrl = match[1];
        return (
            <Image
                alt="Form Image"
                className="object-cover rounded-xl"
                src={imageUrl}
                width={270}
            />
        );
    } else {
        return (
            <div dangerouslySetInnerHTML={{ __html: formContent }} />
        );
    }
}

export default Page;

