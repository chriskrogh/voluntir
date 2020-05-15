import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
    text: {
        fontSize: 16,
        color: theme.palette.text.primary,
        margin: 0,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14
        }
    }
});

interface Props extends WithStyles<typeof styles> {
    text: string;
    color?: string;
}

function ParagraphText({ classes, color, text }: Props) {
    return (
        <p
            className={classes.text}
            style={{ color }}
        >
            {text}
        </p>
    );
}

export default withStyles(styles)(ParagraphText);