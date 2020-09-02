//여러가지 reducer를 연결해주는것. ex. post, subscribe, comment ...

import {combineReducers} from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
    user
})

export default rootReducer;