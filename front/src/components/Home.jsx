import '../App.css'
import {Fragment, useContext, useEffect, useState} from 'react'
import Workshop from './Workshop'
import Production from './Production'
import Service from './Service'
import {Context} from './Reducer.jsx'
import flecheBlue from "../graphisme/flèche-blue.png"
import flecheViolet from "../graphisme/flèche-violet.png"

const Home = ()=>{
    const [state, dispatch] = useContext(Context)
    const [topNavBar, setTopNavBar] = useState(state.topNav)
    
    /* La Barre de Navigation est minimisé au chargement pour garantier 
    une XU plus immersive avec une vidéo de présentation au teaser*/
    
    useEffect(() => {
        dispatch({type: 'offTopNav'})
        dispatch({type:'offBottomNav'})
    }, []);
    
    /*La barre apparaît à l'appui d'un bouton par l'utilisateur,...*/
    
    
    const toggleTopNavBar = ()=>{
        dispatch({type: 'toggleTopNav'})
    }
    
    /*...ou au scroll vers le bas...*/
    
    const handleScroll = event => {
          if (window.scrollY=== 0){
            dispatch({type:'offBottomNav'})
        } else {
            dispatch({type:'onBottomNav'})
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [window.scrollY]);
    
    /*...elle disparait quand la view revienne en haut de la page*/
  
    return (
        <Fragment>
            <div className='relative'>
                <video id='homeVideo' src='http://micheledore.sites.3wa.io:9001/video/Les_ateliers_des_confluences_de_Community_VideoBox.mp4' preload="auto" autoPlay loop muted > Votre navigateur ne prend pas en charge les vidéos HTML5, merci d'utiliser un navigateur plus récent.
                </video>
                <div className='aroundFlex welcome'>
                    <div className='topNavButton betweenFlex animWelcome column' onClick={toggleTopNavBar}>
                        <img className='topArrow animFlecheViolet' alt='Discover us' src={flecheViolet}/>
                        <img className='bottomArrow' alt='Discover us' src={flecheBlue}/>
                    </div>
                </div>
            </div>
            <section className="container">
            </section>
            <Workshop />
            <Production />
            <Service />

        </Fragment>
    )
}

export default Home