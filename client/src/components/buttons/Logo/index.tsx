import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import { routes } from 'utils/constants';

const styles = (theme: Theme) => createStyles({
    iconSize: {
        fontSize: 30,
        [theme.breakpoints.down('sm')]: {
            fontSize: 25
        }
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

function Logo({ classes }: WithStyles<typeof styles>) {
    const history = useHistory();

    return (
        <Button
            onClick={() => history.push(routes.HOME)}
            className={classes.button}
        >
            <BlurOnIcon className={classes.iconSize} />
        </Button>
    );
}

export default withStyles(styles)(Logo);