export function instanceNameUndefined(structureName, instanceName){
    if(!instanceName) throw {
        message: `
            Error in redux-structure:
            A ${ structureName } was instantiated,
            but it does not have a \`name\` parameter.
            All structure instances must have a name.
        `
    }
}
export function instanceNameAlreadyInUseInvariant(structureName, instanceName, existingNames ){
    console.log(arguments)
    if(Array.isArray(existingNames) && existingNames.includes(instanceName)) throw {
        message: `
            Error in redux-structure: 
            A ${ structureName } with name ${ instanceName } was instantiated,
            but another instance already uses this name.
            Two instances of a structure cannot share the same name.
        `
    }
}
