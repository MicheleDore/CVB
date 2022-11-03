import '../App.css'
import { NavLink } from "react-router-dom";
import {useContext, Fragment, useEffect, useState, } from "react"
import { Context } from "./Reducer.jsx";
import axios from 'axios'
import BASE_URL from '../config/api.js';
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom"

const NavBar = (props) => {
  const [state, dispatch] = useContext(Context)
  const [menus, setMenus] = useState({workshop: false, prods: false, services:false})
  
  const location = useLocation()
  
  const showWorkshop = ()=>{
    if(!menus.workshop){
       setMenus({workshop: true, prods: false, services:false})
       console.log(menus)
    } else {
      setMenus({...menus, workshop: false})
    }
  }
  
  const showProds = ()=>{
    if(!menus.prods){
       setMenus({workshop: false, prods: true, services:false})
    } else {
      setMenus({...menus, prods: false})
    }
  }
  
  const showServices = ()=>{
    if(!menus.services){
       setMenus({workshop: false, prods: false, services:true})
    } else {
      setMenus({...menus, services: false})
    }
  }
  
  useEffect(()=>{
    let menu = {}
    if(location.pathname==='/workshop'){
      menu={workshop: true, prods: false, services:false}
    } else if (location.pathname==='/production'){
      menu={workshop: false, prods: true, services:false}
    }else if (location.pathname==='/service'){
      menu={workshop: false, prods: false, services:true}
    } else {
      menu = {workshop: false, prods: false, services:false}
    }
    return setMenus(menu)
  },[location.pathname])

    useEffect(() => {
      const token = localStorage.getItem("jwtToken")
      if(!state.login && token){
        axios.post(`${BASE_URL}/isLogged`,{token})
        .then((res) => {
          if(res.data.token){
            axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
          }
            res.data.response && dispatch({type:'login',payload: res.data})
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },[])
    
  return (
    <Fragment >
      <nav>
        <div className={`${!state.topNav && location.pathname=== '/'? "hidden" : "reset"} smallpadding aroundFlex navBar relative`}>
          <ul className={`${location.pathname === '/'? "column absolute navButtons" : "topNav"} generalList aroundFlex smallpadding navBar ${!state.topNav && location.pathname=== '/'? "hideButtons" : "animWelcome"}`}>
            <li>
              <NavLink to="/workshop" onClick={showWorkshop}>
                L'ATELIER
              </NavLink>
            </li>
            <li>
              <NavLink to="/production" onClick={showProds}>
                NOS REALS
              </NavLink>
            </li>
            <li>
              <NavLink to="/service" onClick={showServices}>
                NOS PRESTAS
              </NavLink>
            </li>
          </ul>
        </div>
        {menus.workshop && <ul className="generalList mainColor smallMenu" >
            <li>
              <NavLink to="/contents">
                Contenus 
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar">
                Calendrier
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                 S'inscrire 
              </NavLink>
            </li>
          </ul>
        }
        {menus.prods && <ul className="generalList mainColor smallMenu">
              {
              state.videos[0] && state.videos[0].map((item,i) => {
                  if(item.type=== 'Main_Video'){
                    let url = "metabox/"+item.id
                    return <NavLink  key={i} to={url}>
                              <li key={i} className='betweenFlex'>
                                <p> {item.title} </p>
                                <p> {item.year} </p>
                              </li>
                            </NavLink>
                  }
                })
              }
          </ul>
        }
        {menus.services && <ul className="generalList mainColor smallMenu">
            <li>
              <NavLink to="/boxlease">
                 La Box
              </NavLink>
            </li>
            <li>
              <NavLink to="/youth">
                Pour les plus jeunes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dlpali">
                 De la page à l'image
              </NavLink>
            </li>
          </ul>
        }
        {(state.bottomNav || location.pathname!=='/') && <div className='smallpadding navBar relative bottomNav normalBlue mainColor'>
            <ul className='aroundFlex generalList'>
              <li>
                <p>H&4589dhs</p>
              </li>
              <li>
                <NavLink to="/">
                  HOME 
                </NavLink>
              </li>
              {!state.connected &&
              <Fragment>
                <li>
                  <NavLink to="/login">
                    LOGIN
                  </NavLink>
                </li>
              </Fragment>
              }
              {state.connected && 
                <Fragment>
                  <li>
                    <NavLink to="/logout">
                      LOGOUT
                    </NavLink>
                  </li>
                  <p>Welcome N. {state.userId}! </p>
                  {state.admin && 
                    <li>
                      <NavLink to="/admin">
                        ADMIN
                      </NavLink>
                    </li>
                  }
                </Fragment>
              }
            </ul>
          </div>
        }
        </nav>
    </Fragment>
  );
};

export default NavBar;
