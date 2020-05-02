import { createContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import LightTheme from 'theme/themes/light';

export const initialState = {
    theme: LightTheme,
    setTheme: (theme: Theme) => { },
};

export const ThemeContext = createContext(initialState);