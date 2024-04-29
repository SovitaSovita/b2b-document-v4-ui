"use client"

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";



import React from 'react'
import { UserData } from '@/app/type/UserType';
import { useSession } from 'next-auth/react';

export default function UserTable() {

    const [userList, setUserList] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<{ userId: number | null, isEdit: boolean }>({
        userId: null,
        isEdit: false
    });

    const [editedUsername, setEditedUsername] = useState<string>('') // New state for edited username

    const session = useSession()
    console.log({ session });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4545/api/v1/user/list-by-department?dept_id=1');
                if (!response.ok) {
                    throw new Error('Failed to fetch user list');
                }
                const data = await response.json();
                if (data.code === "200" && data.error === false && Array.isArray(data.rec)) {
                    setUserList(data.rec);
                    setLoading(false);
                } else {
                    throw new Error('Data is not in the expected format');
                }
            } catch (error) {
                console.error('Error fetching user list:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRoleChange = (userId: number, newRole: string) => {
        setUserList(prevUserList => prevUserList.map(user => {
            if (user.id === userId) {
                return { ...user, role: newRole };
            }
            return user;
        }));
    }

    const handleUsernameEdit = (userId: number) => {
        setIsEditing({ userId, isEdit: true })
        // Find the user with the given userId and set the edited username
        const user = userList.find(user => user.id === userId)
        if (user) {
            setEditedUsername(user.username);
        }
    }

    const handleUsernameSave = async (userId: number) => {
        console.log("Updating username for userID:", userId)
        // Call API update 
        try {
            const response = await fetch(`http://localhost:4545/api/v1/user/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: editedUsername })
            })

            if (!response.ok) {
                throw new Error('Failed to update username');
            }

            // If update was successful, exit editing mode
            setIsEditing({ userId: null, isEdit: false });
        } catch (error) {
            console.log('Error updating username:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-lg">Loading...</span>
            </div>
        );
    }


    return (
        <>
            <div className="overflow-x-auto">
                <table className="table table-pin-cols">
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={user.image} alt="Avatar" />
                                    </div>
                                </td>
                                <td>
                                    {isEditing.userId === user.id && isEditing.isEdit ? (
                                        <input defaultValue={user.username} type="text" />
                                    ) : (
                                        <span>{user.username}</span>
                                    )}
                                </td>
                                <td>
                                    {/* <span>{user.role}</span> */}
                                    {isEditing.userId === user.id && isEditing.isEdit ? (
                                        <select
                                            value={user.role}
                                            onChange={e => handleRoleChange(user.id, e.target.value)} className='select select-bordered select-sm w-full max-w-xs'
                                        >
                                            <option value="1">Admin</option>
                                            <option value="2">User</option>
                                        </select>
                                    ) : (
                                        <span>{user.role}</span>
                                    )}
                                </td>
                                <td>
                                    <span>{user.dept_name}</span>
                                </td>
                                <td className="flex justify-center gap-2">
                                    {isEditing.userId === user.id && isEditing.isEdit ? (
                                        <>
                            
                                            {/* <span className="cursor-pointer text-green-500"><SaveIcon /></span>
                                            <span className="cursor-pointer text-red-500" onClick={() => setIsEditing({ userId: null, isEdit: false })}><CloseIcon /></span> */}
                                            <span className="cursor-pointer text-green-500" onClick={() => handleUsernameSave(user.id)}><SaveIcon /></span>
                                            <span className="cursor-pointer text-red-500" onClick={() => setIsEditing({ userId: null, isEdit: false })}><CloseIcon /></span>
                                        </>
                                    ) : (
                                        <>
                                            
                                            {/* <span className="cursor-pointer" onClick={() => setIsEditing({ userId: user.id, isEdit: true })}><EditIcon /></span>
                                            <span className="cursor-pointer text-red-500"><DeleteIcon /></span> */}
                                            <span className="cursor-pointer" onClick={() => handleUsernameEdit(user.id)}><EditIcon /></span>
                                            <span className="cursor-pointer text-red-500"><DeleteIcon /></span>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
