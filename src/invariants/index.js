export function nameInvariant(name, type){
    if(!name) throw {
        message: `
            Error in redux-structure:
            A ${ type } was instantiated,
            but it does not have a \`name\` parameter.
            All structure instances must have a name.
        `
    }
}
export function nameAlreadyInUseInvariant(name, names, type){
    if(names.includes(name)) throw {
        message: `
            Error in redux-structure: 
            A ${ type } with name ${ name } was instantiated,
            but another instance already uses this name.
            Two instances of a structure cannot share the same name.
        `
    }
}
