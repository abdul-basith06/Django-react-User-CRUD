import React, { useEffect } from 'react'
import { getlocal } from '../helpers/auth'
import { jwtDecode } from 'jwt-decode'

import AdminPanelPage from '../pages/AdminPanelPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import { useNavigate } from 'react-router-dom'



const PrivateRouter = ({ children, ...rest }) => {
    const response=getlocal('authToken')
    const navigate= useNavigate()

    useEffect(()=>{
        if(!response){
            navigate("/login")
        }
    },[response,navigate])

    if (response){
        const decoded=jwtDecode(response)
        if (decoded.is_admin){
            console.log("Admin page")
            return (
                <div>
                    <AdminPanelPage title={'ADMIN PAGE'}/>
                </div>
              )
            }
            else if(!decoded.is_admin){
                console.log("Home page")
                
        return (
            <div>
                <HomePage title={'HOME PAGE'}/>
            </div>
          )
        }

        }
    else{
        return  null
        // return (
        //   <div>
        //       <LoginPage/>
        //   </div>
        // )
    }
}

export default PrivateRouter