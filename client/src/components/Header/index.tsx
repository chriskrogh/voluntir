import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import * as routes from 'utils/routes';

const styles = (theme: Theme) => createStyles({
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.palette.primary.main,
        height: 60,
        width: '100%',
        boxShadow: '2px 2px 4px #888',
        [theme.breakpoints.down('sm')]: {
            height: 40
        }
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme
}

function Header({ classes }: Props) {
    const history = useHistory();

    return (
        <div className={classes.header}>
            <Button onClick={() => history.push(routes.HOME)}>
                Home
            </Button>
            <Button onClick={() => history.push(routes.AUTH)}>
                Auth
            </Button>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Header);