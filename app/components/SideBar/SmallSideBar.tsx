import { Chart21, ChartSuccess, ClipboardExport, Home } from 'iconsax-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import logoDocument from "../../../public/icon/Document.png"
import Image from 'next/image'


function SmallSideBar() {
    const pathname = usePathname();

    return (
        <div className='bg-base-100 border-r shadow'>
            <ul className="rounded-box mt-3 px-2 text-gray-600 text-[10px] w-20">
                <li className='mb-6'>
                    <Image src={logoDocument} alt="" width={50} height={50} className='mx-auto' />
                </li>
                <li className='mb-6'>
                    <Link href={"/"}
                        className={
                            pathname === "/" ?
                                `text-secondary bg-primary-50 py-1.5 px-2 rounded-lg flex flex-col items-center`
                                : `hover:border-none hover:text-secondary hover:ml-2 transition-all flex flex-col items-center`}>
                        <Home className='mb-2' />
                        Document
                    </Link>
                </li>
                <li className='mb-6'>
                    <Link href={"/myform"}
                        className={
                            pathname === "/myform" ?
                                `text-secondary bg-primary-50 py-1.5 px-2 rounded-lg flex flex-col items-center`
                                : `hover:border-none hover:text-secondary hover:ml-2 transition-all flex flex-col items-center`}>
                        <Chart21 className='mb-2' />
                        My Form
                    </Link>
                </li>
                <li className='mb-6'>
                    <Link href={"/request"}
                        className={
                            pathname === "/request" ?
                                `text-secondary bg-primary-50 py-1.5 px-4 rounded-lg flex flex-col items-center`
                                : `hover:border-none hover:text-secondary hover:ml-2 transition-all flex flex-col items-center`}
                    >
                        <ClipboardExport className='mb-2' />
                        Request
                    </Link>
                </li>
                <li className=''>
                    <Link href={"/approve"}
                        className={
                            pathname === "/approve" ?
                                `text-secondary bg-primary-50 py-1.5 px-4 rounded-lg flex flex-col items-center`
                                : `hover:border-none hover:text-secondary hover:ml-2 transition-all flex flex-col items-center`}
                    >
                        <ChartSuccess className='mb-2' />
                        Approve
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SmallSideBar