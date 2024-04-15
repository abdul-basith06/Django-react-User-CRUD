import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Loginpage from './pages/Loginpage'
import Signuppage from './pages/Signuppage'
import Homepage from './pages/Homepage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Homepage />}></Route>
        <Route path='register/' exact Component={Signuppage}></Route>
        <Route path='login/' Component={Loginpage}></Route>
       



      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
