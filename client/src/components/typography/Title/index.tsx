import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
    text: {
        color: theme.palette.text.primary,
        margin: 0,
    }
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme,
    text: string
}

function Title({ classes, text }: Props) {
    return (
        <h1 className={classes.text}>
            {text}
        </h1>
    );
}

export default withStyles(styles, { withTheme: true })(Title);