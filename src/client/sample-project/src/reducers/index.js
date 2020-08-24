import { combineReducers } from 'redux';
import { cidadeReducer  } from './cidadeReducer';
import { registrarReducer } from './registrarReducer';
import { loginReducer } from './loginReducer';

export const reducers = combineReducers({
    cidadeReducer,
    loginReducer,
    registrarReducer
});