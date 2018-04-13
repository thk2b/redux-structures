import {
    nameInvariant,
    nameAlreadyInUseInvariant,
} from '../invariants'

import {
    createInstanceActionTypeCreator,
    createInstanceActionTypeMatcher
} from '../core'

const names = []

export default function Value(name, initialState=null){
    nameInvariant(name, 'Value')
    nameAlreadyInUseInvariant(name, names, 'Value')
    names.push(name)

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