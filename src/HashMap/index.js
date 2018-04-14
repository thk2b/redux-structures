import {
    nameInvariant,
    nameAlreadyInUseInvariant,
} from '../invariants'

import {
    createInstanceActionTypeCreator,
    createInstanceActionTypeMatcher
} from '../core'

const names = []

export default function HashMap (name, initialState = {}){
    nameInvariant(name, 'HashMap')
    nameAlreadyInUseInvariant(name, names, 'HashMap')
    names.push(name)

    const createActionType = createInstanceActionTypeCreator('HashMap', name)
    const matchInstance = createInstanceActionTypeMatcher('HashMap', name)
    
}