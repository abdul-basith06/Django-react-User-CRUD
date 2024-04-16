import React, {useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


const Navbar = () => {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);


  const logout=()=>{
    localStorage.removeItem('authToken')
    navigate('/login')
    toast.success('Logged out successfully')
  }

  const  Menu = ()=> {
    setIsOpen(!isOpen);
  }

  return (
    <div>

<nav className="p-5 bg-pink-50 shadow md:flex md:items-center md:justify-between">
    <div className="flex justify-between items-center ">
      <span className="text-2xl font-[Poppins] cursor-pointer">
        tailwind
      </span>

      <span className="text-3xl cursor-pointer mx-2 md:hidden block">
        <ion-icon onClick={Menu} name={isOpen ? 'close' : 'menu'} ></ion-icon>
      </span>
    </div>

    <ul className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-pink-50 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500 ${isOpen ? 'top-[80px] opacity-100' : ''} `}>
      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl hover:text-cyan-500 duration-500">HOME</a>
      </li>
      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl hover:text-cyan-500 duration-500">SERVICE</a>
      </li>
      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl hover:text-cyan-500 duration-500">ABOUT</a>
      </li>
      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl hover:text-cyan-500 duration-500">CONTACT</a>
      </li>
      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl hover:text-cyan-500 duration-500">BLOG'S</a>
      </li>

      <button onClick={logout} className="lgt-btn">
        Logout
      </button>
<h2 className=""></h2>
    </ul>
  </nav>
    </div>
  )
}

export default Navbar