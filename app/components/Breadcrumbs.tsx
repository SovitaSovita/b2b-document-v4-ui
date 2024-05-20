import { usePathname } from 'next/navigation';
import React from 'react'

function Breadcrumbs() {

    const pathname = usePathname();
    const formatPath = (pathname: string) => {
        return pathname.replace(/^\//, '').split('/');
    }

    return (
        <div className="text-sm breadcrumbs">
            <ul>
                {formatPath(pathname).map((item, index) => (
                    <li key={index} className="capitalize"><a>{item === "" ? "Home" : item}</a></li>
                ))}
            </ul>
        </div>
    )
}
               
export default Breadcrumbs