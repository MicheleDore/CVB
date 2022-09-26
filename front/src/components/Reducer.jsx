import React from 'react';

const Context = React.createContext([])

const initialState = {items:[]}

const reducer = (state, action)=>{
    switch(action.type){
        
        case 'showList':
            return {...state, items:[... action.payload]}
        default: 
            return state
    }
}

export {Context, initialState, reducer}