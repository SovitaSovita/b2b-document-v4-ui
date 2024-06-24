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

interface FormSectionProps {
    index: number;
    name: string;
    isVisible: boolean;
    toggleVisibility: (index: number) => void;
    forms: Form[];
    icon: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ index, name, isVisible, toggleVisibility, forms, icon }) => (
    <li className="mb-6">
        <span className="flex flex-col items-center cursor-pointer" onClick={() => toggleVisibility(index)}>
            {icon}
            {name}
        </span>
        {isVisible && (
            <ul className="visible h-full opacity-100 transition-all text-center menu menu-xs bg-base-100 w-20">
                {forms.map((form, idx) => (
                    <li key={idx}>
                        <Link href={form.link}>
                            {form.icon} {form.name}
                        </Link>
                    </li>
                ))}
            </ul>
        )}
    </li>
);

const SmallSideBar = ({ fun_toggleSideBar }: any) => {

    const toggleSideBar = () => {
        alert()
    }
    const pathname = usePathname();
    const [visibleStates, setVisibleStates] = useState<boolean[]>([false, false, false]);

    const toggleVisibility = (index: number) => {
        setVisibleStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    const formNames = ["My Request", "My Approve", "Form Management"];
    const icons = [<ChartSuccess className="mb-2" />, <Chart21 className="mb-2" />, <ClipboardExport className="mb-2" />];

    const forms: Form[][] = [
        [
            { name: "Request history", link: "/", icon: <ConvertCard size="10" color="black" /> },
            { name: "New Request", link: "/request", icon: <AddCircle size="10" color="black" /> },
        ],
        [
            { name: "Requesting", link: "/", icon: <Convertshape2 size="10" color="black" /> },
            { name: "Hold", link: "/", icon: <Danger size="10" color="black" /> },
            { name: "Completed", link: "/approveMenu", icon: <ProfileTick size="10" color="black" /> }
        ],
        [
            { name: "Form List", link: "/myform", icon: <Folder2 size="10" color="black" /> },
            { name: "New Form", link: "/", icon: <FolderAdd size="10" color="black" /> },
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
                        onClick={() => fun_toggleSideBar()}
                    >
                        <Home className="mb-2" />
                        Document
                    </Link>
                </li>
                {formNames.map((name, index) => (
                    <FormSection
                        key={index}
                        index={index}
                        name={name}
                        isVisible={visibleStates[index]}
                        toggleVisibility={toggleVisibility}
                        forms={forms[index]}
                        icon={icons[index]}
                    />
                ))}
            </ul>
        </div>
    );
}

export default SmallSideBar;
