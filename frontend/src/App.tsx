import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { useState } from 'react'
import './App.css'
import Admin from './pages/Admin'
import { useCookies } from 'react-cookie'
import { useJwt } from 'react-jwt'
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  if(cookies.token){
    const { decodedToken, isExpired } = useJwt(cookies.token);
    console.log(decodedToken, isExpired)
    return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    )
  }
  else{
    return <Login/>
  }


    // return (
    //   <>
    //     <Routes>
    //       <Route path='/' element={<Login setPort={setPort} />} />
    //       <Route path='/login' element={<Login setPort={setPort} />} />
    //       <Route path='/admin' element={<Admin />} />
    //     </Routes>
    //   </>
    // )
  
}

export default App