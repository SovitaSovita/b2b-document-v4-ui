import React, { ReactNode } from 'react'
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import NoProfileComponent from './NoProfileComponent';
import Image from 'next/image';

function ProfileDrawer({ userInfo }: { userInfo: any }) {
    return (
        <div className="drawer drawer-end z-30">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-3">
                    <div
                        tabIndex={0}
                        role="button"
                        className='hover:bg-base-300 px-4 py-2 rounded-lg'
                    >
                        My Profile
                    </div>
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar">
                        <div tabIndex={20} role="button" className="btn btn-ghost btn-circle">
                            <KeyboardReturnOutlinedIcon />
                        </div>
                    </label>

                    <div className='flex justify-center flex-col items-center'>
                        {
                            userInfo?.prfl_PHTG != "" ? (
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <Image width={24} height={24} alt='pf' src={userInfo?.image ? userInfo.image : userInfo?.prfl_PHTG} />
                                    </div>
                                </div>
                            ) : (
                                <NoProfileComponent username={userInfo?.flnm} size={"w-24"} />
                            )
                        }


                        <h2 className="card-title mt-3">{userInfo?.name ?? userInfo?.flnm}</h2>
                        <p>{userInfo?.jbcl_NM}</p>

                        <div className='flex justify-between w-full mt-6 px-6'>
                            <div>Department</div>
                            <p>{userInfo?.dvsn_NM}</p>
                        </div>
                        <div className='flex justify-between w-full mt-3 px-6'>
                            <div>Phone Number</div>
                            <p>0{userInfo?.clph_NO}</p>
                        </div>
                        <div className='flex justify-between w-full mt-3 px-6'>
                            <div>Email</div>
                            <p className='line-clamp-1'>{userInfo?.eml}</p>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default ProfileDrawer