import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login, { getlocal} from '../helpers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { updateAuthToken, updateUser } from '../features/authSlice'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
  const {darkMode} = useSelector((state)=> state.darkMode)
  const navigate = useNavigate()
  const response = getlocal()
  const [error, setError] = useState(null);
  const {user,authToken} = useSelector((state)=> state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (response) {
      navigate('/')
    }
  })

  const handleSubmit= async(e)=>{
    e.preventDefault()
    if (e.target.email.value.trim()===""){
      toast.error("Please enter email field!")
    }

    try{
      const response= await login(e)
      const decoded=jwtDecode(response.access)
  
      dispatch(updateUser(decoded))
      dispatch(updateAuthToken(response))
      toast.success('Login successful')
      navigate('/')
      
      
    }catch(err){
      setError('Invalid email or password.');
      toast.error(err.message);
    }


  }


  return (
    <div className={`${
      darkMode ? 'dark' : ''} flex justify-center items-center mx-auto px-4 py-8 min-h-screen bg-teal-900 dark:bg-slate-900`}>
    <div className='w-5/12 p-6 shadow-lg bg-cyan-50 dark:bg-neutral-900 rounded-md mt-12'>
      <Toaster position='top-left' reverseOrder='false' ></Toaster>
      <h2 className="text-3xl font-medium mb-4 text-black dark:text-white text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
          <input type="text" placeholder='email' name='email'/>
          </div>
        <div className='mb-4'>
        <input type="text" placeholder='password' name='password'/>
        </div>
        
        <button className='sbmt'type='submit'>Submit</button>
        </form>
        <div className="flex justify-between mt-4 dark:text-white">
        <p>Dont have an account..??</p>
<h6 className='text-#1d4ed8'><Link to='/register'>Register here</Link></h6>
        </div>

</div>
    </div>
  )
}

export default Login