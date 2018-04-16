import test from 'tape'
import { createStore, combineReducers } from 'redux'

import Value from '../'

test('Value', main => {
    main.test('instantiation', t => {
        const { actions, reducer } = Value('test-name-0')
        t.ok(actions, 'should return an object with an actions key')
        t.ok(reducer, 'should return an object with a reducer key')
        t.equal( typeof actions, 'object', 'actions should be an object')
        t.equal( typeof actions.set , 'function', 'should have a `set` action')
        t.equal( typeof reducer, 'function', 'reducer should be a function')
        t.end()
    })
    main.test('reducer', t => {
        const initialState = 1
        const { reducer } = Value('test-name-1', initialState)
        const state = reducer(undefined, {})
        t.equal( state, initialState, 'initial state should be set')
        t.equal( reducer(state, { type: 'other' }), state, 'should return state when receiving foreign actions')
        t.end()
    })
    main.test('`set` action', t => {
        const initialState = 9
        const nextState = 99
        const { actions, reducer } = Value('test-name-2')
        t.equal( reducer(initialState, actions.set(nextState)), nextState)
        t.end()
    })
    main.test('`reset` action', t => {
        const initialState = 9
        const { actions, reducer } = Value('test-name-3', initialState)
        t.equal( reducer(initialState, actions.reset()), initialState)
        t.end()
    })
    main.test('`clear` action', t => {
        const { actions, reducer } = Value('test-name-4')
        t.equal( reducer([1, 2, 3], actions.clear()), null)
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
    main.test('invariants', t => {
        t.test('duplicate name', t => {
            const v0 = Value('name-3')
            t.throws(() => Value('name-3'), 'should throw when creating an instance with an already existing name')
            t.end()
        })
        t.test('undefined name', t => {
            t.throws(() => Value())
            t.end()
        })
    })
})