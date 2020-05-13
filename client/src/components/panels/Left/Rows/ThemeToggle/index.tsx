import React, { useContext } from 'react';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeContext } from 'context/theme/state';
import LightTheme from 'theme/themes/light';
import DarkTheme from 'theme/themes/dark';

interface Props {
    styles: LeftPanelRowStyles;
}

function ThemeToggleButton({ styles }: Props) {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme.name === 'light' ? DarkTheme : LightTheme);
    }

    return (
        <Button className={styles.button} onClick={toggleTheme}>
            <div className={styles.iconContainer}>
                <Brightness4Icon className={styles.icon} />
            </div>
            Theme
        </Button>
    );
}

export default ThemeToggleButton;