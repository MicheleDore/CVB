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