import React from 'react'
import { useLocation } from "react-router-dom"

const Youth = ()=>{
    const location = useLocation()
    
    return (
        <React.Fragment>
            <div className={`${location.pathname==='/youth' ? "secondaryView container" : 'responsiveService'}`}>
                <article className="article smallMargin secondaryView aroundFlex column">
                    <h2>Jaunesse</h2>
                    <div className={`${location.pathname==='/youth' && "responsiveContainer"} `}>
                        <img className={`image maxWidth ${location.pathname==='/youth' && "responsiveElement responsiveImage"}`}  src="http://micheledore.sites.3wa.io:9001/images/jeunesse.JPG" alt="Specs Box" />
                        <p className={`${location.pathname==='/youth' && "responsiveElement"} textAlignStart smallpadding`}>
                            Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                            Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Maecenas adipiscing ante non diam sodales hendrerit augue blandit sodales mauris sed pede .
                        </p>
                    </div>
                </article>
            </div>
        </React.Fragment>
    )
}

export default Youth