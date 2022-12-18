import React from 'react'
import Contents from './Contents'
import Calendar from './Calendar'
import Signup from './Signup'
import { useLocation } from "react-router-dom"

const Workshop = (props)=>{
    const location = useLocation()
    return (
        <React.Fragment>
            <section id ="workshop" className={`${!props.home ? "mainView" : "bigPadding"} container `}>
                <h1>L'ATELIER</h1>
                <div className="responsiveContainer">
                    <Contents />
                    <div  className={`${(location.pathname!=='/calendar' || location.pathname!=='/signup' ) && "responsiveElement"} `}>
                        <Calendar />
                        <Signup />
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Workshop