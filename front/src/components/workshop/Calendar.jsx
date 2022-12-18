import '../../App.css'
import React from 'react'
import { useLocation } from "react-router-dom"

const Calendar = ()=>{
    const location = useLocation()
    return (
        <React.Fragment>
            <div className="secondaryView">
                <article className="article smallMargin aroundFlex column secondaryView">
                    <h2>Calendrier</h2>
                    <div className="scroll maxWidth">
                        <img src="http://micheledore.sites.3wa.io:9001/images/calendrier.jpg" alt="Calendrier d'activités"/>
                    </div>
                </article>
            </div>
        </React.Fragment>
    )
}

export default Calendar