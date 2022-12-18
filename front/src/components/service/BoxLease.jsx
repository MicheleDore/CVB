import React from 'react'
import { useLocation } from "react-router-dom"

const BoxLease = ()=>{
    const location = useLocation()
    
    return (
        <React.Fragment>
            <div className={`${location.pathname==='/boxlease' ? "secondaryView container" : 'responsiveService'}`}>
                <article className={`${location.pathname==='/dlpali'&& "responsiveContainer"} article smallMargin secondaryView aroundFlex column`}>
                    <h2>La BOX chez toi</h2>
                    <div className="scroll maxWidth">
                        <img src="http://micheledore.sites.3wa.io:9001/images/box.png" alt="Specs Box" />
                    </div>
                    <p className="textAlignStart smallpadding" >Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                    </p>
                </article>
            </div>
        </React.Fragment>
    )
}

export default BoxLease