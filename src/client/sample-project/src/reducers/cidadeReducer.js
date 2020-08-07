import { ACTION_TYPES } from '../actions/cidadeActions';

const initialState = {
    list: []
};

export const cidadeReducer = (state = initialState, action) => {

    switch(action.type){

        case ACTION_TYPES.GETALL:
            return {
                ...state,
                list: [...action.payload]
            }
            break;

        default:
             return state;
    }
};