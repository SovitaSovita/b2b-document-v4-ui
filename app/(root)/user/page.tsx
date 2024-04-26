"use client"

import { useEffect, useState } from "react"

// async function getData() {
//     const res = await fetch('http://localhost:4545/api/v1/user/list-by-department?dept_id=1')


//     if (!res.ok) {

//         throw new Error('Failed to fetch data')
//     }

//     return res.json()

// }

// export default async function Page() {
//     const data = await getData()
//     console.log(data)

//     return <main></main>
// }








interface UserData {
    id: number;
    username: string;
    password: string;
    role: string;
    dept_id: string;
    // Add other properties if available in your JSON response
}

const UserListByDepartmentPage = () => {
    const [userList, setUserList] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        
        <div className="overflow-x-auto">
            <table className="table">
                
                <thead>
                    <tr>
                        
                        <th>Username</th>
                        <th>Role</th>
                        <th>Department</th>
                       
                    </tr>
                </thead>
                <tbody>
                   
                    {/* <tr>
                        
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Hart Hagerty</div>
                                    
                                </div>
                            </div>
                        </td>
                        <td>
                            Zemlak, Daniel and Leannon
                        </td>
                        <td>Purple</td>
                        
                    </tr> */}
                    {userList.map(user => (
                        <tr key={user.id}>
                            <td className="flex items-center gap-3">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                </div>
                                <div>
                                    <div className="font-bold">{user.username}</div>
                                </div>
                            </td>
                            <td>
                                <span>{user.role}</span>
                            </td>
                            <td>
                                {/* <span>{user.}</span> */}
                            </td>

                        </tr>
                    ))}
                    
                    
                </tbody>
                
                

            </table>
        </div>
    );
};

export default UserListByDepartmentPage;




