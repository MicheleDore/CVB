import '../App.css'
import { Context } from "./Reducer.jsx";
import { useContext, Fragment} from 'react'

const Production = ()=>{
    const[state, dispatch]= useContext(Context)
    
    return (
        <Fragment>
            <section id ="production" className="container">
                <h1>NOS REALISATIONS</h1>
                    <div className='aroundFlex column'>
                        {
                            state.videos[0] && state.videos[0].map((item,i) => {
                                if(item.type=== 'Main_Video'){
                                let url = "metabox/"+item.id 
                                 return <article key={i} className=' productionCard smallMargin smallpadding'>
                                            <a href={url}>
                                              <h2> {item.title}</h2>
                                              <video className="productionCard" src={item.url} preload="auto" autoPlay muted loop> Votre navigateur ne prend pas en charge les vidéos HTML5, merci d'utiliser un navigateur plus récent.</video>
                                                <div className="aroundFlex column">
                                                  <div> <h6 className="reset">{item.year}</h6> </div>
                                                  <div> <p className="textAlignStart">{item.description}</p> </div>
                                                </div>
                                            </a>
                                        </article>
                                }
                                
                            })
                        }   
                    </div>
            </section>
        </Fragment>
    )
}

export default Production