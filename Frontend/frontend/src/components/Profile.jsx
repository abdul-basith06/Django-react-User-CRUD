import React, {useState, useEffect} from 'react'
import { Toaster } from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { getlocal } from '../helpers/auth';

const Profile = () => {
    const { user_id } = jwtDecode(getlocal());
    const [user, setUser] = useState({
        username: '',
        email: '',
        occupation: '',
        profile_img: '',
    });
    const navigate = useNavigate()

  const [profile_img, setProfileImage] = useState(null);
  const [occupation, setOccupation] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    }, [user_id]);

  return (
    <div>
  <div className='flex items-center justify-center mt-16'>

        <div className="bg-pink-50 w-1/3 mt-10 rounded-lg">
            <div className="flex items-center justify-center pt-10 flex-col">
            <img className='rounded-full w-20' src={user.profile_img ? `http://localhost:8000${user.profile_img}/` : `https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg
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
            
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div className='flex items-center justify-center mt-16'>

<div className="bg-pink-50 w-1/3 mt-10 rounded-lg">
    <div className="flex items-center justify-center pt-10 flex-col">
    <img />
<h1 className='mt-5'>{user.username}</h1>
<h1 className='text-gray-400 text-lg p-4'>{user.occupation ? user.occupation : 'Please enter your occupation'}</h1>
    </div>
    <div className='flex justify-between  mb-6'>
        <h2 className='text-gray-400 text-lg pl-8'>{user.email}</h2>
        <button className='edt-btn'>Edit</button>
    </div>
</div>
</div>
            </div>
            </div>  
           
           ) } 
          

  </div>
  )
}

export default Profile