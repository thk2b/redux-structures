import { instanceNameUndefined, instanceNameAlreadyInUseInvariant } from './invariants'

const namespace = '@@redux-structures'

function createInstanceActionTypeCreator(structureType, instanceName){
    return actionType => [
        namespace,
        structureType,
        instanceName,
        actionType
    ].join('-')
}

function createInstanceActionTypeMatcher(structureType, instanceName){
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

const names = {}

export function createInstance(structureName, instanceName){
    instanceNameUndefined(structureName, instanceName)
    instanceNameAlreadyInUseInvariant( structureName, instanceName, names[structureName])
    
    if(names[structureName]){
        names[structureName].push(instanceName)
    } else {
        names[structureName] = [instanceName]
    }

    return {
        createActionType: createInstanceActionTypeCreator(structureName, instanceName),
        matchInstance: createInstanceActionTypeMatcher(structureName, instanceName)
    }
}