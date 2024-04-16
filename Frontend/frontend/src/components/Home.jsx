import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Home = () => {
  const imageUrl = '/home.jpg';
  return (
    <div >
      <Toaster position='top-left' reverseOrder='false' ></Toaster>
      <div className="h-screen flex justify-center items-center z-index: 0;">
      <img src={imageUrl} alt="Home Page Image" className="mx-auto max-w-md max-h-md rounded-lg; z-index: 0;" />
    </div>
    </div>
  )
}

export default Home