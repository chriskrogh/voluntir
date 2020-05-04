import React, { useContext } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { Button } from '@material-ui/core';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import ThemeToggleButton from 'components/buttons/ThemeToggle';
import * as routes from 'utils/routes';

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
    button: {
        height: '100%',
        color: theme.palette.text.primary,
        fontSize: 20,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        }
    },
    fillHeight: {
        height: '100%',
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    iconSize: {
        fontSize: 35,
        [theme.breakpoints.down('sm')]: {
            fontSize: 25
        }
    }
});

interface Props extends WithStyles<typeof styles> {
    heightClassName: string
}

function Header({ classes, heightClassName }: Props) {
    const { user, unsetUser } = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        unsetUser();
        localStorage.removeItem('userId');
        history.push(routes.AUTH);
    }

    return (
        <div className={classnames(classes.header, heightClassName)}>
            <div className={classes.fillHeight}>
                <Button
                    onClick={() => history.push(routes.HOME)}
                    className={classes.button}
                >
                    <div className={classes.iconContainer}>
                        <BlurOnIcon className={classes.iconSize} />
                    </div>
                    Community
                </Button>
            </div>
            <div className={classes.fillHeight}>
                <ThemeToggleButton className={classes.button} />
                {user._id !== '0' && (
                    <Button onClick={logout}>
                        LOG OUT
                    </Button>
                )}
            </div>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Header);