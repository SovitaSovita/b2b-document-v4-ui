import FormSideBar from '@/app/components/formComponent/FormSideBar';
import * as React from 'react';

const Layout = async (props: { children: React.ReactNode }) => {
    return (
        <div className='flex bg-primary w-full min-h-screen p-3'>
            <FormSideBar />

            <div className='w-full ml-3 bg-base-100 p-6 rounded-lg'>
                {props.children}
            </div>
        </div>
    )
}

export default Layout
