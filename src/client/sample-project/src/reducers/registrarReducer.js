import { ACTION_TYPES } from '../actions/registrarActions';

const initialState = {
    
};

export const registrarReducer = (state = initialState, action) => {
    switch(action.type){

        case ACTION_TYPES.CREATE:
            return {
                ...state
            }
            break;

        default:
            return state;
    }
}