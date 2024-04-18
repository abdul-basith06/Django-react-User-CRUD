import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { jwtDecode } from 'jwt-decode'
import { getlocal } from "../../helpers/auth";
import toast from 'react-hot-toast'
import { useSelector } from "react-redux";

const EditProfileModal = ({  onClose, user, setUser  }) => {

  const modalRef = useRef()
  const { user_id } = jwtDecode(getlocal());
  const [profile_img, setProfileImage] = useState('');
  const [occupation, setOccupation] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const {darkMode} = useSelector((state)=> state.darkMode)

  const closeModal=(e)=> {
    if(modalRef.current === e.target){
        onClose();
    }
  }



  const updateProfile= async (e)=> {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('occupation', e.target.occupation.value);
    formData.append('is_active',true)
    if (profile_img) {
        formData.append('profile_img', profile_img);
    }

    try {
                const response = await fetch(`http://localhost:8000/api/user-update/${user_id}/`, {
                    method: 'PUT',
                    body: formData
                });
        
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
        
                toast.success('User details updated successfully');   
                setUser((prevUser) => ({
                    ...prevUser,
                    username: e.target.username.value,
                    email: e.target.email.value,
                    occupation: e.target.occupation.value,
                    profile_img: profile_img ? URL.createObjectURL(profile_img) : prevUser.profile_img
                }));
                
                setProfileImage('');
                onClose()            
            } catch (error) {
                console.error('Failed to update user: ', error);
                toast.error('Failed to update user');
            }


  };

  return (
    <div ref={modalRef} onClick={closeModal} className={`${
        darkMode ? 'dark' : ''} fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center `}>
        <div className="mt-10 flex flex-col gap-5 text-black w-2/3">
            <button onClick={onClose} className="place-self-end"><X size={30}/></button>
            <div className="bg-cyan-50 dark:bg-neutral-900 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                <h1 className="dark:text-white">Edit Profile</h1>
                <img className='rounded-full w-28 h-28' src={user.profile_img ? `http://localhost:8000${user.profile_img}` : 'https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg'} alt="profile pic" />
                <form onSubmit={updateProfile}>
                <input className="dark:text-white"
                            type="file"
                            name="profile_img" 
                            onChange={e => setProfileImage(e.target.files[0])}
                        />
                    <input onChange={e => setUsername(e.target.value)} className="m-2" type="text" placeholder="Username" name="username" defaultValue={user.username}/>
                    <input onChange={e => setEmail(e.target.value)} className="m-2" type="text" placeholder="email" name="email" defaultValue={user.email}/>
                    <input onChange={e => setOccupation(e.target.value)} className="m-2" type="text" placeholder="occupation" name="occupation" defaultValue={user.occupation ? user.occupation : 'Occupation...'}/>
                    <button className="confirm-btn m-2 p-2 w-20" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    </div>
);
};

export default EditProfileModal;
