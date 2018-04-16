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
        delete(key){
            return ({
                type: createActionType('delete'),
                key
            })
        },
        update(key, updateFn){
            return ({
                type: createActionType('update'),
                key, updateFn
            })
        }
    }

    function reducer(state=initialState, action){
        if(!matchInstance(action)) return state

        if(action.type.endsWith('set')){
            const { key, value } = action
            return {
                ...state,
                [key]: value
            }
        } else if(action.type.endsWith('setAll')){
            return {
                ...state,
                ...action.elements
            }
        } else if(action.type.endsWith('delete')){
            return Object.keys(state).reduce(
                (nextState, key) => key !== action.key.toString()
                    ? { ...nextState, [key]: state[key] }
                    : nextState
            , {})
        } else if(action.type.endsWith('update')){
            const { key, updateFn } = action
            return {
                ...state,
                [key]: updateFn(state[key] || null)
            }
        } else return state
    }

    return {
        reducer,
        actions
    }
}