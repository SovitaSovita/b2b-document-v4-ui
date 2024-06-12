'use client'
import React from 'react'
import logoDocument from "../../../public/icon/Document.png"
import Image from 'next/image'
import { Chart21, ChartSuccess, ClipboardExport } from 'iconsax-react'
import { usePathname } from 'next/navigation'
import HeaderSidebar from '../SideBar/HeaderSidebar'
import Link from 'next/link'


function FormSideBar() {
    const pathname = usePathname()
    const formatPath = (pathname: any) => {
        return pathname.replace(/^\//, '').split('/');
    }
    return (
        <div className='bg-base-100 px-2 rounded-lg'>
            <HeaderSidebar handleOpenArticle={null} isForm={true} />

            <ul className="rounded-box mt-6 px-2 text-gray-600 text-sm">
                <li className='mb-6'>
                    <Link href={"/form/myform"}
                        className={
                            pathname === "/form/myform" ?
                                `text-secondary bg-primary-50 py-1.5 px-4 rounded-lg flex items-center`
                                : `hover:border-none hover:text-secondary hover:ml-2 transition-all flex items-center`}>
                        <Chart21 className='mr-2' />
                        My Form
                    </Link>
                </li>
                <li className='mb-6'>
                    <Link href={"/form/request"}
                        className={
                            pathname === "/form/request" ?
                                `text-secondary bg-primary-50 py-1.5 px-4 rounded-lg flex items-center`
                                : `hover:border-none hover:text-secondary hover:ml-2 transition-all flex items-center`}
                    >
                        <ClipboardExport className='mr-2' />
                        Request
                    </Link>
                </li>
                <li className=''>
                    <Link href={"/form/approve"}
                        className={
                            pathname === "/form/approve" ?
                                `text-secondary bg-primary-50 py-1.5 px-4 rounded-lg flex items-center`
                                : `hover:border-none hover:text-secondary hover:ml-2 transition-all flex items-center`}
                    >
                        <ChartSuccess className='mr-2' />
                        Approve
                    </Link>
                </li>
            </ul>
        </div >
    )
}

export default FormSideBar