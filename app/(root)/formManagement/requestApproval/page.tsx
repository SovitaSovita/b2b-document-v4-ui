'use client'
import { RootState } from "@/app/service/Redux/store/store"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
function Page() {

    const formData: any = useSelector((state: RootState) => state.form.form)
    console.log(formData)
    
    return (
        <>
            <div className="p-4">
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl"></a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li><a>Request approval</a></li>
                        </ul>
                    </div>
                </div>
                <hr></hr>
                <h1>{formData?.formName}</h1>
                <h1>{formData?.formNumber}</h1>
            </div>
        </>
    )
}
export default Page