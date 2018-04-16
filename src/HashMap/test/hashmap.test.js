import test from 'tape'
import { createStore, combineReducers } from 'redux'

import HashMap from '../'

test('HashMap', main => {
    main.test('instantiation', t => {
        const { actions, reducer } = HashMap('test-name-0')
        t.ok(actions, 'should return an object with an actions key')
        t.ok(reducer, 'should return an object with a reducer key')
        t.equal( typeof actions, 'object', 'actions should be an object')
        t.equal( typeof actions.set , 'function', 'should have a `set` action')
        t.equal( typeof actions.setAll , 'function', 'should have a `setAll` action')
        t.equal( typeof actions.delete , 'function', 'should have a `delete` action')
        t.equal( typeof reducer, 'function', 'reducer should be a function')
        t.end()
    })
    main.test('reducer', t => {
        const initialState = { 1: 'a' }
        const { reducer } = HashMap('test-name-1', initialState)
        const state = reducer(undefined, {})
        t.deepEqual( state, { 1: 'a' }, 'initial state should be set')
        t.deepEqual( reducer(state, { type: 'other' }), state, 'should return state when receiving foreign actions')
        t.end()
    })
    main.test('`set` action', t => {
        const { actions, reducer } = HashMap('test-name-2')
        const state0 = reducer(undefined, actions.set(1, 'a'))
        t.deepEqual( state0,  { 1: 'a' }, 'should set when there is no state')
        const state1 = reducer(state0, actions.set(2, 'b'))
        t.deepEqual( state1,  { 1: 'a', 2: 'b'}, 'should set when the sate is non-empty')
        const state2 = reducer(state1, actions.set(2, 'c'))
        t.deepEqual( state2,  { 1: 'a', 2: 'c'}, 'should replace the value when the key already exists')
        t.end()
    })
    main.test('`setAll` action', t => {
        const { actions, reducer } = HashMap('test-name-3')
        const state0 = reducer({ 1: 'a', 2: 'b' }, actions.setAll(
            { 3: 'c', 4: 'd'}
        ))
        t.deepEqual(
            state0,
            { 1: 'a', 2: 'b', 3: 'c', 4: 'd' },
            'should have added all elements'
        )
        t.end()
    })
    main.test('`delete` action', t => {
        const { actions, reducer } = HashMap('test-name-4')
        const state0 = reducer({ 1: 'a', 2: 'b' }, actions.delete(1))
        t.deepEqual(state0, { 2: 'b' }, 'should have deleted the element at key')
        const state1 = reducer(state0, actions.delete(1))
        t.deepEqual(state1, { 2: 'b' }, 'should have done nothing when the key does not exist')
        t.end()
    })
    main.test('`update` action', t => {
        const { actions, reducer } = HashMap('test-name-5')
        const state0 = reducer({ 1: 'a', 2: 'b' }, actions.update(1, value => {
            t.equal(value, 'a', 'should be given the current value')
            return 'z'
        }))
        t.deepEqual(state0, { 1: 'z', 2: 'b' }, 'should have updated the element at key with the return value')
        const state1 = reducer(state0, actions.update(3, value => {
            t.equal(value, null, 'value should be null when it does not exist')
        }))
        t.deepEqual(state1, {...state0, 3: undefined}, 'should have set to undefined')
        t.end()
    })
    main.test('multiple instances', t => {
        const n0 = 'name-0'
        const n1 = 'name-1'
        const i0 = { 1: 'a' }
        const i1 = { 2: 'b' }
        const v0 = HashMap(n0, i0)
        const v1 = HashMap(n1, i1)
        const store = createStore(
            combineReducers({
                v0: v0.reducer,
                v1: v1.reducer
            })
        )

        t.deepEqual(
            store.getState(),
            { v0: { 1: 'a' }, v1: { 2: 'b' }},
            'should have the right initial state'
        )
        store.dispatch(v0.actions.set(9, 'x'))
        t.deepEqual(
            store.getState(),
            { v0: { 1: 'a', 9: 'x' }, v1: { 2: 'b' }},
            'should have the right next state'
        )
        t.end()
    })
    main.test('invariants', t => {
        t.test('duplicate name', t => {
            const v0 = HashMap('some-name')
            t.throws(() => HashMap('some-name'), 'should throw when creating an instance with an already existing name')
            t.end()
        })
        t.test('undefined name', t => {
            t.throws(() => HashMap())
            t.end()
        })
    })
})