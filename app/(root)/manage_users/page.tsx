"use client"

import { useEffect, useState } from "react"

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
  // Add other properties if available in your JSON response
}

const UserListByDepartmentPage = () => {
  const [userList, setUserList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditting, setEditting] = useState({
    userId: 0,
    isEdit: false
  });
  const [updatedUser, setUpdatedUser] = useState<UserData>();

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
      <button className="btn">
        <span className="loading loading-spinner">loading</span>
      </button>
    );
  }

  const handleChange = () => {

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
          {userList.map(user => {
            if (user.id == isEditting.userId && isEditting.isEdit) {
              return (
                <tr key={user.id}>
                  <td>
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </td>
                  <td className="flex items-center gap-3">
                    <label className="input input-bordered flex items-center gap-2">
                      <input placeholder={user.username} defaultValue={user.username} type="text" />
                    </label>
                  </td>
                  <td>
                    <span>{user.role}</span>
                  </td>
                  <td>
                    <span>{user.dept_name}</span>
                  </td>
                  <td className="flex flex-row justify-between gap-2">
                    <span className="flex-1 text-center cursor-pointer"><SaveIcon /></span>
                    <span
                      className="flex-1 text-center text-red-500 cursor-pointer"
                      role="button"
                      onClick={() => {
                        setEditting({
                          isEdit: false,
                          userId: 0
                        })
                        setUpdatedUser({} as UserData)
                      }}
                    >
                      <CloseIcon />
                    </span>
                  </td>
                </tr>
              )
            } else {
              return (
                <tr key={user.id}>
                  <td>
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </td>
                  <td className="flex items-center gap-3">
                    <label className="input font-bold flex items-center gap-2 relative bg-transparent focus:outline-0 border-none outline-none">
                      <h3 className="absolute" >{user.username}</h3>
                      <input placeholder={user.username} defaultValue={user.username} className="opacity-0 focus:outline-0 border-none outline-none" type="text" />
                    </label>
                  </td>
                  <td>
                    <span>{user.role}</span>
                  </td>
                  <td>
                    <span>{user.dept_name}</span>
                  </td>
                  <td className="flex flex-row justify-between gap-2">
                    <span
                      role="button"
                      onClick={() => {
                        setEditting({
                          isEdit: true,
                          userId: user.id
                        })
                      }}
                      className="flex-1 text-center cursor-pointer"
                    >
                      <EditIcon />
                    </span>
                    <span className="flex-1 text-center text-red-500 cursor-pointer"><DeleteIcon /></span>
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>


      {/* Modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>

  );
};

export default UserListByDepartmentPage;




