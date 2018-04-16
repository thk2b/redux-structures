import { createStructureInstance } from '../core'

export default function Value(name, initialState=null){
    const { createActionType, matchInstance } = createStructureInstance('Value', name)

    const actions = {
        set(nextValue){
            return ({
                type: createActionType('set'),
                value: nextValue
            })
        },
        clear(){
            return ({
                type: createActionType('clear')
            })
        },
        reset(){
            return ({
                type: createActionType('reset')
            })
        }
    }
    const reducer = (state=initialState, action) => {
        if(!matchInstance(action)) return state
        if(action.type.endsWith('reset')){
            return initialState
        }
        if(action.type.endsWith('set')){
            return action.value
        }
        if(action.type.endsWith('clear')){
            return null
        }
        return state
    }

    return {
        actions,
        reducer
    }
}