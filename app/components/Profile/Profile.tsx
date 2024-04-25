import React from 'react'

const Profile = () => {
    return (
        <div className='mb-5'>
            <div className=''>
                <div className="w-full">
                    <div className="flex flex-row justify-between">
                        <div className='flex flex-row gap-4'>
                            <div className="avatar card-actions justify-start">
                                <div className="w-12 rounded-full">
                                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <h3 className='font-bold'>Daraboth</h3>
                                <h5 className='font-extralight'>Admin</h5>
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