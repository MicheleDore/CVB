import '../App.css'
import { NavLink } from "react-router-dom";
import {useContext, Fragment, useEffect} from "react"
import { Context } from "./Reducer.jsx";
import Login from './Login.jsx'
import axios from 'axios'
import BASE_URL from '../config/api.js';

const NavBar = (props) => {
  const [state, dispatch] = useContext(Context)
  
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
    <nav className='navBar'>
      <ul className='navBarList'>
        <li>
          <NavLink to="/">
            HOME 
          </NavLink>
          <p>H&4589dhs</p>
        </li>
        <li>
          <NavLink to="/workshop">
            L'ATELIER
          </NavLink>
          <ul>
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
        </li>
        <li>
          <NavLink to="/production">
            NOS REALS
          </NavLink>
          <ul>
            {
            state.videos[0] && state.videos[0].map((item,i) => {
                if(item.type=== 'Main_Video'){
                  let url = "metabox/"+item.id
                  return <NavLink  key={i} to={url}>
                            <li key={i} >
                              <p> {item.title} </p>
                              <p> {item.year} </p>
                            </li>
                          </NavLink>
                }
              })
            }
          </ul>
        </li>
        <li>
          <NavLink to="/service">
            NOS PRESTAS
          </NavLink>
          <ul>
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
        </li>
        {!state.connected &&
        <Fragment>
          <li>
              <NavLink to="/register">
              REGISTER
              </NavLink>
          </li>
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
    </nav>
  );
};

export default NavBar;
