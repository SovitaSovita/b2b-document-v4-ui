import React from 'react'
import LeftDrawerCustom from './Profile/LeftDrawerCustom';
import Profile from './Profile/Profile';
import ProfileDrawer from './Profile/ProfileDrawer';
import { Chart21, ChartSuccess, ClipboardExport, Crown, Home } from 'iconsax-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SearchComponent from './Modal/SearchComponent';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';

function Navbar({ session }: any) {
    const router = useRouter()
    const [openSearch, setOpenSearch] = React.useState(false);
    const handleOpenSearch = () => setOpenSearch(true);
    const pathname = usePathname();
    const formatPath = (pathname: string) => {
        return pathname.replace(/^\//, '').split('/');
    }
    return (
        <>
            <div className='flex justify-between items-center w-full mt-3 px-5'>
                <Breadcrumbs size='sm'>
                    <BreadcrumbItem>
                        <Home size={17} />
                    </BreadcrumbItem>
                    {formatPath(pathname).map((item, index) => (
                        <BreadcrumbItem key={index} className="capitalize">{item}</BreadcrumbItem>
                    ))}
                </Breadcrumbs>
                <label className="input input-bordered flex items-center gap-2 bordered input-sm w-full max-w-[200px]">
                    <input disabled={pathname == "/" ? false : true} type="button" onClick={handleOpenSearch} className="grow" value="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>

                <div className='flex items-center'>
                    <LeftDrawerCustom>
                        {/*left Sidebar content here */}
                        <Profile userInfo={session} />
                        <ProfileDrawer userInfo={session} />
                        <li>
                            <div
                                role="button"
                                onClick={() => {
                                    localStorage.removeItem("tid");
                                    router.push("/error");
                                }}
                                className="text-red-500"
                            >
                                Sign out
                            </div>
                        </li>
                    </LeftDrawerCustom>
                </div>
            </div>
            <SearchComponent open={openSearch} setOpen={setOpenSearch} />
        </>
    )
}

export default Navbar