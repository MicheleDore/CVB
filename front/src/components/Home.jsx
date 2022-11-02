import '../App.css'
import {Fragment, useContext, useEffect} from 'react'
import Workshop from './Workshop'
import Production from './Production'
import Service from './Service'
import {Context} from './Reducer.jsx'

const Home = ()=>{
    const [state, dispatch] = useContext(Context)
    
    useEffect(() => {
        const toTop = window.scrollY
        if (window.scrollY=== toTop){
            dispatch({type:'offBottomNav'})
        }
        const handleScroll = event => {
          dispatch({type:'onBottomNav'})
        }
        
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      dispatch({type:'onBottomNav'})
    };
  }, []);
  
    return (
        <Fragment>
            <div>
                <video id='homeVideo' src='http://micheledore.sites.3wa.io:9001/video/Les_ateliers_des_confluences_de_Community_VideoBox.mp4' width="480" height="320" preload="auto" autoPlay loop muted > Votre navigateur ne prend pas en charge les vidéos HTML5, merci d'utiliser un navigateur plus récent.</video>
                <section className="container">
                </section>
                <Workshop />
                <Production />
                <Service />
            </div>
        </Fragment>
    )
}

export default Home