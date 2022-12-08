/*Ce composant previent l'utilisation d'espaces vides au seins d'inputs entrés par l'utilisateur,
dans le cas où il s'agisse d'une erreur de frappe. Il est utilisé surtout pour les mots de passe*/

const CheckForbiddenChar =(entries)=>{
    let inputs = Object.values(entries)
    for(let i = 0; i <inputs.length; i++){
        if(inputs[i].includes(' ')){
            return false
        } 
    }
    return true
}

export default CheckForbiddenChar