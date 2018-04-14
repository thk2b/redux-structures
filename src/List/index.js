import { createStructureInstance } from '../core'

export default function List(name, initialState=[]){
    const {
        createActionType,
        matchInstance
    } = createStructureInstance('List', name)

    const actions = {
        insert(element, index){
            return ({
                type: createActionType('insert'),
                element, index
            })
        },
        replace(element, index){
            return ({
                type: createActionType('replace'),
                element, index
            })
        },
        remove(index, count=1){
            return ({
                type: createActionType('remove'),
                index, count
            })
        },
        push(element){
            return ({
                type: createActionType('push'),
                element
            })
        },
        pop(){
            return ({ type: createActionType('pop') })
        },
        shift(){
            return ({ type: createActionType('shift') })
        }
    }

    function reducer(state=initialState, action){
        if(!matchInstance(action)) return state

        if(action.type.endsWith('insert')){
            const { index, element } = action
            return [
                ...state.slice(0, index),
                element,
                ...state.slice(index)
            ]
        } else if(action.type.endsWith('replace')){
            const { index, element } = action
            return [
                ...state.slice(0, index),
                element,
                ...state.slice(index + 1)
            ]
        } else if(action.type.endsWith('remove')){
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ]
        } else if(action.type.endsWith('push')){
            return state.concat(action.element)
        } else if(action.type.endsWith('pop')){
            return state.slice(0, state.length -1)
        } else if(action.type.endsWith('shift')){
            return state.slice(1)
        } else return state
    }

    return {
        actions,
        reducer
    }
}