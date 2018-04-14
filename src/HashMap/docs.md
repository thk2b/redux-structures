# HashMap
```js
import HashMap from 'redux-structures/HashMap'
```

`HashMap(String: name, Object: initialState)`

The name parameter coresponds to the <b>unique</b> name of the hashMap.

The initialState parameter is the initial state of the value. It is empty by default. It must be an object, whose key:value pairs become key:value pairs in the hashmap.

Returns an object with keys `actions` and `reducer`.

## Reducer

A standard redux reducer to be passed to `redux.combineReducers`.

## Actions

`actions` is an object containing standard redux action creators, to be passed to `store.dispatch`.

### `set(key, value)`

Adds the key:value pair to the hashMap.

### `setAll(Object: elements, Function: getKey)`

Adds all values from the data to the hashMap.

The `getKey` parameter is a function with the signature `element => key`. It will be called for every element in `elements` and should return the coresponding key. If not provided, the default function is `element => element.id`.

### `delete(key)`

Removes the key and value from the hashMap.

## Example

```js
import HashMap from 'redux-structures/HashMap'

const { reducer, actions } = HashMap('users', {
    1: { id: 1, name: 'jane' }
})

// define your application-specific actions, here using the thunk middleware
function fetchUser(id){
    return dispatch => {
        fetch(`/user/${id}`)
            .then(user => dispatch(actions.set(id, user)))
    }
}
function fetchUsers(){
    return dispatch => {
        fetch(`/users`)
            .then(users => {
                dispatch(actions.setAll(users, user => user.id))
            })
    }
}

export default reducer
export actions as nameActions
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

store.getState() === 'clark kent'
store.dispatch(nameActions.set('superman'))
store.getState() === 'superman'
```
