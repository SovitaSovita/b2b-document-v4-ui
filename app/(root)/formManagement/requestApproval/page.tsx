'use client'
import { RootState } from "@/app/service/Redux/store/store"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
function Page() {
    const formData: any = useSelector((state: RootState) => state.form.form)
    const router = useRouter();
    return (
        <>
            <div className="p-4">
                <div>
                    <Button onClick={() => router.back()}>Back</Button>
                </div>
                <h1>{formData?.formName}</h1>
                <h1>{formData?.formNumber}</h1>
            </div>
        </>
    )
}
export default Page