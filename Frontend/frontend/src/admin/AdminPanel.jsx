import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'
import AddUserModal from "../components/modals/AddUserModal";

const AdminPanel = () => {
  const [userList, setUserList] = useState([]);
  const [addIsOpen, setAddIsOpen] = useState(false)

  useEffect(() => {
    async function getUserList() {
      const response = await axios.get(
        "http://localhost:8000/api/class-userlist/"
      );
      setUserList(response.data);
      // setUser(response.data)
    }
    getUserList();
  }, [addIsOpen]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position='top-left' reverseOrder='false' ></Toaster>
      {/* Sidebar */}
      <div className="flex-shrink-0 w-64 bg-white border-r">
        <div className="flex flex-col h-full py-4 px-4">
          <button onClick={()=> setAddIsOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Add User
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-4">User List</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupation
                </th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {addIsOpen && (
        <AddUserModal onClose={()=> setAddIsOpen(false)}/>
      )}


    </div>
  );
};

export default AdminPanel;
