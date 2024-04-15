import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login, { getlocal} from '../helpers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { updateAuthToken, updateUser } from '../features/authSlice'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {

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
    <div>
      <Toaster position='top-left' reverseOrder='false' ></Toaster>
        Login Page
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='email' name='email'/>
        <input type="text" placeholder='password' name='password'/>
        <button type='submit'>Submit</button>
        </form>
<p>Dont have an account</p>
<h6><Link to='/register'>Register here</Link></h6>
    </div>
  )
}

export default Login