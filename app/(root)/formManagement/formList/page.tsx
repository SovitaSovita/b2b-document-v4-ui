'use client'
import React, { useEffect, useState } from 'react'
import image from '../myform/K.O.S.I.G.N-CAMBODIA-INVESTMENT-CO.-LTD-300x300.webp'
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Table, TableColumn, TableHeader } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { ListAllFormName } from '@/app/service/FormManagement'
import { useDispatch } from 'react-redux'

function Page() {
    const { id } = useParams();
    const [allforms, setAllForm] = useState([]);
    const dispatch = useDispatch;

    useEffect(() => {
        ListAllFormName(0,"sovita");
        console.log("dagaha")
    },[])


    return (
        <div className='p-4'>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {
                    // getForm.map(() =>{ 
                    //     return 
                    // })
                }
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">test</p>
                        <small className="text-default-500">12 Tracks</small>
                        <h4 className="font-bold text-large">Frontend Radio</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://nextui.org/images/hero-card-complete.jpeg"
                            width={270}
                        />
                    </CardBody>
                </Card>
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">Daily Mix</p>
                        <small className="text-default-500">12 Tracks</small>
                        <h4 className="font-bold text-large">Frontend Radio</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://nextui.org/images/hero-card-complete.jpeg"
                            width={270}
                        />
                    </CardBody>
                </Card>
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">Daily Mix</p>
                        <small className="text-default-500">12 Tracks</small>
                        <h4 className="font-bold text-large">Frontend Radio</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://nextui.org/images/hero-card-complete.jpeg"
                            width={270}
                        />
                    </CardBody>
                </Card>
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">Daily Mix</p>
                        <small className="text-default-500">12 Tracks</small>
                        <h4 className="font-bold text-large">Frontend Radio</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://nextui.org/images/hero-card-complete.jpeg"
                            width={270}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>


    )
}

export default Page