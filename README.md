# redux-strucures
Reusable redux data structures

## Docs

- [Value](https://github.com/thk2b/redux-structures/blob/master/src/Value/docs.md)
- [HashMap](https://github.com/thk2b/redux-structures/blob/master/src/HashMap/docs.md)
- [List](https://github.com/thk2b/redux-structures/blob/master/src/List/docs.md)

## Motivation

Redux applications often implement the same reducer logic. For instance, adding or removing a property from a state object, inserting an element to a list or updating a value. `redux-structures` provides reusable and encapsulated implementations of these common data structures, so that you do not have to rewrite the same reducers over and over.

To illustrate the problem, consider a chat application. The store has `users` and `messages`, which are both objects:

```js
store.getState() === {
  users: {
    1: { id: 1, name: 'john doe', ... }
    2: { id: 2, name: 'jane doe', ... }
    ...
  },
  messages: {
    1: { id: 1, text: 'hello, world', userId: 1, ...}
    2: { id: 2, text: 'what\'s up ?', userId: 2, ...},
    ...
  }
}
```

Common actions include adding or removing a user, as well as adding or removing a message. Traditionally, the same logic is implemented in both reducers.

```js
function users(state, action){
  switch(action.type){
    case ADD_USER: return {...state, [action.user.id]: action.user}
    ...
  }
}

function messages(state, action){
  switch(action.type){
    case ADD_MESSAGE: return {...state, [action.message.id]: action.message}
    ...
  }
}
```
Notice that the only difference between the two reducers are the constants and the action property names. The same error-prone logic is repeated.

`redux-structures` implements this logic *once*, and allows you to instantly create coupled reducer - action instances.

```js
import { HashMap } from 'redux-structures'

const { reducer: users, actions: userActions} = HashMap('users')
const { reducer: messages, actions: messageActions} = HashMap('messages')

```
Now, to add a user, simply dispatch `userActions.set(id, user)`. (Refer to the documentation for more information.)

This has several advantages.

- Faster and safer development
- You no longer need to unit-test individual reducers, since they tested once at the library level.

## Concepts

`redux-structures` employs two core concepts.

- Structures

  Structures are functions that return a reducer and actions. There are different types of structures: `Value`, `HashMap`, and `List`.
- Instances

  Instances are reducer - actions pairs, obtained by calling a structure. Instances are created with a unique name, so that actions only affect the reducer to which they are bound. Actions and reducers are coupled, in that the reducer will only match actions created by the instance's action creators. In our example, an instance would be `messages` and `messagesAction`.

## Patterns

`redux-structures` provides basic level operations, and does not get in the way of your application-specific needs. You can dispatch the actions from anywhere in your app - from the view, middleware, or thunk like you do with traditional actions. 

### Higher order action creators

You can define higher-order actions, which take a parameter and return another action creator. Consider what happens a user submits a new message, in the earlier example. 

```js
const { reducer: messages, actions: messageActions} = HashMap('messages')

const createMessage = text => {
  const id = generateId()
  const message = {
    text,
    sentAt: Date.now(),
    id
  }
  return messageActions.set(id, message)
}
```

Here, the `create` action returns another more general action creator.

### Using middleware

Actions from `redux-structures` can be dispatched from anywhere, including middleware.

### Composing reducers

You can define reducers which contain reducers from `redux-structures`.

## Usage

It is recomended to export instances from their own module, like in traditional redux applications. Then, import all reducers when creating the store.

`messages.js`
```js
import { HashMap } from 'redux-structures'
const { reducer, actions } = HashMap('messages')

/* define custom actions, here with the thunk middleware */

function fetchMessage(id){
    return dispatch => {
        fetch(`/message/${id}`)
            .then(message => dispatch(actions.set(id, message)))
    }
}
function fetchMessages(){
    return dispatch => {
        fetch(`/messages`)
            .then(messages => {
                dispatch(actions.setAll(messages))
            })
   }
}

export { actions as messageActions }
export default reducer
```
`index.js`
```js
import { createStore, combineReducers } from 'redux'
import messages from './path/to/messages'
import users from './path/to/users'

export default createStore(
  combineReducers({
    messages,
    users
  })
)
```
`view.js`
```js
import { messageActions } from './path/to/messages'

/* import actions and dispatch as you wish */

```
