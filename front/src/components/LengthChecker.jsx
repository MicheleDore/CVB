/*Ce composant prend en argument des inputs qui 
ont vocation à être enregistrés en BDD et la logueur 
assigné en BDD aux données correspondants afin d'éviter
tous envoies qui pourraient causer des conflits en BDD*/

const CheckLength =(entries, maxlength)=>{
    let inputs = Object.values(entries)
    console.log(inputs)
    for(let i = 0; i <inputs.length; i++){
        if(inputs[i].length>maxlength){
            return false
        } 
    }
    return true
}

export default CheckLength