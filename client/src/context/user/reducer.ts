import { Action } from 'types/actions/user';
import { initialState } from 'context/user/state';
import * as actionTypes from 'context/user/actions';

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case actionTypes.UNSET_USER:
            return {
                ...state,
                user: initialState.user
            };
        default:
            return state;
    }
}