import React, { useState } from 'react'
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import empty_folder from '../../../public/icon/empty-folder.png'
import Image from 'next/image';
import { DeleteIcon, EditIcon } from '@/public/icon/TableIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';




function DepartmentDoc({ filterArticlesByTagId, TAGS, handleViewArticle, handleOpenTag }: any) {

    const [activeItemId, setActiveItemId] = useState("");
    const [openTag, setOpenTag] = React.useState(false);
    const [tagUpdateData, setTagUpdateData] = React.useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (item: any) => {
        setIsModalOpen(true);
    }


    return (
        <div className="drawer z-50">
            <input id="department_drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="department_drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-primary text-base-content">
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <div>

                            </div>
                            <label htmlFor="department_drawer" aria-label="close sidebar">
                                <div tabIndex={20} role="button" className="btn btn-ghost btn-circle">
                                    <KeyboardReturnOutlinedIcon />
                                </div>
                            </label>
                        </div>
                        <div>
                            {
                                TAGS.map((item: any, index: number) => (
                                    <span className='flex mainManageTag group'>
                                        <div className='w-6'>
                                            <div className="dropdown dropdown-hover dropdown-top mt-2.5 opacity-0 hidden group-hover:block group-hover:opacity-100 transition-all">
                                                <div tabIndex={0} role="button">
                                                    <MoreVertIcon />
                                                </div>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                                                    <li>
                                                        <div className='flex items-center' onClick={() => handleOpenTag(item)}>
                                                            <EditIcon />
                                                            <span>Edit</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='flex items-center text-red-400' onClick={() => openModal(item)}>
                                                            <DeleteIcon />
                                                            <span>Detele</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <li key={index + 1} className='min-w-[260px]'>
                                            <details>
                                                <summary className="mt-1 font-medium">
                                                    {item.title}
                                                </summary>
                                                <ul>
                                                    {
                                                        filterArticlesByTagId(item.id).length > 0 ?
                                                            filterArticlesByTagId(item.id).map((item: any) => (
                                                                <li key={item?.id} onClick={() => handleViewArticle(item.id.toString())}>
                                                                    <a className={activeItemId === item.id.toString()
                                                                        ? "hover:bg-base-100 bg-base-100 border-r-4 border-secondary rounded-none mt-2"
                                                                        : "hover:bg-base-100 hover:border-l-4 border-secondary rounded-none transition-all mt-2"}>
                                                                        {item?.title}
                                                                    </a>
                                                                </li>
                                                            )) : (
                                                                <div className='cursor-default flex flex-col justify-center items-center'>
                                                                    <div>
                                                                        <Image src={empty_folder} alt="no data" height={40} />
                                                                    </div>
                                                                    <p className='text-xs text-base-content'>No Article</p>
                                                                </div>
                                                            )
                                                    }
                                                </ul>
                                            </details>
                                        </li>
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default DepartmentDoc