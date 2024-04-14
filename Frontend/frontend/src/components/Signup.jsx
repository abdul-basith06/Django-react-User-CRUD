import React, {useState} from 'react'
import { Link,Navigate, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Signup = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const signUpUser = (e)=> {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (username.trim()==""){
            toast.error("Please enter username")
            return 
        }else if (!emailRegex.test(email)){
            toast.error("Enter a valid Email Id")
            return 
        }else if (password!==password2){
            toast.error("Password didn't match!")
            return
        }else if (password.length<6){
            toast.error("Password should contain atleast six characters!")
            return 
        }
        try{


          const response= fetch('http://localhost:8000/api/register/',{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({
                  username,
                  email,
                  password
              })
          })
          if(response.status===400){
              toast.error('Username or Email id already exist!')
              navigate('/register')
  
          }else{
              toast.success("User Registered successfully!")
              navigate('/login')
          }
        
          
      }
      catch(err){
          console.log(err)
          toast.error("Some error occured:",err)
          navigate('/register')

      }
  }
  return (
    <div>
        <form onSubmit={signUpUser}>
            <input type="text" placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
            <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            <input type="text" placeholder='Confirm Password' onChange={(e)=>setPassword2(e.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
        <br/>
                <p>Already have an account?</p>
                <h6><Link to='/login'>Login</Link></h6>
                <br/>
    </div>
  )
}

export default Signup