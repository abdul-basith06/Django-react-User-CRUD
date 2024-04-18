import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import AddUserModal from "../components/modals/AddUserModal";
import EditUser from "../components/modals/EditUser";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const [userList, setUserList] = useState([]);
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const {darkMode} = useSelector((state)=> state.darkMode)

  useEffect(() => {
    async function getUserList() {
      const response = await axios.get(
        "http://localhost:8000/api/class-userlist/"
      );
      setUserList(response.data);
      // setUser(response.data)
    }
    getUserList();
  }, [addIsOpen, editIsOpen]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const user = axios
          .delete(`http://localhost:8000/api/user-delete/${id}/`)
          .then(async function getUserList() {
            const request = await axios.get(
              "http://localhost:8000/api/user-list/"
            );

            setUserList(request.data);
          });
      }
    });
  };

  const handleEdit = (userId) => {
    const selectedUser = userList.find(user => user.id === userId);
    setSelectedUser(selectedUser);
    setEditIsOpen(true);
  };

  async function serachUser(keyword) {
    const request = await axios.get(`http://localhost:8000/api/class-userlist/?search=${keyword}`)
    if (request.data.length === 0) {

    }
    setUserList(request.data)
}

  return (
    <div className= {`${
      darkMode ? 'dark' : ''} flex h-screen bg-gray-100 dark:bg-slate-900`}>
      <Toaster position="top-left" reverseOrder="false"></Toaster>
      {/* Sidebar */}
      <div className="flex-shrink-0 w-64 bg-white dark:bg-black border-r">
        <div className="flex flex-col h-full py-4 px-4">
          <button
            onClick={() => setAddIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
             {/* Search Bar */}
             <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            onChange={e => serachUser(e.target.value)}
            className="px-4 py-2 border dark:text-white dark:bg-slate-800 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <h1 className="text-2xl font-semibold mb-4 dark:text-white">User List</h1>
        <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-slate-800 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  User Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Occupation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                  Delete
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Edit
                </th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 dark:text-white divide-y divide-gray-200">
              {userList.map((user, index) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.occupation}
                  </td>
                  <td>
                    {" "}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="dlt-btn"
                    >
                      Delete
                    </button>
                  </td>
                  <td>                 
                    <button  onClick={() => handleEdit(user.id)} className="dlt-btn  bg-blue-500 hover:bg-blue-700">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {addIsOpen && <AddUserModal onClose={() => setAddIsOpen(false)} />}

      {editIsOpen && <EditUser onClose={() => setEditIsOpen(false)} user={selectedUser}/>}
    </div>
  );
};

export default AdminPanel;
