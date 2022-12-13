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
  let locationCheck = location.pathname.split('/')
  
  /*Les functions suivantes utilisent le state MENUS pour gérer l'affichage conditionnel des menus déroulants*/
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

/*Système de persistance de session avec token*/

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
      {/*Les affichages conditionnels et la gestion des classes sont gerées par le composant Home à travers le state 
      pour offrir une XU plus dynamique au chargement de la HOMEPAGE*/}
        <div className={`${!state.topNav && (location.pathname=== '/' || locationCheck[1] === 'metabox') ? "hidden" : "fixed"} aroundFlex navBar `}>
          <ul className={`${location.pathname === '/'? "column absolute navButtons" : "topNav relative"} generalList aroundFlex smallpadding navBar ${!state.topNav && location.pathname=== '/'? "hideButtons" : "animWelcome"}`}>
            <li>
              <NavLink to="/workshop" onClick={showWorkshop}>
                L'ATELIER
              </NavLink>
              {menus.workshop && <ul className="generalList mainColor smallMenu absolute" >
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
            </li>
            <li>
              <NavLink to="/production" onClick={showProds}>
                NOS REALS
              </NavLink>
              {menus.prods && <ul className="generalList mainColor smallMenu absolute"> {/*Mappe les productions principales stockées dans le reducer*/}
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
                        } {/*Chaque lien appel le composant MetaBox qui affiche avec sa routine la vidéo sélectionnée*/}
                      })
                    }
                </ul>
              }
            </li>
            <li>
              <NavLink to="/service" onClick={showServices}>
                NOS PRESTAS
              </NavLink>
              {menus.services && <ul className="generalList mainColor smallMenu absolute">
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
            </li>
          </ul>
        </div>
        {(state.bottomNav || (location.pathname!=='/' && locationCheck[1] !== 'metabox')) && <div className='smallpadding navBar fixed bottomNav mainColor'>
                                                          <ul className='aroundFlex generalList'>
                                                            <li>
                                                              <NavLink to="/" onClick={() => {
                                                                                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                                                                                      }}>
                                                                <img src='http://micheledore.sites.3wa.io:9001/logo-site.png' alt='Community VideoBox Logo'/> 
                                                              </NavLink>
                                                            </li> {/*Le information de connection sont récuperée dans le Reducer*/}
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
                                                                  <p>Welcome {state.name}! </p>
                                                                </li>
                                                                <li>
                                                                  <NavLink to="/logout">
                                                                    LOGOUT
                                                                  </NavLink>
                                                                </li>
                                                                
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
