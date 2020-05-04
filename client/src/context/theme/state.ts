import { createContext } from 'react';
import { NamedTheme } from 'types/theme';
import LightTheme from 'theme/themes/light';
import DarkTheme from 'theme/themes/dark';

export const initialState = {
    theme: (localStorage.getItem('theme') === 'light' ? LightTheme : DarkTheme),
    setTheme: (theme: NamedTheme) => { },
};

export const ThemeContext = createContext(initialState);