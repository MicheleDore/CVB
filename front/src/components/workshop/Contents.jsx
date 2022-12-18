import { useLocation } from "react-router-dom"
import React from 'react'

const Contents = (props)=>{
    const location = useLocation()

    return (
        <React.Fragment>
            <div className={`${location.pathname!=='/contents' ? "responsiveElement" : "container"} secondaryView `}>
                <article className="article smallMargin aroundFlex column secondaryView">
                    <h2>Contenus</h2>
                    <div className={`${location.pathname==='/contents'&& "responsiveContainer"} `}>
                        <img className={`image maxWidth ${location.pathname==='/contents' && "responsiveElement responsiveImage"}`} src="http://micheledore.sites.3wa.io:9001/images/atelier-montage.JPG" alt="Image d'Atelier"/>
                        <p className={`${location.pathname==='/contents' && "responsiveElement"} textAlignStart smallpadding`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                                Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                                Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                        </p>
                    </div>
                </article>
            </div>
        </React.Fragment>
    )
}

export default Contents