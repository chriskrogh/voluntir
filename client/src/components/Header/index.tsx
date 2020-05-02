import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as routes from 'utils/routes';
import ThemeToggleButton from 'components/buttons/ThemeToggle';

const styles = (theme: Theme) => createStyles({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        height: 60,
        width: '100%',
        boxShadow: '2px 2px 4px #888',
        [theme.breakpoints.down('sm')]: {
            height: 40
        }
    },
    fillHeight: {
        height: '100%'
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme
}

function Header({ classes }: Props) {
    const history = useHistory();

    return (
        <div className={classes.header}>
            <div className={classes.fillHeight}>
                <Button
                    onClick={() => history.push(routes.HOME)}
                    className={classes.fillHeight}
                >
                    Home
                </Button>
                <Button
                    onClick={() => history.push(routes.AUTH)}
                    className={classes.fillHeight}
                >
                    Auth
                </Button>
            </div>
            <div className={classes.fillHeight}>
                <ThemeToggleButton className={classes.fillHeight} />
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Header);