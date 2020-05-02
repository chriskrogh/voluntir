import { Action } from 'types/actions/theme';
import { initialState } from 'context/theme/state';
import * as actionTypes from 'context/theme/actions';

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_THEME:
            return {
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
}