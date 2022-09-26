//import logo from './logo.svg';
import './App.css';
import { useEffect} from 'react';
import React from 'react'
import BASE_URL from "./config.js"
import {Context} from './components/Reducer.jsx'

function App() {
  const [state,dispatch]= React.useContext(Context)
  useEffect(() => {
    fetch(`${BASE_URL}/courses`)
      .then(response => response.json())
      .then(res=>{dispatch({type:'showList', payload:res})
      })

  }, [])
  return (
    <ul>
    {console.log(state)}
      {state.items.map((l, i) => <li key={i}>{l}</li>)}
    </ul>
  );

}

export default App;
