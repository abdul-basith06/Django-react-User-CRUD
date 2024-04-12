import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        Login Page
        <form>
        <input type="text" placeholder='email'/>
        <input type="text" placeholder='password'/>
        <button type='submit'>Submit</button>
        </form>
<p>Dont have an account</p>
<h6><Link to='register/'>Register here</Link></h6>
    </div>
  )
}

export default Login