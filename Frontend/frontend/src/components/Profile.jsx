import React, {useState, useEffect} from 'react'
import { Toaster } from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getlocal } from '../helpers/auth';
import EditProfileModal from './modals/EditProfileModal'

const Profile = () => {
    const { user_id } = jwtDecode(getlocal());
    const [user, setUser] = useState({
        username: '',
        email: '',
        occupation: '',
        profile_img: '',
    });

  const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(`http://localhost:8000/api/user-details/${user_id}/`);
         
                setUser(response.data);
  
               
            } catch (error) {
                console.error('Failed to fetch user details:', error);
                toast.error(err.message);
            }
        }
        getUser();
    }, [user_id, isOpen]);



  return (
    <div>
  <div className='flex items-center justify-center mt-16'>
  <Toaster position='top-left' reverseOrder='false' ></Toaster>
        <div className="bg-pink-50 w-1/3 mt-10 rounded-lg">
            <div className="flex items-center justify-center pt-10 flex-col">
            <img className='rounded-full w-28 h-28' src={user.profile_img ? `http://localhost:8000${user.profile_img}/` : `https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg
`} alt="profile pic" />
<h1 className='mt-5'>{user.username}</h1>
<h1 className='text-gray-400 text-lg p-4'>{user.occupation ? user.occupation : 'Please enter your occupation'}</h1>
            </div>
            <div className='flex justify-between  mb-6'>
                <h2 className='text-gray-400 text-lg pl-8'>{user.email}</h2>
                <button onClick={()=>setIsOpen(true)} className='edt-btn'>Edit</button>
            </div>
</div>
  </div>


  {isOpen && (
        <EditProfileModal onClose={()=> setIsOpen(false)} user={user} setUser={setUser}/>
      )}
          

  </div>
  )
}

export default Profile