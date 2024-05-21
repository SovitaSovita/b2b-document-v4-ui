import * as React from 'react';

const Layout = async (props: { children: React.ReactNode }) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default Layout
