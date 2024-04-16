import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Signup = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const signUpUser = async (e) => {
    e.preventDefault();
  
    // Basic validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username.trim() === "") {
      toast.error("Please enter a username.");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Enter a valid Email Id.");
      return;
    } else if (password !== password2) {
      toast.error("Password didn't match!");
      return;
    } else if (password.length < 6) {
      toast.error("Password should contain at least six characters!");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
  
      if(response.status===400){
        toast.error('Username or Email id already exist!')
        navigate('/register')

    }else{
        toast.success("User Registered successfully!")
        navigate('/login')
    }
    } catch (err) {
      toast.error("Some error occurred:", err); 
      navigate('/register'); 
    }
  };
  

  return (
    <div className="flex justify-center items-center mx-auto px-4 py-8">
      <div className='w-5/12 p-6 shadow-lg bg-pink-50 rounded-md'>
      <Toaster position='top-left' reverseOrder='false' ></Toaster>
      <h2 className="text-3xl font-medium mb-4 text-black text-center">Sign Up</h2>
        <form onSubmit={signUpUser}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button className='sbmt' type='submit'>Submit</button>

        </form>
        <br/>
        <div className="flex justify-between mt-4">
              <p>Already have an account?</p>
               <h6><Link to='/login'>Login</Link></h6>
  </div>
</div>

    </div>
  )
}

export default Signup