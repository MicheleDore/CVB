import React from 'react';

const Context = React.createContext([])

const initialState = {connected: false, admin : false, videos:[]}

const reducer = (state, action)=>{
    switch(action.type){
        case 'videopick':
            return {...state, videos:[action.payload]}
        case 'login':
            return {...state, connected:true, admin : action.payload.admin, name : action.payload.name}
        case 'logout' :
            return initialState
        default: 
            return state
    }
}

export {Context, initialState, reducer}