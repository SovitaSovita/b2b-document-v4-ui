"use client"

import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

interface UserData {
  id: number;
  username: string;
  password: string;
  role: string;
  dept_id: string;
  dept_name: string;
  image: string;
}

const UserListByDepartmentPage = () => {
  const [userList, setUserList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<{ userId: number | null, isEdit: boolean }>({
    userId: null,
    isEdit: false
  });

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
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  return (
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
                <span>{user.role}</span>
              </td>
              <td>
                <span>{user.dept_name}</span>
              </td>
              <td className="flex justify-center gap-2">
                {isEditing.userId === user.id && isEditing.isEdit ? (
                  <>
                    <span className="cursor-pointer text-green-500"><SaveIcon /></span>
                    <span className="cursor-pointer text-red-500" onClick={() => setIsEditing({ userId: null, isEdit: false })}><CloseIcon /></span>
                  </>
                ) : (
                  <>
                    <span className="cursor-pointer" onClick={() => setIsEditing({ userId: user.id, isEdit: true })}><EditIcon /></span>
                    <span className="cursor-pointer text-red-500"><DeleteIcon /></span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListByDepartmentPage;





