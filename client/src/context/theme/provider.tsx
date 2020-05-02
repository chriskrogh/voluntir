import React, { useReducer } from 'react';
import { ThemeContext, initialState } from './state';
import { Theme } from '@material-ui/core/styles';
import Reducer from './reducer';
import * as actionTypes from './actions';

const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const setTheme = (theme: Theme) => {
        dispatch({ type: actionTypes.SET_THEME, payload: theme });
    }

    return (
        <ThemeContext.Provider value={{
            ...state,
            setTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default Provider;