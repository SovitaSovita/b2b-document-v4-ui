import Image from 'next/image'
import React from 'react'

const Profile = ({ userInfo }: { userInfo: any }) => {
    return (
        <div className='mb-5'>
            <div className=''>
                <div className="w-full">
                    <div className="flex flex-row justify-between">
                        <div className='flex flex-row gap-4'>
                            <div className="avatar card-actions justify-start">
                                <div className="w-12 rounded-full">
                                    <Image src={userInfo?.image ? userInfo.image : userInfo?.prfl_PHTG} alt="pf" width={140} height={100} loading="lazy" />
                                </div>
                            </div>
                            <div className='flex flex-col justify-center'>
                                <h3 className='font-bold'>{userInfo?.name ?? userInfo?.flnm}</h3>
                                <h5 className='font-extralight text-xs'>{userInfo?.jbcl_NM}</h5>
                            </div>
                        </div>
                        <div className="card-actions justify-end">
                            <label htmlFor="my-drawer-4" aria-label="close sidebar">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile