import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import Page from '../(root)/vanda/page';

import LeftDrawerCustom from './Profile/LeftDrawerCustom'
import { useSelector } from 'react-redux';
import { RootState } from '../service/Redux/store/store';

function SideContent() {

    const { article }: { article: any } = useSelector((state: RootState) => state?.article);
    console.log("data's article >>>>>>>>>>>>", article);

    return (
        <div className="drawer-content flex flex-col items-center justify-center p-4">
            {/* Page content here */}
            <div className='flex justify-between w-full mb-3'>
                <Breadcrumbs />

                <label className="input input-bordered flex items-center gap-2 bordered input-sm w-full max-w-xs">
                    <input type="text" className="grow" placeholder="Search" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>

                <div className='flex items-center'>
                    <LeftDrawerCustom />
                </div>

            </div>

            <div className="border-2 rounded-lg border-dashed w-full h-full p-3">
                <div dangerouslySetInnerHTML={{ __html: article?.content_body }} />
                <Page />
            </div>

            {/* <label htmlFor="my-drawer-2" className="btn btn-circle drawer-button lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </label> */}
        </div>
    )
}

export default SideContent;