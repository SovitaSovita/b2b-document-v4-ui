import { usePathname } from 'next/navigation';
import React from 'react'

function Breadcrumbs() {

    const pathname = usePathname();
    const formatPath = (pathname: string) => {
        return pathname.replace(/^\//, '').split('/');
    }

    console.log(pathname)

    return (
        <div className="text-sm breadcrumbs">
            <ul>
                <li><a>Home</a></li>
                <li><a>Documents</a></li>
                <li>Add Document</li>
            </ul>
        </div>
    )
}

export default Breadcrumbs