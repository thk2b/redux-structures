import { instanceNameUndefinedInvariant, instanceNameAlreadyInUseInvariant } from './invariants'

const namespace = '@@redux-structures'

function createActionTypeCreator(structureType, instanceName){
    return actionType => [
        namespace,
        structureType,
        instanceName,
        actionType
    ].join('-')
}

function createActionTypeMatcher(structureType, instanceName){
    return action => action.type && action.type.startsWith([
        namespace,
        structureType,
        instanceName
    ].join('-'))
}

const names = {}

export function createInstance(structureName, instanceName){
    instanceNameUndefinedInvariant(structureName, instanceName)
    instanceNameAlreadyInUseInvariant( structureName, instanceName, names[structureName])
    
    if(names[structureName]){
        names[structureName].push(instanceName)
    } else {
        names[structureName] = [instanceName]
    }

    return {
        createActionType: createActionTypeCreator(structureName, instanceName),
        matchInstance: createActionTypeMatcher(structureName, instanceName)
    }
}