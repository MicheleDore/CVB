import React from 'react'
import Youth from './Youth'
import Dlpali from './Dlpali'
import BoxLease from './BoxLease'
const Service = (props)=>{
    return (
        <React.Fragment>
            <section id ="service" className={`${!props.home ? "mainView" : "bigPadding"} container `}>
                <h1>PRESTATIONS DE SERVICES</h1>
                <div className="maxWidth responsiveContainer">
                    <BoxLease />
                    <Dlpali />
                    <Youth />
                </div>
            </section>
        </React.Fragment>
    )
}

export default Service