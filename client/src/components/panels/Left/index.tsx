import React, { useContext } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { logout } from 'utils/data/user';
import { Button } from '@material-ui/core';
import ThemeToggleButton from 'components/buttons/ThemeToggle';
import Logo from 'components/buttons/Logo';
import * as routes from 'utils/routes';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
    },
    table: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(1)
    },
    row: {
        height: 40,
        width: '100%'
    },
    button: {
        height: '100%',
        color: theme.palette.text.primary,
        fontSize: 20,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        }
    }
});

function LeftPanel({ classes }: WithStyles<typeof styles>) {
    const { user, token, unsetUser, unsetToken } = useContext(UserContext);
    const history = useHistory();

    const signOut = async () => {
        try {
            unsetUser();
            await logout(token);
            unsetToken();
            localStorage.removeItem('token');
            history.push(routes.AUTH);
        } catch (error) {
            // TODO replace with helpful message 2 user
            console.error(error);
        }
    }

    return (
        <div className={classes.panel}>
            <div className={classes.row}>
                <Logo />
            </div>
            <div className={classes.table}>
                <div className={classes.row}>
                    <ThemeToggleButton className={classes.button} />
                </div>
                <div className={classes.row}>
                    {user._id !== '0' && (
                        <Button className={classes.button} onClick={signOut}>
                            Log out
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(LeftPanel);