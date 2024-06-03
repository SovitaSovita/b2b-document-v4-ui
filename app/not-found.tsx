import Link from 'next/link'
import React from 'react'

function notfound() {
    return (
        <div className="bg-gray-100 px-2 text-center">
            <div className="h-screen flex flex-col justify-center items-center">
                <h1 className="text-8xl font-extrabold text-red-500">404</h1>
                <p className="text-4xl font-medium text-gray-800">Page Not Found.</p>
                <p className="text-xl text-gray-800 mt-4">We apologize for the inconvenience. Please try again later.
                    <Link className='link link-secondary' href={"/"}> Home</Link></p>
            </div>
        </div>
    )
}

export default notfound