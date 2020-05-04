import React, { useContext } from 'react';
import { NamedTheme } from 'types/theme';
import { Button } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeContext } from 'context/theme/state';
import LightTheme from 'theme/themes/light';
import DarkTheme from 'theme/themes/dark';

interface Props {
    className: string
}

const isLightTheme = (theme: NamedTheme): boolean => {
    return theme.name === 'light';
}

function ThemeToggleButton({ className }: Props) {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(isLightTheme(theme) ? DarkTheme : LightTheme);
    }

    return (
        <Button className={className} onClick={toggleTheme}>
            <Brightness4Icon />
        </Button>
    );
}

export default ThemeToggleButton;