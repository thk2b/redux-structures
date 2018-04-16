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
        },
        clear(){
            return ({ type: createActionType('clear') })
        },
        reset(){
            return ({ type: createActionType('reset') })
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
        }
        if(action.type.endsWith('replace')){
            const { index, element } = action
            return [
                ...state.slice(0, index),
                element,
                ...state.slice(index + 1)
            ]
        }
        if(action.type.endsWith('remove')){
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ]
        }
        if(action.type.endsWith('push')){
            return state.concat(action.element)
        }
        if(action.type.endsWith('pop')){
            return state.slice(0, state.length -1)
        }
        if(action.type.endsWith('shift')){
            return state.slice(1)
        }
        if(action.type.endsWith('clear')){
            return []
        }
        if(action.type.endsWith('reset')){
            return initialState
        }
        return state
    }

    return {
        actions,
        reducer
    }
}