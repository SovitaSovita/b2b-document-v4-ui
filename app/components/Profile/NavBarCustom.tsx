"use client"
import React from 'react'
import LeftDrawerCustom from './LeftDrawerCustom'

const NavBarCustom = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <LeftDrawerCustom />
            </div>
        </div>
    )
}

export default NavBarCustom