import '../../App.css'
import React from 'react'
import { useLocation } from "react-router-dom"

const Signup = ()=>{
    const location = useLocation()
    return (
        <React.Fragment>
            <div className={`${location.pathname==='/signup' && "secondaryView smallView"} `}>
                <article className="article smallMargin bigPadding aroundFlex column">
                    <h2>Sign UP !</h2>
                    <button className="button smallMargin specialButton" onClick={() => {window.scrollTo({top: document.body.scrollHeight, left: 0, behavior: 'smooth'})}}>Je me lance !</button> 
                </article>
            </div>
        </React.Fragment>
    )
}

export default Signup