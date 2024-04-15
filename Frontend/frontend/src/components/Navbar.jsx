import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


const Navbar = () => {

  const navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem('authToken')
    navigate('/login')
    toast.success('Logged out successfully')
  }

  return (
    <div>
        <div>
            <div>
            This is the navbar
            </div>
            <div>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar