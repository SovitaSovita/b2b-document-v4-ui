import React from 'react'
import Profile from './Profile'
import Link from 'next/link'

const LeftDrawerCustom = () => {
    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <Profile />
                    <li>
                        <Link href={"/daraboth/profile"}>
                            Your profile
                        </Link>
                    </li>
                    <li><Link href={"/daraboth/manage"}>Manage User</Link></li>
                    <li><Link href={"/daraboth/test"}>Test</Link></li>
                    <li><Link href={"/daraboth"} className='text-red-500' >Sign out</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default LeftDrawerCustom