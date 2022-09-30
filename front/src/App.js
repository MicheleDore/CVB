import {  BrowserRouter,  Routes,  Route } from "react-router-dom"
import React from 'react'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'
import Error404 from './components/Error404.jsx'
import Middleware from './components/Middleware.jsx'
import Admin from './components/Admin.jsx'
import Nav from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
    <Nav />
    <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/admin' element={<Middleware>{<Admin />}</Middleware>}/>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
