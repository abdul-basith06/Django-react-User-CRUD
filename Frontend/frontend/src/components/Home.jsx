import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux';

const Home = () => {
  const {darkMode} = useSelector((state)=> state.darkMode)
  const imageUrl = '/home.jpg';
  return (
    <div className={`${
      darkMode ? 'dark' : ''} bg-teal-900 dark:bg-slate-900`}>
      <Toaster position='top-left' reverseOrder='false' ></Toaster>
      <div className="h-screen flex justify-center items-center z-index: 0;">
      <img src={imageUrl} alt="Home Page Image" className="mx-auto max-w-md max-h-md rounded-lg; z-index: 0;" />
    </div>
    </div>
  )
}

export default Home