import { createInstance } from '../core'

export default function Value(name, initialState=null){
    const { createActionType, matchInstance } = createInstance('Value', name)

    const actions = {
        set(nextValue){
            return ({
                type: createActionType('set'),
                value: nextValue
            })
        }
    }
    const reducer = (state=initialState, action) => {
        if(!matchInstance(action)) return state
        if(action.type.endsWith('set')){
            return action.value
        }
        else return state
    }

    return {
        actions,
        reducer
    }
}