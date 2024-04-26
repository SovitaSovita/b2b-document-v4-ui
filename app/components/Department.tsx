import React from 'react';
import { useEffect } from 'react';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Department() {

    return (
        <div>
            {/* The button to open modal */}
            <label htmlFor="my_modal_6" className="btn">Department</label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Department</h3>
                    {/* <p className="py-4">This modal works with a hidden checkbox!</p> */}
                    <div style={{ padding: '20px' }}>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>

                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Title</th>
                                    <th></th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                           
                                    <tr>
                                        <th></th>
                                        <td>B2B</td>
                                        {/*                                 
                          <td>
                              <FontAwesomeIcon icon={faEdit} style={{width:'24px',height:'24px'}}/>
                          </td>
                          <td>
                              <FontAwesomeIcon icon={faTrashCan} style={{width:'24px',height:'24px'}}/>
                          </td>
                       */}
                                    </tr>
                                


                            </tbody>
                        </table>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn">Close!</label>
                    </div>
                </div>
            </div>
        </div>
    );

};

export async function getDepartment() {
    const res : Response = await fetch('http://192.168.178.239:9001/api/v1/department/AllDepartment');
    const data = await res.json();
    return {
        props: {
            data,
        }
    }

}

export default Department;
