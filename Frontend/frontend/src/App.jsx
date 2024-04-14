import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Loginpage from './pages/Loginpage'
import Signuppage from './pages/Signuppage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Loginpage />}></Route>
        <Route path='register/' exact element={<Signuppage />}></Route>
        <Route path='login/' element={<Loginpage />}></Route>
       



      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
