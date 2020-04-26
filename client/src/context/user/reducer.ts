import { Action } from 'types/actions/user';
import { initialState } from 'context/user/state';

export default (state = initialState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
}