import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import Page from '../(root)/vanda/page';

import LeftDrawerCustom from './Profile/LeftDrawerCustom'

function SideContent() {

    return (
        <div className="drawer-content flex flex-col items-center justify-center p-4">
            {/* Page content here */}
            <div className='flex justify-between w-full mb-3'>
                <Breadcrumbs />

                <div className='flex items-center'>
                    <LeftDrawerCustom />
                </div>

            </div>

            <div className="border-2 rounded-lg border-dashed w-full h-full">
                 <Page/>
            </div>

            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        </div>
    )
}

export default SideContent;