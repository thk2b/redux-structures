import { createStructureInstance } from '../core'

export default function HashMap (name, initialState = {}){
    const {
        createActionType,
        matchInstance
    } = createStructureInstance('HashMap', name)

    const actions = {
        set(key, value){
            return ({
                type: createActionType('set'),
                key, value
            })
        },
        setAll(elements){
            return ({
                type: createActionType('setAll'),
                elements
            })
        },
        update(key, updateFn){
            return ({
                type: createActionType('update'),
                key, updateFn
            })
        },
        delete(key){
            return ({
                type: createActionType('delete'),
                key
            })
        },
        clear(){
            return ({
                type: createActionType('clear'),
            })
        },
        reset(){
            return ({
                type: createActionType('reset'),
            })
        },
    }

    function reducer(state=initialState, action){
        if(!matchInstance(action)) return state
        
        if(action.type.endsWith('reset')){
            return initialState
        } 
        if(action.type.endsWith('set')){
            const { key, value } = action
            return {
                ...state,
                [key]: value
            }
        }
        if(action.type.endsWith('setAll')){
            return {
                ...state,
                ...action.elements
            }
        }
        if(action.type.endsWith('update')){
            const { key, updateFn } = action
            return {
                ...state,
                [key]: updateFn(state[key] || null)
            }
        }
        if(action.type.endsWith('delete')){
            return Object.keys(state).reduce(
                (nextState, key) => key !== action.key.toString()
                    ? { ...nextState, [key]: state[key] }
                    : nextState
            , {})
        } 
        if(action.type.endsWith('clear')){
            return {}
        }
        return state
    }

    return {
        reducer,
        actions
    }
}