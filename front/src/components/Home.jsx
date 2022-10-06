import '../App.css'
import React from 'react'
import Workshop from './Workshop'
import Production from './Production'
import Service from './Service'
import ContactUs from './ContactUs'
const Home = ()=>{
    return (
        <React.Fragment>
            <h1>Behold my Homepage !</h1>
            <section className="mainHomepageSection">
                <h1>This is us !</h1>
            </section>
            <Workshop />
            <Production />
            <Service />
            <ContactUs />
        </React.Fragment>
    )
}

export default Home