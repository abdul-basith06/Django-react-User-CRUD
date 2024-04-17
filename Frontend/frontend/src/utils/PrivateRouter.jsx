import React, { useEffect } from 'react'
import { getlocal } from '../helpers/auth'
import { jwtDecode } from 'jwt-decode'
import Adminpanelpage from '../pages/Adminpanelpage'
import Homepage from '../pages/Homepage'
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
            return (
                <div>
                    <Adminpanelpage title={'ADMIN PAGE'}/>
                </div>
              )
            }
            else if(!decoded.is_admin){
                
        return (
            <div>
                <Homepage title={'HOME PAGE'}/>
            </div>
          )
        }

        }
    else{
        return  null
       
    }
}

export default PrivateRouter