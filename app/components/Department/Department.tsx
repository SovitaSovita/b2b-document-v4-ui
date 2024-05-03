"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { DepartmentList } from '@/app/type/DepartmentType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import addDepartment from './addDepartment';
import { url } from 'inspector';
import LoadingCustom from '../Material/Loading';

export default function Department() {
    const [departmentList, setDepartmentList] = useState<DepartmentList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [eidtdeptarment, setCurrentView] = useState('addDepartment');
    const onCickEdit = () => {
        // router.push('/addDepartment');
        setCurrentView('addDepartment')
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = await fetch('http://localhost:4545/api/v1/department/AllDepartment');
                if (!url.ok) {
                    throw new Error('Failed to fetch Data');
                }
                const data = await url.json()
                if (data.code === '200' && data.error === false && Array.isArray(data.rec)) {
                    setDepartmentList(data.rec);
                    setLoading(false);
                } else {
                    throw new Error('Data is not in the expected format')
                }

            } catch (e) {

                setLoading(false)

            }
        };
        fetchData();
    })

    if (loading) {
        return <LoadingCustom />
    }
    const addDepartment = async () => {
        const dept_name = 'B2B';
        console.log("nameDept", dept_name)
        try {
            const url = await fetch('http://localhost:4545/api/v1/department/insertDepartment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dept_name }),
            });
            const data = await url.json();
            console.log(data)

        } catch (error) {
            console.log(error)

        }

    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl" style={{ left: '20px', top: '20px', border: '1px solid', width: '500px' }}>
                <div className="card-body">
                    <h2 className="card-title">Department</h2>
                    <input type="text" placeholder="Add Department" className="input input-bordered w-full max-w-l" />
                    <span>
                        <button className="btn" style={{ marginLeft: '350px', position: 'absolute', top: '67px', right: '30px' }} onClick={addDepartment}>Add</button>
                    </span>


                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departmentList.map(deptlst => (
                                        <tr>
                                            <th>{deptlst.dept_id}</th>
                                            <td>{deptlst.dept_name}</td>
                                            <td>
                                                <FontAwesomeIcon icon={faEdit} style={{ width: '24px', height: '24px', marginRight: '10px' }} onClick={onCickEdit} />
                                                <FontAwesomeIcon icon={faTrashCan} style={{ width: '24px', height: '24px' }} />
                                            </td>

                                        </tr>
                                    ))
                                }



                            </tbody>
                        </table>
                    </div>


                </div>

            </div>
        </div>

    );

};



