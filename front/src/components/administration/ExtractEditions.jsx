import { useContext, useEffect} from 'react';
import { Context } from "../Reducer.jsx";

const ExtractEditions= ()=>{
    const [state, dispatch] = useContext(Context)
   
    useEffect(() => {
        let editionsPackage = []
        let editions =[]
        let editionsYears = []
        let edition
        state.videos[0] && state.videos[0].map((item,i) => {
            edition = {id:item.edition_id, year:item.year}
            editionsYears.push(item.year)
            editions.push(edition)
        })
        editionsPackage.push(editionsYears, editions)
        dispatch({type:'editions', payload: editionsPackage})
        console.log(editionsPackage)
    },[])
}

export default ExtractEditions