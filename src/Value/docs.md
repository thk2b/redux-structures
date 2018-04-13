# Value
```js
import Value from 'redux-structures/Value'
```

`Value(String: name, any: initialState)`

The name parameter coresponds to the <b>unique</b> name of the value.

The initialState parameter is the initial state of the value. it is `null` by default.

Returns an object with keys `actions` and `reducer`.

## Reducer

A standard redux reducer to be passed to `redux.combineReducers`.

## Actions

`actions` is an object containing standard redux action creators, to be passed to `store.dispatch`.

### `set(nextValue)`

sets the state to `nextValue`.

## Example

```js
import Value from 'redux-structures/Value'

const { reducer, actions } = Value('name', 'clark kent')

export default reducer
export actions as nameActions
```

```js
// index.js
import { createStore, combineReducers } from 'redux'
import name, { nameActions } from '../path/to/file'

const store = createStore(
    combineReducers({
        name
    })
)

store.getState() === 'clark kent'
store.dispatch(nameActions.set('superman'))
store.getState() === 'superman'
```
