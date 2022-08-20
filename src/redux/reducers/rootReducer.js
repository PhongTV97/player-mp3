import { combineReducers } from 'redux'
import LoginReducer from './login';

const appReducer = combineReducers({
    LoginReducer,
})
const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer