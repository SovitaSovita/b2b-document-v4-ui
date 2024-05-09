"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { DepartmentList } from '@/app/type/DepartmentType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import addDepartment from './addDepartment';
import { url } from 'inspector';
import ihttp from '@/app/utils/xhttp';
import { fetchData } from 'next-auth/client/_utils';

export default function Department() {

    const [dept_name, setDept_name] = useState('');
    const [departmentList, setDepartmentList] = useState<DepartmentList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [eidtdeptarment, setCurrentView] = useState('addDepartment');
   
        const fetchData = async () => {
            try {
                const url = await ihttp.get('http://192.168.178.72:8086/api/v1/department/AllDepartment');
                setDepartmentList(url.data.rec);
            } catch (e) {
                //setLoading(false)
            }
        };
        fetchData();


    
    // const addDepartment = async () => {    
        
    //     const  dept_name  = (document.getElementById('deptName') as HTMLInputElement).value;
    //      const   created_by = 'Admin'
        
    //     try {
    //         console.log(dept_name)
    //         if(dept_name === ''){
    //             alert("Department Can't be empty")
    //             return;
    //         }else{
    //             const url = await ihttp.post('http://localhost:4545/api/v1/department/insertDepartment',{ dept_name , created_by })
    //             fetchData();
    //         }
            
    //     } catch (error) {
    //         console.log(error)

    //     }

    // }

    // if (loading) {
    //     return <p>Loading.....</p>
    // }

    const removeDept = async () => {
        
    }

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl" style={{ left: '20px', top: '20px', border: '1px solid', width: '500px' }}>
                <div className="card-body">
                    <h2 className="card-title">Department</h2>
                    <input type="text" placeholder="Add Department" style={{ width: '370px' }} id="deptName" className="input input-bordered w-full max-w-l" />
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
                                        <tr key={deptlst?.dept_id}>
                                            <th>{deptlst.dept_id}</th>
                                            <td>{deptlst.dept_name}</td>
                                            <td>
                                                <FontAwesomeIcon icon={faEdit} style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                                                <FontAwesomeIcon icon={faTrashCan} style={{ width: '24px', height: '24px', cursor: 'pointer' }} onClick={removeDept} />
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



