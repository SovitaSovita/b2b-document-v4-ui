'use client'
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { ListAllFormName } from '@/app/service/FormManagement';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/service/Redux/store/store';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { Label } from '@headlessui/react';

interface Form {
    id: number;
    formName: string;
    formContent: string;
    username: string;
    status: number;
    createDate: string;
}

const Page: React.FC = () => {
    const session = useSelector((state: RootState) => state?.article.session);

    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [viewType, setViewType] = useState<'grid' | 'table'>('grid');

    const fetchForms = async () => {
        try {
            const response = await ListAllFormName({
                userId: "vimean",
                status: 0,
            }) as { data?: { rec: Form[] } };
            if (response?.data?.rec) {
                setForms(response.data.rec);
            } else {
                console.error('Invalid response structure:', response);
            }
        } catch (error) {
            console.error('Error fetching forms:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    const handleCardClick = (form: Form) => {
        console.log('Card clicked:', form);
    };

    const renderFormContent = (formContent: string) => {
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
            return <div dangerouslySetInnerHTML={{ __html: formContent }} />;
        }
    };

    const renderGrid = () => (
        <>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {forms.map((form) => (
                    <Card
                        key={form.id}
                        className="py-4 shadow-none border cursor-pointer"
                        onClick={() => handleCardClick(form)}
                    >
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <h4 className="font-bold text-large">{form.formName}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            {renderFormContent(form.formContent)}
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>

    );

    const renderTable = () => (
        <>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2">Form Name</th>
                        <th className="border border-gray-200 px-4 py-2">Form Content</th>
                        <th className="border border-gray-200 px-4 py-2">Username</th>
                        <th className="border border-gray-200 px-4 py-2">Status</th>
                        <th className="border border-gray-200 px-4 py-2">Create Date</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((form) => (
                        <tr key={form.id}>
                            <td className="border border-gray-200 px-4 py-2">{form.formName}</td>
                            <td className="border border-gray-200 px-4 py-2">{renderFormContent(form.formContent)}</td>
                            <td className="border border-gray-200 px-4 py-2">{form.username}</td>
                            <td className="border border-gray-200 px-4 py-2">{form.status}</td>
                            <td className="border border-gray-200 px-4 py-2">{form.createDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>



    );

    return (
        <div className='p-4'>
            {/* Header */}
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">New Form</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
                        <li><a onClick={() => setViewType('grid')}>Grid</a></li>
                        <li><a onClick={() => setViewType('table')}>Table</a></li>
                    </ul>
                </div>
            </div>
            {/* //Header */}
            <br />
            {loading ? (
                <div>Loading...</div>
            ) : (
                viewType === 'grid' ? renderGrid() : renderTable()
            )}
        </div>
    );
};

export default Page;
