import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const Home = () => {
  return (
    <div>
      <Toaster position='top-left' reverseOrder='false' ></Toaster>
        <h1>This is the home page</h1>
    </div>
  )
}

export default Home