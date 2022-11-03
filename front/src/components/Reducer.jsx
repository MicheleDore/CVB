import React from 'react';

const Context = React.createContext([])

const initialState = {
    connected: false,
    admin : false,
    videos:[],
    bottomNav: false,
    topNav:false
}

const reducer = (state, action)=>{
    switch(action.type){
        case 'toggleTopNav':
            return {...state, topNav: !state.topNav}
        case 'offBottomNav':
            return {...state, bottomNav: false}
        case 'onBottomNav':
            return {...state, bottomNav: true}
        case 'vote':
            return {...state, userChoices:[...state.userChoices, action.payload]}
        case 'choicepick':
            return {...state, choice:action.payload}
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
            return {...state, connected:true, admin : action.payload.admin, name : action.payload.name, userId: action.payload.id, userChoices: action.payload.userChoices}
        case 'logout' :
            return {...state, connected: false, admin : false, userChoices:[]}
        default: 
            return state
    }
}

export {Context, initialState, reducer}