import React, {useState, useRef} from 'react'
import { X } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast'

const AddUser = ({ onClose }) => {
  const modalRef = useRef()
  const [username, setUsername] = useState(" ")
  const [email, setEmail] = useState(" ")
  const [occupation, setOccupation] = useState(" ")
  const [password, setPassword] = useState(" ")

  const closeModal=(e)=> {
    if(modalRef.current === e.target){
        onClose();
    }
  }

  const addUser = async (e)=> {
    e.preventDefault()
    console.log("enetring in");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.trim()==""){
        toast.error("Please enter username")
        return        
    }else if (!emailRegex.test(email)){
        toast.error("Enter a valid Email Id")
        return 
    }else if (password.length<6){
        toast.error("Password should contain atleast six characters!")
        return 
    }

    try{

      const user = await fetch('http://localhost:8000/api/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              username,
              email,
              occupation,
              password
          })
      })
      if (user.status === 400){
          toast.error("Username or Email already exists!")

      }else{
          toast.success("User created successfully!")
          onClose();
      }
  }catch(err){
      toast.error('Error occured!')
  }

  }


  return (

    <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
    <Toaster position='top-left' reverseOrder='false' ></Toaster>
    <div className="mt-10 flex flex-col gap-5 text-black w-2/3">
        <button onClick={onClose} className="place-self-end"><X size={30}/></button>
        <div className="bg-gray-50 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
            <h1>Add a new User</h1>
            <form onSubmit={addUser}>
                <input onChange={e => setUsername(e.target.value)} className="m-2" type="text" placeholder="Username" name="username"/>
                <input onChange={e => setEmail(e.target.value)} className="m-2" type="email" placeholder="email" name="email"/>
                <input onChange={e => setOccupation(e.target.value)} className="m-2" type="text" placeholder="occupation" name="occupation"/>
                <input onChange={e => setPassword(e.target.value)} className="m-2" type="password" placeholder="password" name="password"/>
                <button className="confirm-btn m-2 p-2 w-20" type="submit">Confirm</button>
            </form>
        </div>
    </div>
</div>
  
  );
}

export default AddUser