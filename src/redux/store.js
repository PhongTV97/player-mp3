import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
const initialState = {}

const logger = createLogger({ diff: true, collapsed: true })

const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger))

console.log('state Store--', store.getState())
export default store;
