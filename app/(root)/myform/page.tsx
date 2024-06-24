'use client'
import React, { useEffect, useState } from 'react'
import image from '../myform/K.O.S.I.G.N-CAMBODIA-INVESTMENT-CO.-LTD-300x300.webp'
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Table, TableColumn, TableHeader } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { ListAllFormName } from '@/app/service/FormManagement'
import { useDispatch } from 'react-redux'

function Page() {
    const {id} = useParams();
    const [allforms,setAllForm] = useState([]); 
    const dispatch = useDispatch;

    useEffect(() =>{
        
    })

    function handleListCard (id: number,user_name:string){
        // ListAllFormName(id ,user_name).then((data) => {
        //     setAllForm 
        //     dispatch()
        // })
    }
    
    return (
        <div className='p-4'>
            {/* <img style={{ width: '150px', marginTop: '-55px' }} src='https://www.caftkh.org/wp-content/uploads/2021/08/K.O.S.I.G.N-CAMBODIA-INVESTMENT-CO.-LTD-300x300.png' />
            <div style={{ textAlign: 'center', fontWeight: 'bold', margin: '-35px' }}>
                B2B Department Attendance List on June 2024
                <br />
                <span>Communication Day </span>
                <div className="overflow-x-auto" style={{ margin: '70px' }}>

                </div>

            </div> */}
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
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