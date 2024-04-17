import React, {useRef, useState} from 'react'
import { X } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast'


const EditUser = ({onClose, user}) => {
    const modalRef = useRef()
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [occupation, setOccupation] = useState(user.occupation);
    const [password, setPassword] = useState(user.password);

    const closeModal=(e)=> {
        if(modalRef.current === e.target){
            onClose();
        }
      }

    const editUser = async (e)=> {
        e.preventDefault();

    const formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('occupation', e.target.occupation.value);
    formData.append('password', e.target.password.value);

    try {
        const response = await fetch(`http://localhost:8000/api/user-update/${user.id}/`, {
          method: 'PUT',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
  
        toast.success('User updated successfully');
        onClose();
      } catch (error) {
        console.error('Failed to update user: ', error);
        toast.error('Failed to update user');
      }

    }


  return (
    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
    <Toaster position='top-left' reverseOrder='false' ></Toaster>
    <div className="mt-10 flex flex-col gap-5 text-black w-2/3">
        <button onClick={onClose} className="place-self-end"><X size={30}/></button>
        <div className="bg-gray-50 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
            <h1>Add a new User</h1>
            <form onSubmit={editUser}>
                <input onChange={e => setUsername(e.target.value)} className="m-2" type="text" name="username" defaultValue={user.username}/>
                <input onChange={e => setEmail(e.target.value)} className="m-2" type="email" placeholder="email" name="email" defaultValue={user.email}/>
                <input onChange={e => setOccupation(e.target.value)} className="m-2" type="text" placeholder="occupation" name="occupation" defaultValue={user.occupation}/>
                <input onChange={e => setPassword(e.target.value)} className="m-2" type="password" placeholder="password" name="password" defaultValue={user.password}/>
                <button className="confirm-btn m-2 p-2 w-20" type="submit">Confirm</button>
            </form>
        </div>
    </div>
</div>
  )
}

export default EditUser