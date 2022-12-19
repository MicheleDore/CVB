import { useContext, useEffect} from 'react';
import { Context } from "../Reducer.jsx";

/*ce composant est appellé pour s'assurer que l'administrateur ne rentre pas une année invalide 
pour la production qu'il est en traind entrer en BDD*/
const ExtractEditions= ()=>{
    const [state, dispatch] = useContext(Context)
   
    useEffect(() => {
        let currentDate = new Date
        let editionsPackage = []
        let editions =[]
        let editionsYears = []
        let possibleEditions = []
        let edition
        /*les editions pour lequelles des vidéo existent déjà en BDD sont 
        récupérer dans le reduceur (stocké par le composant VideoList)*/
        state.videos[0] && state.videos[0].map((item,i) => {
            edition = {id:item.edition_id, year:item.year}
            editionsYears.push(item.year)
            editions.push(edition)
        })
        /* l'edition en cours est ajouté au cas il s'agit du premier vidéo de l'année*/
        for(let index = 2021; index<= currentDate.getFullYear(); index++){
            possibleEditions.push(index)
        }
        editionsPackage.push(editionsYears, editions, possibleEditions)
        dispatch({type:'editions', payload: editionsPackage})
    },[])
}

export default ExtractEditions

