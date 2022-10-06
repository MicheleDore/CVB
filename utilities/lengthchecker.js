const checkLength =(entries, maxlength)=>{
    let inputs = Object.values(entries)
    console.log(inputs)
    for(let i = 0; i <inputs.length; i++){
        if(inputs[i].length>maxlength){
            
            return false
        } 
    }
    return true
}

export default checkLength