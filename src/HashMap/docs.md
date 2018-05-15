# HashMap
```js
import HashMap from 'redux-structures/HashMap'
```

`HashMap(String: name, Object: initialState)`

The name parameter coresponds to the <b>unique</b> name of the hashMap.

The initialState parameter is the initial state of the hashmap. It is an empty object by default. If specified, it must be an object. Its key:value pairs become key:value pairs in the hashmap.

Returns an object with keys `actions` and `reducer`.

## Reducer

A standard redux reducer to be passed to `redux.combineReducers`.

## Actions

`actions` is an object containing standard redux action creators, to be passed to `store.dispatch`.

### `set(key, value)`

Adds the key:value pair to the hashMap.

### `setAll(Object: elements)`

Adds all values from the data to the hashMap. Each key:value pair in the object becomes a key:value pair in the hashmap.

### `update(key, updateFn)`

Updates the key with the return value of `updateFn(state[key])`.

`updateFn` recieves the current value at `key` or null if undefined.

### `delete(key)`

Removes the key and value from the hashMap.

### `clear()`

Deletes all key:value pairs from the hashMap.

### `reset()`

Resets the hashMap to its initial state.

## Example

```js
import HashMap from 'redux-structures/HashMap'

const { reducer, actions } = HashMap('users', {
    1: { id: 1, name: 'jane' }
})

export default reducer
export { actions as userActions }
```

```js
// index.js
import { createStore, combineReducers } from 'redux'
import users, { userActions } from '../path/to/file'

const store = createStore(
    combineReducers({
        users
    })
)

store.getState().users // { 1: { id: 1, name: 'jane' }}
store.dispatch(userActions.set(2, { id: 2, name: 'joe' }))
store.getState().users 
/* {
    1:{id: 1, name: 'jane' }
    2:{id: 2, name: 'joe' }
} */
```
