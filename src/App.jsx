import { useState,useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import MainPage from './MainPage'
import LogIn2 from './LogIn2'
import SignUp2 from './SignUp2'
import LandingPage from './LandingPage'
import QR from './QR'
import PastLinks from './PastLinks'
import PastQrs from './PastQrs'
import UserProfile1 from './UserProfile1'
const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function App() {
  const [count, setCount] = useState(0)
  const [checkLogin, setLogin] = useState();

  useEffect(() => {
      const validateLogin = async () => {
        try {
          const res = await fetch(`${backendURL}/user/logStatus`, {
            method: "GET",
            credentials: "include",
          });
          const data = await res.json();
  
          if (data.logedIn) {
            setLogin(true);
          } else {
            setLogin(false);
          }
        } catch (err) {
          console.error("Error checking login status:", err);
        }
      };
  
      validateLogin();
    }, []);

  return (
    <>
      <Navbar checkLogin={checkLogin} setLogin={setLogin}/>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/login" element={<LogIn2 setLogin={setLogin}/>}/>
        <Route path="/signup" element={<SignUp2/>}/>
        <Route path="/urlshortner" element={<MainPage/>}/>
        <Route path="/qrgenerator" element={<QR/>}/>    
        <Route path="/pastLinks" element={<PastLinks/>}/> 
        <Route path="/pastQrs" element={<PastQrs/>}/> 
        <Route path="/profile" element={<UserProfile1/>}/>
      </Routes>
    </>
  )
}

export default App
