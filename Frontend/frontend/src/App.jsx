import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Loginpage from './pages/Loginpage'
import Signuppage from './pages/Signuppage'
import Profilepage from './pages/Profilepage'
import PrivateRouter from './utils/PrivateRouter'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<PrivateRouter />}></Route>
        <Route path='register/' exact Component={Signuppage}></Route>
        <Route path='login/' Component={Loginpage}></Route>
        <Route path='profile/' Component={Profilepage}></Route>
       



      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
