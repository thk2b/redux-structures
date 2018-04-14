# List
```js
import List from 'redux-structures/List'
```

`List(String: name, any: initialState)`

The name parameter coresponds to the <b>unique</b> name of the list.

The initialState parameter is the initial state of the list. It is an empty array by default.

Returns an object with keys `actions` and `reducer`.

## Reducer

A standard redux reducer to be passed to `redux.combineReducers`.

## Actions

`actions` is an object containing standard redux action creators, to be passed to `store.dispatch`.

### `insert(element, index)`

Inserts `element` at the `index`.

### `replace(element, index)`

Replaces the element at `index` with `element`.

### `insert(element, index)`

Removes the element at `index`.

### `push(element)`

Adds the element at the end of the list.

### `pop()`

Removes the last element.

### `shift()`

Removes the first element.

## Example

```js
import List from 'redux-structures/List'

const { reducer, actions } = List('numbers', [1, 2, 3])

export default reducer
export actions as numberActions
```

```js
// index.js
import { createStore, combineReducers } from 'redux'
import numbers, { numberActions } from '../path/to/file'

const store = createStore(
    combineReducers({
        numbers
    })
)

store.getState().numbers === [1, 2, 3]
store.dispatch(nameActions.push(4))
store.getState().numbers === [1, 2, 3, 4]
store.dispatch(nameActions.insert(9, 3))
store.getState().numbers === [1, 2, 3, 9, 4]
store.dispatch(nameActions.remove(3))
store.getState().numbers === [1, 2, 3, 4]
store.dispatch(nameActions.pop())
store.getState().numbers === [1, 2, 3]
store.dispatch(nameActions.shift())
store.getState().numbers === [2, 3]
store.dispatch(nameActions.replace(9, 1))
store.getState().numbers === [2, 9]
```