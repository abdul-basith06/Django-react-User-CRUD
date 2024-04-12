import React from 'react'

const Signup = () => {
  return (
    <div>
        <form action="">
            <input type="text" placeholder='username'/>
            <input type="email" placeholder='Email'/>
            <input type="text" placeholder='Password'/>
            <input type="text" placeholder='Confirm Password'/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Signup