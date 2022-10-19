import { useContext, useEffect} from 'react';
import { Context } from "../Reducer.jsx";

const ExtractEditions= ()=>{
    const [state, dispatch] = useContext(Context)
   
    useEffect(() => {
        let currentDate = new Date
        let editionsPackage = []
        let editions =[]
        let editionsYears = []
        const possibleEditions = []
        let edition
        state.videos[0] && state.videos[0].map((item,i) => {
            edition = {id:item.edition_id, year:item.year}
            editionsYears.push(item.year)
            editions.push(edition)
        })
        for(let index = 2021; index<= 2023; index++){
            possibleEditions.push(index)
        }
        editionsPackage.push(editionsYears, editions, possibleEditions)
        dispatch({type:'editions', payload: editionsPackage})
        console.log(editionsPackage)
    },[])
}

export default ExtractEditions

// currentDate.getFullYear()