import test from 'tape'
import { createStore, combineReducers } from 'redux'

import Value from '../'

test('Value', main => {
    main.test('instantiation', t => {
        const name = 'test-name'
        const { actions, reducer } = Value(name)
        t.ok(actions, 'should return an object with an actions key')
        t.ok(reducer, 'should return an object with a reducer key')
        t.equal( typeof actions, 'object', 'actions should be an object')
        t.equal( typeof actions.set , 'function', 'should have a `set` action')
        t.equal( typeof reducer, 'function', 'reducer should be a function')
        t.end()
    })
    main.test('reducer', t => {
        const name = 'test-name'
        const initialState = 1
        const { reducer } = Value(name, initialState)
        const state = reducer(undefined, {})
        t.equal( state, initialState, 'initial state should be set')
        t.equal( reducer(state, { type: 'other' }), state, 'should return state when receiving foreign actions')
        t.end()
    })
    main.test('`set` action', t => {
        const name = 'test-name'
        const initialState = 9
        const nextState = 99
        const { actions, reducer } = Value(name)
        t.equal( reducer(initialState, actions.set(nextState)), nextState)
        t.end()
    })
    main.test('multiple instances', t => {
        const n0 = 'name-0'
        const n1 = 'name-1'
        const i0 = 0
        const i1 = 1
        const v0 = Value(n0, i0)
        const v1 = Value(n1, i1)
        const store = createStore(
            combineReducers({
                v0: v0.reducer,
                v1: v1.reducer
            })
        )

        t.deepEqual(store.getState(), { v0: i0, v1: i1 }, 'should have the right initial state')
        const nextState = 123
        store.dispatch(v0.actions.set(nextState))
        t.deepEqual(store.getState(), { v0: nextState, v1: i1 }, 'should have the right next state')        
        t.end()
    })
})