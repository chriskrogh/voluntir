import React, { useContext } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { NamedTheme } from 'types/theme';
import { Button } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeContext } from 'context/theme/state';
import LightTheme from 'theme/themes/light';
import DarkTheme from 'theme/themes/dark';

const styles = (theme: Theme) => createStyles({
    iconSize: {
        fontSize: 30,
        [theme.breakpoints.down('sm')]: {
            fontSize: 25
        }
    }
});

interface Props extends WithStyles<typeof styles> {
    className: string;
}

const isLightTheme = (theme: NamedTheme): boolean => {
    return theme.name === 'light';
}

function ThemeToggleButton({ className, classes }: Props) {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(isLightTheme(theme) ? DarkTheme : LightTheme);
    }

    return (
        <Button className={className} onClick={toggleTheme}>
            <Brightness4Icon className={classes.iconSize} />
        </Button>
    );
}

export default withStyles(styles)(ThemeToggleButton);