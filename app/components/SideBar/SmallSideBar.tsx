import { AddCircle, Chart21, ChartSuccess, ClipboardExport, ConvertCard, Convertshape2, Danger, Folder2, FolderAdd, Home, ProfileTick } from 'iconsax-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import logoDocument from "../../../public/icon/Document.png"
import Image from 'next/image'
import { Button } from '@nextui-org/react'

interface Form {
    name: string;
    link: string;
    icon: React.ReactNode;
}

const SmallSideBar = ({ fun_toggleSideBar }: any) => {
    const pathname = usePathname();

    const forms: Form[][] = [
        [
            { name: "Request history", link: "/requests/requestHistory", icon: <ConvertCard size="10" color="black" /> },
            { name: "New Request", link: "/requests/newRequest", icon: <AddCircle size="10" color="black" /> },
        ],
        [
            { name: "Requesting", link: "/approvals/requesting", icon: <Convertshape2 size="10" color="black" /> },
            { name: "Hold", link: "/approvals/holding", icon: <Danger size="10" color="black" /> },
            { name: "Completed", link: "/approvals/completed", icon: <ProfileTick size="10" color="black" /> }
        ],
        [
            { name: "Form List", link: "/formManagement/formList", icon: <Folder2 size="10" color="black" /> },
            { name: "New Form", link: "/formManagement/newForm", icon: <FolderAdd size="10" color="black" /> },
        ]
    ];

    return (
        <div className="bg-base-100 border-r shadow">
            <ul className="rounded-box mt-3 px-2 text-gray-600 text-[10px] w-20" style={{ width: '120px' }}>
                <li className="mb-6">
                    <Image src={logoDocument} alt="Document Logo" width={50} height={50} className="mx-auto" />
                </li>
                <li className="mb-6">
                    <Link href={"/"} className={pathname === "/" ? "text-secondary bg-primary-50 py-1.5 px-2 rounded-lg flex flex-col items-center" : "hover:text-secondary transition-all flex flex-col items-center"}
                        onClick={() => fun_toggleSideBar(pathname)}
                    >
                        <Home className="mb-2" />
                        Document
                    </Link>
                </li>
                <li className="mb-6">
                    <Link href={"/requests/requestHistory"} className={pathname === "/requests/requestHistory" ? "text-secondary bg-primary-50 py-1.5 px-2 rounded-lg flex flex-col items-center" : "hover:text-secondary transition-all flex flex-col items-center"}
                        onClick={() => fun_toggleSideBar("/requests/requestHistory")}
                    >
                        <ChartSuccess className="mb-2" />
                        My Request
                    </Link>
                </li>
                <li className="mb-6">
                    <Link href={"/approvals/requesting"} className={pathname === "/approvals/requesting" ? "text-secondary bg-primary-50 py-1.5 px-2 rounded-lg flex flex-col items-center" : "hover:text-secondary transition-all flex flex-col items-center"}
                        onClick={() => fun_toggleSideBar("/approvals/requesting")}
                    >
                        <Chart21 className="mb-2" />
                        My Approve
                    </Link>
                </li>
                <li className="mb-6">
                    <Link href={"/formManagement/formList"} className={pathname === "/formManagement/formList" ? "text-secondary bg-primary-50 py-1.5 px-2 rounded-lg flex flex-col items-center justify-center text-center" : "hover:text-secondary py-1.5 px-2 transition-all flex flex-col items-center text-center"}
                        onClick={() => fun_toggleSideBar("/formManagement/formList")}
                    >
                        <ClipboardExport className="mb-2" />
                        Form Management
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SmallSideBar;
