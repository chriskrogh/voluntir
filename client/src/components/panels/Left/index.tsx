import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Logo from 'components/buttons/Logo';
import HomeButton from './Rows/Home';
import ExploreButton from './Rows/Explore';
import ProfileButton from './Rows/Profile';
import ThemeToggleButton from './Rows/ThemeToggle';
import LogoutButton from './Rows/Logout';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 180,
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
    },
    table: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(1)
    },
    row: {
        height: theme.spacing(6),
        width: '100%'
    },
    button: {
        height: '100%',
        width: '100%',
        justifyContent: 'left',
        color: theme.palette.text.primary,
        fontSize: 20,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        }
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(2)
    },
    iconSize: {
        fontSize: 30,
        [theme.breakpoints.down('sm')]: {
            fontSize: 25
        }
    }
});

function LeftPanel({ classes }: WithStyles<typeof styles>) {
    const rowStyles = {
        button: classes.button,
        iconContainer: classes.iconContainer,
        icon: classes.iconSize
    };

    return (
        <div className={classes.panel}>
            <div className={classes.row}>
                <Logo />
            </div>
            <div className={classes.table}>
                <div className={classes.row}>
                    <HomeButton styles={rowStyles} />
                </div>
                <div className={classes.row}>
                    <ExploreButton styles={rowStyles} />
                </div>
                <div className={classes.row}>
                    <ProfileButton styles={rowStyles} />
                </div>
                <div className={classes.row}>
                    <ThemeToggleButton styles={rowStyles} />
                </div>
                <div className={classes.row}>
                    <LogoutButton styles={rowStyles} />
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(LeftPanel);