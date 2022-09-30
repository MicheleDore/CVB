import { NavLink } from "react-router-dom";
import {useContext, Fragment} from "react"
import { Context } from "./Reducer.jsx";

const NavBar = (props) => {
  
  const [state, dispatch] = useContext(Context)
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
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
            <p>Welcome {state.name}! </p>
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
