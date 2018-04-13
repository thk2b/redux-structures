export function nameInvariant(name){
    if(!name) throw {
        message: `
            Error in redux-structure: A ${ type }
            was instantiated without a
            \`name\` parameter.
        `
    }
}

const namespace = '@@redux-structures'

export function createInstanceActionTypeCreator(structureType, instanceName){
    return actionType => [
        namespace,
        structureType,
        instanceName,
        actionType
    ].join('-')
}

export function createInstanceActionTypeMatcher(structureType, instanceName){
    return action => {
        // console.log(action.type)
        // console.log({ namespace, structureType, instanceName})
        return action.type && action.type.startsWith([
            namespace,
            structureType,
            instanceName
        ].join('-'))
    }
}