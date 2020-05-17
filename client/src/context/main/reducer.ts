import { initialState } from './state';
import ActionTypes, { Action } from './actions';

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_EVENT:
            return {
                ...state,
                event: action.payload
            };
        case ActionTypes.SET_EVENTS:
            return {
                ...state,
                events: action.payload
            };
        case ActionTypes.SET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case ActionTypes.SET_PANEL:
            return {
                ...state,
                panel: action.payload
            };
        default:
            return state;
    }
}