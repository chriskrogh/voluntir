import React, { useReducer } from 'react';
import { User } from 'types/user';
import { UserContext, initialState } from './state';
import Reducer from './reducer';
import * as actionTypes from './actions';

const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const setUser = (user: User) => {
        dispatch({ type: actionTypes.SET_USER, payload: user });
    }

    const unsetUser = (user: User) => {
        dispatch({ type: actionTypes.UNSET_USER, payload: user });
    }

    return (
        <UserContext.Provider value={{
            ...state,
            setUser,
            unsetUser,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default Provider;