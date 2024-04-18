import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Loginpage from "./pages/Loginpage";
import Signuppage from "./pages/Signuppage";
import Profilepage from "./pages/Profilepage";
import PrivateRouter from "./utils/PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkmode } from "./features/darkModeSlice";

function App() {
  const dispatch = useDispatch();
  const {darkMode} = useSelector((state)=> state.darkMode)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<PrivateRouter />}></Route>
          <Route path="register/" exact Component={Signuppage}></Route>
          <Route path="login/" Component={Loginpage}></Route>
          <Route path="profile/" Component={Profilepage}></Route>
        </Routes>
        <button
           onClick={() => dispatch(toggleDarkmode())}
            className="absolute w-12 h-12 bottom-4 right-4 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold"
          >
            {darkMode ? "LHT" : "DRK"}
          </button>
      </BrowserRouter>
    </>
  );
}

export default App;
