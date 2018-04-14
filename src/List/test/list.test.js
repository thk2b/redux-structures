import test from 'tape'
import { createStore, combineReducers } from 'redux'

import List from '../'

test('List', main => {
    main.test('instantiation', t => {
        const { actions, reducer } = List('test-name-0')
        t.ok(actions, 'should return an object with an actions key')
        t.ok(reducer, 'should return an object with a reducer key')
        t.equal( typeof actions, 'object', 'actions should be an object')
        t.equal( typeof actions.insert , 'function', 'should have an `insert` action')
        t.equal( typeof actions.replace , 'function', 'should have an `replace` action')
        t.equal( typeof actions.remove , 'function', 'should have a `remove` action')
        t.equal( typeof actions.push , 'function', 'should have a `push` action')
        t.equal( typeof actions.pop , 'function', 'should have a `pop` action')
        t.equal( typeof actions.shift , 'function', 'should have a `shift` action')
        t.equal( typeof reducer, 'function', 'reducer should be a function')
        t.end()
    })
    main.test('reducer', t => {
        const { reducer: reducer0 } = List('test-name-1')
        t.deepEqual( reducer0(undefined, {}), [], 'default initial state should be an empty array')
        
        const initialState = [1, 2, 3]
        const { reducer } = List('test-name-1.1', initialState)
        const state = reducer(undefined, {})
        t.deepEqual( state, [1, 2, 3], 'initial state should be set')
        t.deepEqual( reducer(state, { type: 'other' }), state, 'should return state when receiving foreign actions')
        t.end()
    })
    main.test('`insert` action', t => {
        const { actions, reducer } = List('test-name-2')
        const state0 = reducer(undefined, actions.insert(1, 0))
        t.deepEqual( state0, [ 1 ], 'should insert when there is no state')
        const state1 = reducer(state0, actions.insert(0, 0))
        t.deepEqual( state1,  [ 0, 1 ], 'should insert before an element')
        const state2 = reducer(state1, actions.insert(9, 1))
        t.deepEqual( state2,  [ 0, 9, 1 ], 'should insert after an element')
        t.end()
    })
    main.test('`replace` action', t => {
        const { actions, reducer } = List('test-name-3')
        const state0 = reducer([ 1, 2, 3 ], actions.replace(9, 1))
        t.deepEqual(
            state0,
            [ 1, 9, 3],
            'should have replaced the element at index'
        )
        t.end()
    })
    main.test('`remove` action', t => {
        const { actions, reducer } = List('test-name-4')
        const state0 = reducer([ 1, 2, 3 ], actions.remove(1))
        t.deepEqual(
            state0,
            [ 1, 3],
            'should have removed the element at index'
        )
        t.end()
    })
    main.test('`push` action', t => {
        const { actions, reducer } = List('test-name-5')
        const state0 = reducer([ 1, 2, 3 ], actions.push(4))
        t.deepEqual(
            state0,
            [ 1, 2, 3, 4],
            'should have added the element at the end of the list'
        )
        t.end()
    })
    main.test('`pop` action', t => {
        const { actions, reducer } = List('test-name-6')
        const state0 = reducer([ 1, 2, 3 ], actions.pop())
        t.deepEqual(
            state0,
            [ 1, 2 ],
            'should have removed the last element'
        )
        t.end()
    })
    main.test('`shift` action', t => {
        const { actions, reducer } = List('test-name-7')
        const state0 = reducer([ 1, 2, 3 ], actions.shift())
        t.deepEqual(
            state0,
            [ 2, 3 ],
            'should have removed the first element'
        )
        t.end()
    })
    main.test('multiple instances', t => {
        const n0 = 'name-0'
        const n1 = 'name-1'
        const i0 = [ 1, 2 ]
        const i1 = [ 9, 8 ]
        const v0 = List(n0, i0)
        const v1 = List(n1, i1)
        const store = createStore(
            combineReducers({
                v0: v0.reducer,
                v1: v1.reducer
            })
        )

        t.deepEqual(
            store.getState(),
            { v0: [ 1, 2 ], v1: [ 9, 8 ]},
            'should have the right initial state'
        )
        store.dispatch(v0.actions.push(9))
        t.deepEqual(
            store.getState(),
            { v0: [ 1, 2, 9 ], v1: [ 9, 8 ]},
            'should have the right next state'
        )
        t.end()
    })
    main.test('invariants', t => {
        t.test('duplicate name', t => {
            const v0 = List('some-name')
            t.throws(() => List('some-name'), 'should throw when creating an instance with an already existing name')
            t.end()
        })
        t.test('undefined name', t => {
            t.throws(() => List())
            t.end()
        })
    })
})