import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => createStyles({
    page: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.background.default
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme
    children: JSX.Element | JSX.Element[]
}

function Page({ classes, children }: Props) {
    return (
        <div className={classes.page}>
            {children}
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Page);