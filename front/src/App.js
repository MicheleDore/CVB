import {  BrowserRouter,  Routes,  Route } from "react-router-dom"
import React from 'react'
import Nav from "./components/NavBar";
import VideoList from './components/VideoList.jsx'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'
import Workshop from './components/Workshop'
import Contents from './components/workshop/Contents.jsx'
import Calendar from './components/workshop/Calendar.jsx'
import Signup from './components/workshop/Signup.jsx'
import MetaBox from './components/production/MetaBox.jsx'
import Production from './components/Production'
import Service from './components/Service'
import Error404 from './components/Error404.jsx'
import Middleware from './components/Middleware.jsx'
import Admin from './components/administration/Admin.jsx'

function App({children}) {
  return (
    <BrowserRouter>
    <Nav />
    <VideoList />
    <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path='/workshop' element={<Workshop />}/>
        <Route path='/contents' element={<Contents />}/>
        <Route path='/calendar' element={<Calendar />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path="/production" element={<Production />} />
        <Route path='/metabox/:id' element={<MetaBox />}/>
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/admin/:name' element={<Middleware>{<Admin />}</Middleware>}/>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
