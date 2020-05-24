import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
    text: {
        color: theme.palette.text.secondary,
        margin: 0,
    }
});

interface Props extends WithStyles<typeof styles> {
    text: string;
    color?: string;
}

function Subtitle({ classes, text, color }: Props) {
    return (
        <h3
            className={classes.text}
            style={{ color }}
        >
            {text}
        </h3>
    );
}

export default withStyles(styles)(Subtitle);