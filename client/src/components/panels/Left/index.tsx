import React, { SetStateAction, Dispatch } from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Logo from 'components/buttons/Logo';
import NavButton from './Rows/Nav';
import ThemeToggleButton from './Rows/ThemeToggle';
import LogoutButton from './Rows/Logout';
import { Pages } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        height: '100%',
        width: 180,
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {
            width: 40
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    table: {
        backgroundColor: theme.palette.secondary.main,
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
            width: 40,
            justifyContent: 'center',
            fontSize: 15
        }
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
        }
    },
    iconSize: {
        fontSize: 30,
    },
    labelContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
});

interface Props extends WithStyles<typeof styles> {
    setPage: Dispatch<SetStateAction<Pages>>;
}

function LeftPanel({ classes, setPage }: Props) {
    const rowStyles = {
        button: classes.button,
        iconContainer: classes.iconContainer,
        icon: classes.iconSize,
        labelContainer: classes.labelContainer
    };

    return (
        <div className={classes.panel}>
            <div className={classes.row}>
                <Logo />
            </div>
            <div className={classes.table}>
                <div className={classes.row}>
                    <NavButton
                        styles={rowStyles}
                        page={Pages.HOME}
                        setPage={setPage}
                    />
                </div>
                <div className={classes.row}>
                    <NavButton
                        styles={rowStyles}
                        page={Pages.EXPLORE}
                        setPage={setPage}
                    />
                </div>
                <div className={classes.row}>
                    <NavButton
                        styles={rowStyles}
                        page={Pages.PROFILE}
                        setPage={setPage}
                    />
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