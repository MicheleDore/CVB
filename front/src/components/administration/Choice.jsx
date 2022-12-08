import { Fragment } from 'react';

/*Ce composant utilise une props pour utiliser un seul input modulable pour le choix A ou B*/

const Choice= (props)=>{
    return(
        <Fragment>
            <label> Choice {props.choice} :
                <input name='choice' type='text' maxLength='36' value={props.choiceState} onChange={(e) => props.setChoice(e,props.choice)} required/>
            </label>
        </Fragment>
        )
}

export default Choice