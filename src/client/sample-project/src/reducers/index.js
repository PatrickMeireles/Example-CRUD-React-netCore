import { combineReducers } from 'redux';
import { cidadeReducer  } from './cidadeReducer';
import { registrarReducer } from './registrarReducer';

export const reducers = combineReducers({
    cidadeReducer,
    registrarReducer
});