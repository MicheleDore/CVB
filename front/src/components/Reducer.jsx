import React from 'react';

const Context = React.createContext([])

const initialState = {connected: false, admin : false, videos:[]}

const reducer = (state, action)=>{
    switch(action.type){
        case 'choiceB':
            return {...state, newVideo:{...state.newVideo, choice_B:action.payload}}
        case 'choiceA':
            return {...state, newVideo:{...state.newVideo, choice_A:action.payload}}
        case 'newVideo':
            return {...state, newVideo:action.payload}
        case 'editions':
            return {...state, editions:action.payload}
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