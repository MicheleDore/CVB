import React from 'react'
import {Context, initialState, reducer} from './Reducer.jsx'


const ContextProvider = ({children})=>{
    const [state, dispatch]= React.useReducer(reducer,initialState)
    return <Context.Provider value={[state,dispatch]}>
                {children}
            </Context.Provider>
}

export default ContextProvider