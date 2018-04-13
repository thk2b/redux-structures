import {
    nameInvariant,
    createInstanceActionTypeCreator,
    createInstanceActionTypeMatcher
} from '../core'

export default function Value(name, initialState=null){
    nameInvariant(name)
    const createActionType = createInstanceActionTypeCreator('Value', name)
    const matchInstance = createInstanceActionTypeMatcher('Value', name)

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