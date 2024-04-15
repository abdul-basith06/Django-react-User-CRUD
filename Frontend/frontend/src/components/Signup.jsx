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
    <div className="container mx-auto px-4 py-8">
      <Toaster position='top-left' reverseOrder='false' ></Toaster>
      <h2 className="text-2xl font-medium mb-4">Sign Up</h2>
        <form onSubmit={signUpUser}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Confirm Password"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">Submit</button>

        </form>
        <br/>
        <div className="flex justify-between items-center mt-4">
  <p>Already have an account?</p>
  <h6><Link to='/login'>Login</Link></h6>
</div>

    </div>
  )
}

export default Signup