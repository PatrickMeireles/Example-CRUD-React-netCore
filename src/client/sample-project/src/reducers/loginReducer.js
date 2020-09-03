import { ACTION_TYPES } from '../actions/loginActions';

const initialState = {};

export const loginReducer = (state = initialState, action) => {
    
    switch(action.type){

        case ACTION_TYPES.AUTHENTICATE:
            return {
                ...state
            }
            break;


        default:
            return state;
    }
}