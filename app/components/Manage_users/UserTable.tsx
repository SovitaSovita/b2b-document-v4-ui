"use client"

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { DeleteIcon, EditIcon } from "@/public/icon/TableIcon";
import LoadingCustom from "../Material/Loading";

export default function UserTable() {

    const { data: session, status }: { data: any, status: any } = useSession();
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState([]);

    console.log("status : ", status);
    console.log("session : ", session); // session user

    useEffect(() => {
        if (status === "authenticated") {
            setLoading(false)
        }
    }, [status])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingCustom />
            </div>
        );
    }

    return (
        <>
            <div className="overflow-x-auto flex justify-center items-center mt-14 px-24">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="text-base">Name</th>
                            <th className="text-base">Department</th>
                            <th className="text-base">Email</th>
                            <th className="text-base"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={session?.user.image ? session.user.image : session?.user.prfl_PHTG} alt="pf" width={140} height={100} loading="lazy" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{session?.user.flnm}</div>
                                        <div className="text-sm opacity-50">{session?.user.jbcl_NM}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{session?.user.dvsn_NM}</td>
                            <td>{session?.user.eml}</td>
                            <td>
                                <div className="flex items-center">
                                    <EditIcon className="mr-3 cursor-pointer" />
                                    <DeleteIcon className="cursor-pointer" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}


